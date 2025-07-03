# BiteCode Server

A Node.js/Express server with PostgreSQL database for personal chat application.

## Local Development

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables (create a .env file):
```
APP_PORT=3000
DEBUG_MODE=true
JWT_SECRET_KEY=your-secret-key-here
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=Aditya@018#
DB_NAME=personal-chat
```

3. Start development server:
```bash
npm run dev
```

## Deployment Options

### Option 1: Railway (Recommended - Free Tier)

1. Go to [Railway](https://railway.app/) and sign up
2. Connect your GitHub repository
3. Add a PostgreSQL database from Railway's dashboard
4. Set environment variables in Railway:
   - `DB_HOST` (from Railway PostgreSQL)
   - `DB_USER` (from Railway PostgreSQL)
   - `DB_PASSWORD` (from Railway PostgreSQL)
   - `DB_NAME` (from Railway PostgreSQL)
   - `JWT_SECRET_KEY` (your secret key)
   - `DEBUG_MODE=false`

### Option 2: Render (Free Tier)

1. Go to [Render](https://render.com/) and sign up
2. Connect your GitHub repository
3. Create a new Web Service
4. Add a PostgreSQL database from Render's dashboard
5. Set environment variables in Render:
   - `DB_HOST` (from Render PostgreSQL)
   - `DB_USER` (from Render PostgreSQL)
   - `DB_PASSWORD` (from Render PostgreSQL)
   - `DB_NAME` (from Render PostgreSQL)
   - `JWT_SECRET_KEY` (your secret key)
   - `DEBUG_MODE=false`

### Option 3: Heroku (Free Tier Discontinued)

Note: Heroku no longer offers a free tier, but if you have a paid account:
1. Install Heroku CLI
2. Create a new Heroku app
3. Add PostgreSQL addon
4. Deploy using Git

## Environment Variables for Production

Make sure to set these environment variables in your cloud platform:

- `PORT` - Port number (usually set automatically by the platform)
- `DB_HOST` - Database host
- `DB_USER` - Database username
- `DB_PASSWORD` - Database password
- `DB_NAME` - Database name
- `JWT_SECRET_KEY` - Secret key for JWT tokens
- `DEBUG_MODE` - Set to false in production

## Database Setup

The application will automatically create tables when it starts. Make sure your PostgreSQL database is running and accessible. 