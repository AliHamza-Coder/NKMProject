import { ObjectId } from 'mongodb';

export interface User {
  _id?: ObjectId;
  firstName: string;
  lastName: string;
  email: string;
  password?: string; // Optional for Google OAuth users
  googleId?: string; // For Google OAuth users
  address?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date | null;
  active: boolean;
}

export interface UserSession {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  address?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address?: string;
}