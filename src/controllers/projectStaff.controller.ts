import { FastifyRequest, FastifyReply } from 'fastify';
import { CreateProjectStaffInput, UpdateProjectStaffInput, ProjectStaffResponse } from '../types/project-staff.type';
import { ProjectStaffService } from '../services/project-staff.service';

const projectStaffService = new ProjectStaffService();

export class ProjectStaffController {
    async createProjectStaff(
        request: FastifyRequest<{ Body: CreateProjectStaffInput }>,
        reply: FastifyReply
    ) {
        try {
            const projectStaff = await projectStaffService.createProjectStaff(request.body);
            return reply.code(201).send(projectStaff);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to add staff to project' });
        }
    }

    async getProjectStaff(
        request: FastifyRequest<{ Params: { staff_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const staff_id = parseInt(request.params.staff_id);
            const projectStaff = await projectStaffService.getProjectStaff(staff_id);
            return reply.code(200).send(projectStaff);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to get projects that staff work on' });
        }
    }

    async updateProjectStaff(
        request: FastifyRequest<{ Params: { role_id: string }, Body: UpdateProjectStaffInput }>,
        reply: FastifyReply
    ) {
        try {
            const role_id = parseInt(request.params.role_id);
            const projectStaff = await projectStaffService.updateProjectStaff(role_id, request.body);
            return reply.code(200).send(projectStaff);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to update role of staff in project' });
        }
    }

    async deleteProjectStaff(
        request: FastifyRequest<{ Params: { role_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const role_id = parseInt(request.params.role_id);
            await projectStaffService.deleteProjectStaff(role_id);
            return reply.code(204).send();
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to delete role of staff in project' });
        }
    }
}