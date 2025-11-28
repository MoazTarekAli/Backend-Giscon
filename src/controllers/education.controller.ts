import { FastifyRequest, FastifyReply } from 'fastify';
import { EducationService } from "../services/education.service";
import { CreateEducationInput, UpdateEducationInput } from "../types/education.type";

const educationService = new EducationService();

export class EducationController {
    async createEducation(
        request: FastifyRequest<{ Body: CreateEducationInput }>,
        reply: FastifyReply
    ) {
        try {
            const education = await educationService.createEducation(request.body);
            return reply.code(201).send(education);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to create education' })
        }
    }

    async getEducationById(
        request: FastifyRequest <{ Params: { education_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const education_id = parseInt(request.params.education_id);
            const education = await educationService.getEducationById(education_id);
            return reply.code(200).send(education);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to fetch education' });
        }
    }

    async getAllEducationByStaffId(
        request: FastifyRequest <{ Params: { staff_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const staff_id = parseInt(request.params.staff_id);
            const educations = await educationService.getAllEducationsByStaffId(staff_id);
            return reply.code(200).send(educations);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to fetch All eudcations' });
        }
    }

    async updateEducationById(
        request: FastifyRequest <{ Params: { education_id: string }; Body: UpdateEducationInput }>,
        reply: FastifyReply
    ) {
        try {
            const education_id = parseInt(request.params.education_id);
            const education = await educationService.updateEducationById(education_id, request.body);
            return reply.code(200).send(education);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to update education' })
        }
    }

    async deleteEducationById(
        request: FastifyRequest <{ Params: { education_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const education_id = parseInt(request.params.education_id);
            await educationService.deleteEducationById(education_id);
            return reply.code(204).send();
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to delete education' });
        }
    }

    async deleteAllEducationByStaffId(
        request: FastifyRequest <{ Params: { staff_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const staff_id = parseInt(request.params.staff_id);
            await educationService.deleteAllEducationByStaffId(staff_id);
            return reply.code(204).send();
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to delete all educations' });
        }
    }
}