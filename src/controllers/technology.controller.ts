import { FastifyRequest, FastifyReply } from 'fastify';
import { TechnologyService } from '../services/technology.service';
import { CreateTechnologyInput, UpdateTechnologyInput } from '../types/technology.types';

const technologyService = new TechnologyService();

export class TechnologyController {
    async createTechnology(
        request: FastifyRequest <{ Body: CreateTechnologyInput }>,
        reply: FastifyReply
    ) {
        try {
            const technology = await technologyService.createTechnology(request.body);
            return reply.code(201).send(technology);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to create technology' });
        }
    }

    async updateTechnology(
        request: FastifyRequest <{ Params: { technology_id: string }, Body: UpdateTechnologyInput }>,
        reply: FastifyReply
    ) {
        try {
            const technology_id = parseInt(request.params.technology_id);
            const technology = await technologyService.updateTechnology(technology_id, request.body)
            return reply.code(200).send(technology);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to update technology' });
        }
    }

    async getTechnology(
        request: FastifyRequest <{ Params: { technology_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const technology_id = parseInt(request.params.technology_id);
            const technology = await technologyService.getTechnology(technology_id);
            return reply.code(200).send(technology);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to get technology' });
        }
    }

    async getAllTechnologies(
        request: FastifyRequest <{ Querystring: { page?: number, limit?: number } }>,
        reply: FastifyReply
    ) {
        try {
            const { page = 1, limit = 10 } = request.query;
            const result = await technologyService.getAllTechnology(page, limit);
            return reply.code(200).send(result);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to get technologies' });
        }
    }

    async deleteTechnology(
        request: FastifyRequest <{ Params: { technology_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const technology_id = parseInt(request.params.technology_id);
            await technologyService.deleteTechnology(technology_id);
            return reply.code(204).send();
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to delete technology' });
        }
    }
}