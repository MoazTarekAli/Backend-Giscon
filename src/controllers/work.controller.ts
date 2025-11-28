import { FastifyRequest, FastifyReply } from 'fastify';
import { WorkService } from '../services/work.service';
import { CreateWorkExperienceInput, UpdateWorkExperienceInput } from '../types/work.type';

const workService = new WorkService();

export class WorkController {
    async createWork(
        request: FastifyRequest<{ Body: CreateWorkExperienceInput }>,
        reply: FastifyReply
    ) {
        try {
            const work = await workService.createWork(request.body);
            return reply.code(201).send(work);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to create work' });
        }
    }

    async getWorkById(
        request: FastifyRequest<{ Params: { work_id: string }}>,
        reply: FastifyReply
    ) {
        try {
            const work_id = parseInt(request.params.work_id);
            const work = await workService.getWorkById(work_id);

            if (!work) {
                return reply.code(404).send({ error: 'Work experience not found' });
            }

            return reply.code(200).send(work);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to fetch work experience' });
        }
    }

    async getAllWorkByStaffId(
        request: FastifyRequest<{ Params: { staff_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const staff_id = parseInt(request.params.staff_id);
            const works = await workService.getAllWorkByStaffId(staff_id);
            return reply.code(200).send(works); 
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to fetch All work experience' });
        }
    }

    async updateWorkById(
        request: FastifyRequest<{ Params: { work_id: string }; Body: UpdateWorkExperienceInput }>,
        reply: FastifyReply
    ) {
        try {
            const work_id = parseInt(request.params.work_id);
            const work = await workService.updateWorkById(work_id, request.body);

            if (!work) {
                return reply.code(404).send({ error: 'Work not found' });
            }

            return reply.code(200).send(work);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to update work' });
        }
    }

    async deleteWorkById(
        request: FastifyRequest<{ Params: { work_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const work_id = parseInt(request.params.work_id);
            await workService.deleteWorkById(work_id);
            return reply.code(204).send();
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to delete work' });
        }
    }

    async deleteWorkByStaffId(
        request: FastifyRequest<{ Params: { staff_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const staff_id = parseInt(request.params.staff_id);
            await workService.deleteAllWorkByStaffId(staff_id);
            return reply.code(204).send();
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to delete all works' });
        }
    }
}