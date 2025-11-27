import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { config } from './config/env';
import { prisma, connectDatabase, disconnectDatabase } from './config/database';
import staffroutes from './routes/staff.route';
import workRoutes from './routes/work.route';
import educationRoutes from './routes/education.route';
import skillRoutes from './routes/skill.route';
import staffSkillRoutes from './routes/staffSkill.route';
import projectRoutes from './routes/project.route';
import technologyRoutes from './routes/technology.route';
import projectTechnologyRoutes from './routes/projectTechnology.route';
import projectStaffRoutes from './routes/projectStaff.route';

// Database plugin
const databasePlugin = async (fastify: any) => {
  // Connect on startup
  fastify.addHook('onReady', async () => {
    await connectDatabase();
  });

  // Disconnect on shutdown
  fastify.addHook('onClose', async () => {
    await disconnectDatabase();
  });

  // Decorate fastify with prisma instance for use in routes
  fastify.decorate('prisma', prisma);
};

export const buildApp = () => {
  const app = Fastify({
    logger: config.nodeEnv !== 'production',
  });

  // Register Routes
  app.register(staffroutes, { prefix: '/staff' });
  app.register(workRoutes, { prefix: '/work' });
  app.register(educationRoutes, { prefix: '/education' });
  app.register(skillRoutes, { prefix: '/skill' });
  app.register(staffSkillRoutes, { prefix: '/staffskill' });
  app.register(projectRoutes, { prefix: '/project' });
  app.register(technologyRoutes, { prefix: '/technology' })
  app.register(projectTechnologyRoutes, { prefix: '/projecttechnology' })
  app.register(projectStaffRoutes, { prefix: '/projectstaff' })

  // Register plugins
  app.register(cors);
  app.register(helmet);
  app.register(databasePlugin);

  // Health check endpoint with database connection test
  /*app.get('/health', async (request, reply) => {
    try {
      // Test database connection
      await prisma.$queryRaw`SELECT 1`;
      return { 
        status: 'ok',
        database: 'connected',
        timestamp: new Date().toISOString()
      };
    } catch (error) {
      reply.status(503);
      return { 
        status: 'error',
        database: 'disconnected',
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  });*/

  return app;
};