import { FastifySchema } from 'fastify';

export const getCVHTMLSchema: FastifySchema = {
    tags: ['cv'],
    params: {
        type: 'object',
        required: ['staff_id'],
        properties: {
            staff_id: { type: 'number' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                data: { type: 'string' }
            }
        }
    }
};

export const getCVPDFSchema: FastifySchema = {
    tags: ['cv'],
    params: {
        type: 'object',
        required: ['staff_id'],
        properties: {
            staff_id: { type: 'number' }
        }
    },
    response: {
        200: {
            type: 'string',
            format: 'binary'
        }
    }
};