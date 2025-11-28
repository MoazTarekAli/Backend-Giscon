import { FastifyInstance } from "fastify";
import { ProjectTechnologyController } from "../controllers/projectTechnology.controller";
import { 
    createProjectTechnologySchema,
    getProjectTechnologySchema,
    deleteAllProjectTechnologySchema,
    deleteProjectTechnologySchema
} from "../schemas/project-technology.schema";

const projectTechnologyController = new ProjectTechnologyController();

export default async function projectTechnologyRoutes(fastify: FastifyInstance) {
    // Add technology to project (create)
    fastify.post(
        '/',
        { schema: createProjectTechnologySchema },
        projectTechnologyController.createProjectTechnology.bind(projectTechnologyController)
    );

    // Get all technologies of project
    fastify.get(
        '/:project_id',
        { schema: getProjectTechnologySchema },
        projectTechnologyController.getProjectTechnologies.bind(projectTechnologyController)
    );

    // Delete certain technology from project
    fastify.delete(
        '/',
        { schema: deleteProjectTechnologySchema },
        projectTechnologyController.deleteProjectTechnology.bind(projectTechnologyController)
    );

    // Delete all technologies from project
    fastify.delete(
        '/:project_id',
        { schema: deleteAllProjectTechnologySchema },
        projectTechnologyController.deleteProjectTechnologies.bind(projectTechnologyController)
    );
}