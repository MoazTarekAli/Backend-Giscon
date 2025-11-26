import { FastifySchema } from "fastify";

export const createSkillSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['skill_name'],
        properties: {
            skill_name: { type: 'string' },
            skill_type: { type: 'string' }
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                skill_id: { type: 'number' },
                skill_name: { type: 'string' },
                skill_type: { type: 'string' }
            }
        }
    }
};

export const updateSkillSchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['skill_id'],
        properties: {
            skill_id: { type: 'string' }
        }
    },
    body: {
        type: 'object',
        properties: {
            skill_name: { type: 'string' },
            skill_type: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                skill_id: { type: 'number' },
                skill_name: { type: 'string' },
                skill_type: { type: 'string' }
            }
        }
    }
};

export const getSkillSchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['skill_id'],
        properties: {
            skill_id: { type: 'number' }
        } 
    },
    response: {
        200: {
            type: 'object',
            properties: {
                skill_id: { type: 'number' },
                skill_name: { type: 'string' },
                skill_type: { type: 'string' }
            }
        }
    }
};

export const getSkillsSchema: FastifySchema = {
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
                            skill_id: { type: 'number' },
                            skill_name: { type: 'string' },
                            skill_type: { type: 'string' }
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

export const deleteSkillSchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['skill_id'],
        properties: {
            skill_id: { type: 'number' }
        }
    },
    response: {
        204: {
            type: 'null'
        }
    }
};