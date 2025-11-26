import { FastifySchema } from "fastify";

export const createStaffSkillSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['skill_id', 'staff_id'],
        properties: {
            staff_id: { type: 'number' },
            skill_id: { type: 'number' },
            skill_name: { type: 'string' }
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
                            skill_id: { type: 'number' },
                            skill_name: { type: 'string' },
                            skill_type: { type: 'string' }
                        }
                    }
                },
                total: { type: 'number' }
            }
        }
    }
};

export const getStaffSkillsSchema: FastifySchema = {
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
                total: { type: 'number' }
            }
        }
    }
};

export const deleteStaffSkillSchema: FastifySchema = {
    querystring: {
        type: 'object',
        required: ['skill_id', 'staff_id'],
        properties: {
            staff_id: { type: 'number' },
            skill_id: { type: 'number' },
        }
    },
    response: {
        204: {
            type: 'null'
        }
    }
};

export const deleteAllStaffSkillsSchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['staff_id'],
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