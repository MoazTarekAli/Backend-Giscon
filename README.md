# Backend-Giscon

## Prerequisites

- Node.js
- PostgreSQL
- npm package manager

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the root directory with the following configuration:
```env
PORT=3000
HOST=localhost
NODE_ENV=development

DB_INITIALIZE=false
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password_here
DB_NAME=staff_management
DATABASE_URL=postgresql://postgres:your_password_here@localhost:5432/staff_management
```

**Important**: Replace `your_password_here` with your actual PostgreSQL password.

### 3. Generate Prisma Client
```bash
npx prisma generate
```

### 4. Sync Database Schema
```bash
npx prisma db push
```

### 5. Start Development Server
```bash
npm run dev
```

The server will be running at `http://localhost:3000`

Also detailed api can be found `http://localhost:3000/docs`

## Additional Commands

- `npx prisma studio` - Open Prisma Studio to view/edit database data
- `npx prisma migrate dev` - Create and apply migrations (for production)