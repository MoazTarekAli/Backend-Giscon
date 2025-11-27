import { FastifyRequest, FastifyReply } from 'fastify';
import { ProjectTechnologyService } from '../services/projectTechnology.service';
import { CreateProjectTechnologyInput } from '../types/projectTechnology.types';

const projectTechnologyService = new ProjectTechnologyService();

export class ProjectTechnologyController {
    async createProjectTechnology(
        request: FastifyRequest<{ Body: CreateProjectTechnologyInput }>,
        reply: FastifyReply
    ) {
        try {
            const projectTechnologies = await projectTechnologyService.createProjectTechnology(request.body);
            return reply.code(201).send(projectTechnologies);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to add technology to project' });
        }
    }

    async getProjectTechnologies(
        request: FastifyRequest<{ Params: {project_id: string} }>,
        reply: FastifyReply
    ) {
        try {
            const project_id = parseInt(request.params.project_id);
            const projectTechnologies = await projectTechnologyService.getProjectTechnologies(project_id);
            return reply.code(200).send(projectTechnologies);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to get project technologies' });
        }
    }

    async deleteProjectTechnology(
        request: FastifyRequest<{ Querystring: { project_id: string, technology_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const project_id = parseInt(request.query.project_id);
            const technology_id = parseInt(request.query.technology_id);
            await projectTechnologyService.deleteProjectTechnology(project_id, technology_id);
            return reply.code(204).send();
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to delete technology of project' });
        }
    }

    async deleteProjectTechnologies(
        request: FastifyRequest<{ Params: {project_id: string} }>,
        reply: FastifyReply
    ) {
        try {
            const project_id = parseInt(request.params.project_id);
            await projectTechnologyService.deleteAllProjectTechnologies(project_id);
            return reply.code(204).send();
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to delete technologies of project' });
        }
    }
}