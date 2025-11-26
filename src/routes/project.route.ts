import { FastifyInstance } from "fastify";
import { ProjectController } from "../controllers/project.controller";
import { 
    createProjectSchema,
    getProjectSchema,
    getProjectsSchema,
    updateProjectSchema,
    deleteProjectSchema
} from "../schemas/project.schema";

const projectController = new ProjectController();

export default async function projectRoutes(fastify: FastifyInstance) {
    // Create Project
    fastify.post(
        '/',
        { schema: createProjectSchema },
        projectController.createProject.bind(projectController)
    );
    
    // Get Project
    fastify.get(
        '/:project_id',
        { schema: getProjectSchema },
        projectController.getProject.bind(projectController)
    );

    // Get Projects
    fastify.get(
        '/',
        { schema: getProjectsSchema },
        projectController.getProjects.bind(projectController)
    )

    // Update Project
    fastify.put(
        '/:project_id',
        { schema: updateProjectSchema },
        projectController.updateProject.bind(projectController)    
    );

    // Delete Project
    fastify.delete(
        '/:project_id',
        { schema: deleteProjectSchema },
        projectController.deleteProject.bind(projectController)    
    );
}