import { FastifyRequest, FastifyReply } from "fastify";
import { SkillService } from "../services/skill.service";
import { CreateSkillInput, UpdateSkillInput } from "../types/skill.types";

const skillService = new SkillService();

export class SkillController{
    async createSkill(
        request: FastifyRequest<{ Body: CreateSkillInput }>,
        reply: FastifyReply
    ) {
        try {
            const skill = await skillService.createSkill(request.body);
            return reply.code(201).send(skill);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to create skill' });
        }
    }

    async getSkillById (
        request: FastifyRequest <{ Params: { skill_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const skill_id = parseInt(request.params.skill_id);
            const skill = await skillService.getSkillById(skill_id);
            return reply.code(200).send(skill);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to fetch skill' });
        }
    }

    async getAllSkills (
        request: FastifyRequest <{ Querystring: { page?: number, limit?: number } }>,
        reply: FastifyReply
    ) {
        try {
            const { page = 1, limit = 10 } = request.query;
            const skills = await skillService.getAllSkills(page, limit);
            return reply.code(200).send(skills);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to fetch all skills' });
        }
    }

    async updateSkill (
        request: FastifyRequest <{ Params: { skill_id: string }, Body: UpdateSkillInput}>,
        reply: FastifyReply
    ) {
        try {
            const skill_id = parseInt(request.params.skill_id);
            const skill = await skillService.updateSkillById(skill_id, request.body);
            return reply.code(200).send(skill);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to update skills' });
        }
    }

    async deleteSkill (
        request: FastifyRequest <{ Params: { skill_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const skill_id = parseInt(request.params.skill_id);
            await skillService.deleteSkillById(skill_id);
            return reply.code(204).send();
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to delete skills' });
        }
    }
}