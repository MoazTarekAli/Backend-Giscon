import { FastifyInstance } from "fastify";
import { SkillController } from "../controllers/skill.controller";
import { 
    createSkillSchema,
    getSkillSchema,
    updateSkillSchema,
    getSkillsSchema,
    deleteSkillSchema
} from "../schemas/skill.schema";

const skillController = new SkillController();

export default async function skillRoutes(fastify: FastifyInstance) {
    // Create Skill
    fastify.post(
        '/',
        { schema: createSkillSchema },
        skillController.createSkill.bind(skillController)
    );

    // Get Skill
    fastify.get(
        '/:skill_id',
        { schema: getSkillSchema },
        skillController.getSkillById.bind(skillController)
    );

    // Get all skills
    fastify.get(
        '/',
        { schema: getSkillsSchema },
        skillController.getAllSkills.bind(skillController)
    );

    // Update skill by id
    fastify.put(
        '/:skill_id',
        { schema: updateSkillSchema },
        skillController.updateSkill.bind(skillController)
    );

    // Delete skill by id
    fastify.delete(
        '/:skill_id',
        { schema: deleteSkillSchema},
        skillController.deleteSkill.bind(skillController)
    )
}