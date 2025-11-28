import { FastifyRequest, FastifyReply } from 'fastify';
import { StaffService } from '../services/staff.service';
import { CreateStaffInput, UpdateStaffInput } from '../types/staff.type';

const staffService = new StaffService();

export class StaffController {
    async createStaff(
        request: FastifyRequest<{ Body: CreateStaffInput }>,
        reply: FastifyReply
    ) {
        try {
            const staff = await staffService.createStaff(request.body);
            return reply.code(201).send(staff);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to create user' });
        }
    }

    async getStaffById(
        request: FastifyRequest<{ Params: { staff_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const staff_id = parseInt(request.params.staff_id);
            const staff = await staffService.getStaffById(staff_id);

            if (!staff) {
                return reply.code(404).send({ error: 'User not found' });
            }

            return reply.code(200).send(staff);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to fetch user' });
        }
    }

    async getAllStaff(
        request: FastifyRequest<{ Querystring: { page?: number; limit?: number } }>,
        reply: FastifyReply
    ) {
        try {
            const { page = 1, limit = 10 } = request.query;
            const result = await staffService.getAllStaff(page, limit);
            return reply.code(200).send(result);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to fetch users' });
        }
    }

    async updateStaffById(
        request: FastifyRequest<{ Params: { staff_id: string }, Body: UpdateStaffInput }>,
        reply: FastifyReply
    ) {
        try {
            const staff_id = parseInt(request.params.staff_id);
            const user = await staffService.updateStaffById(staff_id, request.body);

            if (!user) {
                return reply.code(404).send({ error: 'User not found' });
            }

            return reply.code(200).send(user);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to update user' });
        }
    }

    async deleteStaff(
        request: FastifyRequest<{ Params: { staff_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const staff_id = parseInt(request.params.staff_id);
            await staffService.deleteStaffById(staff_id);
            return reply.code(204).send();
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to delete user' });
        }
    }
}