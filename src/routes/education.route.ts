import { FastifyInstance } from "fastify";
import { EducationController } from "../controllers/education.controller";
import { 
    createEducationSchema,
    getEducationSchema,
    getAllStaffEducationSchema,
    updateEducationSchema,
    deleteEducationSchema,
    deleteAllEducationsSchema
} from "../schemas/education.schema";

const educationController = new EducationController();

export default async function educationRoutes(fastify: FastifyInstance) {
    // Create Education
    fastify.post(
        '/',
        { schema: createEducationSchema },
        educationController.createEducation.bind(educationController)
    );

    // Get education by id
    fastify.get(
        '/educationid/:education_id',
        { schema: getEducationSchema },
        educationController.getEducationById.bind(educationController)
    );

    // Get education by staff_id
    fastify.get(
        '/staffid/:staff_id',
        { schema: getAllStaffEducationSchema },
        educationController.getAllEducationByStaffId.bind(educationController)
    );

    // Update education by id
    fastify.put(
        '/educationid/:education_id',
        { schema: updateEducationSchema },
        educationController.updateEducationById.bind(educationController)
    );

    // Delete education by id
    fastify.delete(
        '/educationid/:education_id',
        { schema: deleteEducationSchema },
        educationController.deleteEducationById.bind(educationController)
    );

    // Delete all educations by staff_id
    fastify.delete(
        '/staffid/:staff_id',
        { schema: deleteAllEducationsSchema },
        educationController.deleteAllEducationByStaffId.bind(educationController)
    );
}