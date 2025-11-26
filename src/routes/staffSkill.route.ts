import { FastifyInstance } from "fastify";
import { StaffSkillController } from "../controllers/staffSkill.controller";
import { 
    getStaffSkillsSchema,
    createStaffSkillSchema,
    deleteAllStaffSkillsSchema,
    deleteStaffSkillSchema
} from "../schemas/staffSkill.schema";

const staffSkillController = new StaffSkillController();

export default async function staffSkillRoutes(fastify: FastifyInstance) {
    // Add skill to staff (create)
    fastify.post(
        '/',
        { schema: createStaffSkillSchema },
        staffSkillController.createStaffSkill.bind(staffSkillController)
    );

    // Get all skills of staff
    fastify.get(
        '/:staff_id',
        { schema: getStaffSkillsSchema },
        staffSkillController.getStaffSkills.bind(staffSkillController)
    );

    // Delete certain skill of staff
    fastify.delete(
        '/',
        { schema: deleteStaffSkillSchema },
        staffSkillController.deleteStaffSkill.bind(staffSkillController)
    );

    // Delete all skills of staff
    fastify.delete(
        '/:staff_id',
        { schema: deleteAllStaffSkillsSchema },
        staffSkillController.deleteAllStaffSkill.bind(staffSkillController)
    );
}