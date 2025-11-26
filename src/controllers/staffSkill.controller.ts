import { FastifyRequest, FastifyReply } from 'fastify';
import { StaffSkillService } from '../services/staffSkill.service';
import { CreateStaffSkillInput } from '../types/staffSkill.types';

const staffSkillService = new StaffSkillService();

export class StaffSkillController {
    async createStaffSkill(
        request: FastifyRequest<{ Body: CreateStaffSkillInput }>,
        reply: FastifyReply
    ) {
        try {
            const staffSkills = await staffSkillService.createStaffSkill(request.body);
            return reply.code(201).send(staffSkills);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to add skill to staff' });
        }
    }

    async getStaffSkills(
        request: FastifyRequest<{ Params: { staff_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const staff_id = parseInt(request.params.staff_id);
            const staffSkills = await staffSkillService.getStaffSkills(staff_id);
            return reply.code(200).send(staffSkills);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to get staff skills' });
        }
    }

    async deleteStaffSkill(
        request: FastifyRequest<{ Querystring: { staff_id: string, skill_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const staff_id = parseInt(request.query.staff_id);
            const skill_id = parseInt(request.query.skill_id);
            await staffSkillService.deleteStaffSkill(staff_id, skill_id);
            return reply.code(204).send();
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to delete this staff skill' });
        }
    }

    async deleteAllStaffSkill(
        request: FastifyRequest<{ Params: { staff_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const staff_id = parseInt(request.params.staff_id);
            await staffSkillService.deleteAllStaffSkills(staff_id);
            return reply.code(204).send();
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to delete all staff skills' });
        }
    }
}