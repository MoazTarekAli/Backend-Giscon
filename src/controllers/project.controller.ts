import { FastifyRequest, FastifyReply } from "fastify";
import { ProjectService } from "../services/project.service";
import { CreateProjectInput, UpdateProjectInput } from "../types/project.types";

const projectService = new ProjectService();

export class ProjectController {
    async createProject(
        request: FastifyRequest <{ Body: CreateProjectInput }>,
        reply: FastifyReply
    ) {
        try {
            const project = await projectService.createProject(request.body);
            return reply.code(201).send(project);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to create project' });
        }
    }

    async getProject(
        request: FastifyRequest <{ Params: { project_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const project_id = parseInt(request.params.project_id);
            const project = await projectService.getProject(project_id);
            return reply.code(200).send(project);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to get project' });
        }
    }

    async getProjects(
        request: FastifyRequest<{ Querystring: { page?: number, limit?: number } }>,
        reply: FastifyReply
    ) {
        try {
            const { page = 1, limit = 10 } = request.query;
            const projects = await projectService.getProjects(page, limit);
            return reply.code(200).send(projects);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to get project' });
        }
    }

    async updateProject(
        request: FastifyRequest <{ Params: { project_id: string }, Body: UpdateProjectInput }>,
        reply: FastifyReply
    ) {
        try {
            const project_id = parseInt(request.params.project_id);
            const project = await projectService.updateProject(project_id, request.body);
            return reply.code(200).send(project);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to update project' });
        }
    }

    async deleteProject(
        request: FastifyRequest <{ Params: { project_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const project_id = parseInt(request.params.project_id);
            await projectService.deleteProject(project_id);
            return reply.code(204).send();
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to delete project' });
        }
    }
}