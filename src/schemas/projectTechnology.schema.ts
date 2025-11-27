import { FastifySchema } from "fastify";

export const createProjectTechnologySchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['project_id', 'technology_id'],
        properties: {
            project_id: { type: 'number' },
            technology_id: { type: 'number' },
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            technology_id: { type: 'number' },
                            technology_name: { type: 'string' },
                        }
                    }
                },
                total: { type: 'number' }
            }
        }
    }
}

export const getProjectTechnologySchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['project_id'],
        properties: {
            project_id: { type: 'number' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            technology_id: { type: 'number' },
                            technology_name: { type: 'string' },
                        }
                    }
                },
                total: { type: 'number' }
            }
        }
    }
}

export const deleteProjectTechnologySchema: FastifySchema = {
    querystring: {
        type: 'object',
        required: ['project_id', 'technology_id'],
        properties: {
            project_id: { type: 'number' },
            technology_id: { type: 'number' },
        }
    },
    response: {
        204: {
            type: 'null'
        }
    }
}

export const deleteAllProjectTechnologySchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['project_id'],
        properties: {
            project_id: { type: 'number' }
        }
    },
    response: {
        204: {
            type: 'null'
        }
    }
}