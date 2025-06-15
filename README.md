# NKM Frontend Application

This is a [Next.js](https://nextjs.org) e-commerce application with authentication, MongoDB integration, and Google OAuth support.

## Prerequisites

Before running this application, make sure you have:

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun package manager
- MongoDB Atlas account (or local MongoDB instance)
- Google Cloud Console account for OAuth setup

## Setup Instructions

### Step 1: Clone and Install Dependencies

```bash
# Clone the repository
git clone https://github.com/AliHamza-Coder/NKMProject.git
cd frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Step 2: Create Environment File

Create a `.env.local` file in the root directory of your project:

```bash
# Create the environment file
touch .env.local
```

### Step 3: Generate NextAuth Secret

Generate a secure secret key for NextAuth using Node.js:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Copy the generated key for use in your environment variables.

### Step 4: Setup MongoDB Atlas

1. **Create MongoDB Atlas Account**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Sign up for a free account
   - Create a new cluster

2. **Configure Network Access**
   - In your MongoDB Atlas dashboard, go to "Network Access"
   - Click "Add IP Address"
   - Add `0.0.0.0/0` to allow access from anywhere (for development)
   - For production, add only your server's IP address

3. **Create Database User**
   - Go to "Database Access"
   - Click "Add New Database User"
   - Create a user with read/write permissions
   - Remember the username and password

4. **Get Connection String**
   - Go to "Clusters" and click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password

### Step 5: Setup Google OAuth

1. **Create Google Cloud Project**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one

2. **Enable Google+ API**
   - Go to "APIs & Services" > "Library"
   - Search for "Google+ API" and enable it

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth 2.0 Client IDs"
   - Choose "Web application"
   - Add authorized JavaScript origins:
     - For development: `http://localhost:3000`
     - For production: `https://yourdomain.com`
   - Add authorized redirect URIs:
     - For development: `http://localhost:3000/api/auth/callback/google`
     - For production: `https://yourdomain.com/api/auth/callback/google`

4. **Get Client Credentials**
   - Copy the Client ID and Client Secret

### Step 6: Configure Environment Variables

Add the following variables to your `.env.local` file:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database_name?retryWrites=true&w=majority&appName=YourAppName

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id_here
GOOGLE_CLIENT_SECRET=your_google_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_generated_secret_key_here
```

**Important Notes:**
- Replace `username:password` in MONGODB_URI with your actual MongoDB user credentials
- Replace `cluster.mongodb.net` with your actual cluster URL
- Replace `database_name` with your preferred database name
- Replace the Google OAuth credentials with your actual values
- Replace the NextAuth secret with the generated key from Step 3
- For production, change `NEXTAUTH_URL` to your actual domain

### Step 7: Run the Application

```bash
# Start the development server
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production Deployment

### Environment Variables for Production

When deploying to production, update these environment variables:

```env
NEXTAUTH_URL=https://yourdomain.com
MONGODB_URI=your_production_mongodb_uri
```

### Google OAuth Production Setup

Make sure to update your Google OAuth settings:

1. **Authorized JavaScript Origins:**
   - `https://yourdomain.com`

2. **Authorized Redirect URIs:**
   - `https://yourdomain.com/api/auth/callback/google`

## Build Commands

```bash
# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint
```

## Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Verify your connection string is correct
   - Check if your IP is whitelisted in MongoDB Atlas
   - Ensure database user has proper permissions

2. **Google OAuth Error**
   - Verify redirect URIs match exactly (including http/https)
   - Check if Google+ API is enabled
   - Ensure client ID and secret are correct

3. **NextAuth Error**
   - Verify NEXTAUTH_SECRET is set and secure
   - Check NEXTAUTH_URL matches your domain
   - Ensure all required environment variables are set

### Environment File Security

- Never commit `.env.local` to version control
- Use different credentials for development and production
- Regularly rotate your secrets and API keys

## Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

## Support

If you encounter any issues during setup, please check the troubleshooting section above or refer to the official documentation of the respective services.
