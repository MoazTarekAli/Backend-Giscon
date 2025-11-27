import { FastifySchema } from "fastify";

export const createProjectStaffSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['project_id', 'staff_id', 'staff_role'],
        properties: {
            project_id: { type: 'number' },
            staff_id: { type: 'number' },
            staff_role: { type: 'string' }
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                role_id: { type: 'number' },
                staff_id: { type: 'number' },
                project_id: { type: 'number' },
                project_name: { type: 'string' },
                project_description: { type: 'string' },
                staff_role: { type: 'string' }
            }
        }
    }
};

export const getProjectStaffSchema: FastifySchema = {
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
                            project_id: { type: 'number' },
                            staff_id: { type: 'number' },
                            project_name: { type: 'string' },
                            project_description: { type: 'string' },
                            role_id: { type: 'number' },
                            staff_role: { type: 'string' }
                        }
                    }
                },
                total: { type: 'number' }
            }
        }
    }
};

export const updateProjectStaffSchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['role_id'],
        properties: {
            role_id: { type: 'number' }
        }
    },
    body: {
        type: 'object',
        properties: {
            project_id: { type: 'number' },
            staff_id: { type: 'number' },
            staff_role: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                role_id: { type: 'number' },
                staff_id: { type: 'number' },
                project_id: { type: 'number' },
                project_name: { type: 'string' },
                project_description: { type: 'string' },
                staff_role: { type: 'string' }
            }
        }
    }
};

export const deleteProjectStaffSchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['role_id'],
        properties: {
            role_id: { type: 'number' }
        }
    },
    response: {
        204: {
            type: 'null'
        }
    }
};