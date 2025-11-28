import Fastify from 'fastify';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import { config } from './config/env';
import { prisma, connectDatabase, disconnectDatabase } from './config/database';
import staffroutes from './routes/staff.route';
import workRoutes from './routes/work.route';
import educationRoutes from './routes/education.route';
import skillRoutes from './routes/skill.route';
import staffSkillRoutes from './routes/staff-skill.route';
import projectRoutes from './routes/project.route';
import technologyRoutes from './routes/technology.route';
import projectTechnologyRoutes from './routes/project-technology.route';
import projectStaffRoutes from './routes/project-staff.route';
import cvRoutes from './routes/cv.route';

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

  app.register(swagger, {
    openapi: {
        info: {
            title: 'CV Builder API',
            description: 'API documentation for CV Builder application',
            version: '1.0.0'
        },
        servers: [
            {
                url: 'http://localhost:3000',
                description: 'Development server'
            }
        ],
        tags: [
            { name: 'staff', description: 'Staff related endpoints' },
            { name: 'skill', description: 'skill related endpoints' },
            { name: 'staff-skill', description: 'staff-skill related endpoints' },
            { name: 'education', description: 'education related endpoints' },
            { name: 'work', description: 'work related endpoints' },
            { name: 'technology', description: 'technology related endpoints' },
            { name: 'projects', description: 'Project related endpoints' },
            { name: 'project-technology', description: 'project-technology related endpoints' },
            { name: 'project-staff', description: 'Project-Staff relationship endpoints' },
            { name: 'cv', description: 'CV generation endpoints' }
        ]
    }
  });

  app.register(swaggerUi, {
    routePrefix: '/docs',
    uiConfig: {
        docExpansion: 'list',
        deepLinking: false
    },
    theme: {
        title: 'CV Builder API Documentation'
    },
    staticCSP: true
  });

  // Register Routes
  app.register(staffroutes, { prefix: '/staff' });
  app.register(workRoutes, { prefix: '/work' });
  app.register(educationRoutes, { prefix: '/education' });
  app.register(skillRoutes, { prefix: '/skill' });
  app.register(staffSkillRoutes, { prefix: '/staff-skill' });
  app.register(projectRoutes, { prefix: '/project' });
  app.register(technologyRoutes, { prefix: '/technology' })
  app.register(projectTechnologyRoutes, { prefix: '/project-technology' })
  app.register(projectStaffRoutes, { prefix: '/project-staff' })
  app.register(cvRoutes, { prefix: '/cv' })
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