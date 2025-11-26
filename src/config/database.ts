import { PrismaClient } from '@prisma/client'

// Prevent multiple instances of Prisma Client in development
declare global {
  var prisma: PrismaClient | undefined
}

// Create a single instance of PrismaClient
export const prisma = global.prisma || new PrismaClient({
  log: ['query', 'info', 'warn', 'error'], // Optional: log database queries
})


// Helper function to connect to database
export async function connectDatabase(): Promise<void> {
  try {
    await prisma.$connect()
    console.log('Database connected successfully')
  } catch (error) {
    console.error('Failed to connect to database:', error)
    process.exit(1)
  }
}

// Helper function to disconnect from database
export async function disconnectDatabase(): Promise<void> {
  try {
    await prisma.$disconnect()
    console.log('Database disconnected successfully')
  } catch (error) {
    console.error('Failed to disconnect from database:', error)
  }
}

