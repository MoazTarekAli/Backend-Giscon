import { FastifyInstance } from "fastify";
import { ProjectStaffController } from "../controllers/projectStaff.controller";
import { 
    createProjectStaffSchema,
    getProjectStaffSchema,
    updateProjectStaffSchema,
    deleteProjectStaffSchema
} from "../schemas/projectStaff.schema";

const projectStaffController = new ProjectStaffController();

export default async function projectStaffRoutes(fastify: FastifyInstance) {
    // Add staff to project
    fastify.post(
        '/',
        { schema: createProjectStaffSchema },
        projectStaffController.createProjectStaff.bind(projectStaffController)
    );

    // Get all projects that staff works on and their role
    fastify.get(
        '/:staff_id',
        { schema: getProjectStaffSchema },
        projectStaffController.getProjectStaff.bind(projectStaffController)
    );

    // Update relationship between staff and project
    fastify.put(
        '/:role_id',
        { schema: updateProjectStaffSchema },
        projectStaffController.updateProjectStaff.bind(projectStaffController)
    );

    // Delete staff role in a project
    fastify.delete(
        '/:role_id',
        { schema: deleteProjectStaffSchema },
        projectStaffController.deleteProjectStaff.bind(projectStaffController)
    );
}