import { FastifySchema } from "fastify";

export const createTechnologySchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['technology_name'],
        properties: {
            technology_name: { type: 'string' },
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                technology_id: { type: 'number' },
                technology_name: { type: 'string' }
            }
        }
    }
};

export const updateTechnologySchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['technology_id'],
        properties: {
            technology_id: { type: 'string' }
        }
    },
    body: {
        type: 'object',
        properties: {
            technology_name: { type: 'string' },
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                technology_id: { type: 'number' },
                technology_name: { type: 'string' }
            }
        }
    }
};

export const getTchnologySchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['technology_id'],
        properties: {
            technology_id: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                technology_id: { type: 'number' },
                technology_name: { type: 'string' }
            }
        }
    }
};

export const getAllTechnologySchema: FastifySchema = {
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'number', default: 1 },
            limit: { type: 'number', default: 10 }
        }
    },
    response: {
        200:{
            type: 'object',
            properties: {
                data: {
                    type: 'array',
                    items: {
                        type: 'object',
                        properties: {
                            technology_id: { type: 'number' },
                            technology_name: { type: 'string' }
                        }
                    }
                },
                pagination: {
                    type: 'object',
                    properties: {
                        page: { type: 'number' },
                        limit: { type: 'number' },
                        total: { type: 'number' }
                    }
                }
            }
        }
    }
};

export const deleteTechnologySchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['technology_id'],
        properties: {
            technology_id: { type: 'string' }
        }
    },
    response: {
        204: {
            type: 'null'
        }
    }
};