import { ObjectId } from 'mongodb';
import { getDatabase } from '../mongodb';
import { User, SignupData } from '../models/user';
import bcrypt from 'bcryptjs';

// Get all users
export async function getAllUsers(): Promise<User[]> {
  try {
    const db = await getDatabase();
    if (!db) {
      throw new Error('Database connection failed');
    }

    const users = await db.collection('users').find({}).toArray();
    return users.map(user => ({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
      active: user.active
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Get user by ID
export async function getUserById(id: string): Promise<User | null> {
  try {
    const db = await getDatabase();
    if (!db) {
      throw new Error('Database connection failed');
    }

    const user = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!user) {
      return null;
    }

    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
      active: user.active
    };
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    throw error;
  }
}

// Get user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const db = await getDatabase();
    if (!db) {
      throw new Error('Database connection failed');
    }

    const user = await db.collection('users').findOne({ email });
    if (!user) {
      return null;
    }

    return {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
      active: user.active
    };
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

// Create new user
export async function createUser(userData: SignupData): Promise<User> {
  try {
    const db = await getDatabase();
    if (!db) {
      throw new Error('Database connection failed');
    }

    // Check if user already exists
    const existingUser = await getUserByEmail(userData.email);
    if (existingUser) {
      throw new Error('User with this email already exists');
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);

    const now = new Date();
    const newUser = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      password: hashedPassword,
      address: userData.address || '',
      createdAt: now,
      updatedAt: now,
      lastLogin: null,
      active: true
    };

    const result = await db.collection('users').insertOne(newUser);
    
    return {
      _id: result.insertedId,
      ...newUser
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Update user
export async function updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
  try {
    const db = await getDatabase();
    if (!db) {
      throw new Error('Database connection failed');
    }

    const updateFields = {
      ...updateData,
      updatedAt: new Date()
    };

    // Remove _id from update fields if present
    delete updateFields._id;

    // Hash password if it's being updated
    if (updateFields.password) {
      const salt = await bcrypt.genSalt(10);
      updateFields.password = await bcrypt.hash(updateFields.password, salt);
    }

    const result = await db.collection('users').findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateFields },
      { returnDocument: 'after' }
    );

    if (!result) {
      return null;
    }

    return {
      _id: result._id,
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
      password: result.password,
      address: result.address,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
      lastLogin: result.lastLogin,
      active: result.active
    };
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
}

// Delete user
export async function deleteUser(id: string): Promise<boolean> {
  try {
    const db = await getDatabase();
    if (!db) {
      throw new Error('Database connection failed');
    }

    const result = await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount > 0;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
}

// Update user last login
export async function updateUserLastLogin(id: string): Promise<void> {
  try {
    const db = await getDatabase();
    if (!db) {
      throw new Error('Database connection failed');
    }

    await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: { 
          lastLogin: new Date(),
          updatedAt: new Date()
        } 
      }
    );
  } catch (error) {
    console.error('Error updating user last login:', error);
    throw error;
  }
}

// Verify user password
export async function verifyUserPassword(email: string, password: string): Promise<User | null> {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Error verifying user password:', error);
    throw error;
  }
}

// Get user count
export async function getUserCount(): Promise<number> {
  try {
    const db = await getDatabase();
    if (!db) {
      throw new Error('Database connection failed');
    }

    return await db.collection('users').countDocuments();
  } catch (error) {
    console.error('Error getting user count:', error);
    throw error;
  }
}

// Get active users
export async function getActiveUsers(): Promise<User[]> {
  try {
    const db = await getDatabase();
    if (!db) {
      throw new Error('Database connection failed');
    }

    const users = await db.collection('users').find({ active: true }).toArray();
    return users.map(user => ({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      password: user.password,
      address: user.address,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastLogin: user.lastLogin,
      active: user.active
    }));
  } catch (error) {
    console.error('Error fetching active users:', error);
    throw error;
  }
}