import { FastifySchema } from "fastify";

export const createProjectSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['project_name', 'project_description'],
        properties: {
            project_name: { type: 'string' },
            project_description: { type: 'string' }
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                project_id: { type: 'number' },
                project_name: { type: 'string' },
                project_description: { type: 'string' }
            }
        }
    }
}

export const getProjectSchema: FastifySchema = {
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
                project_id: { type: 'number' },
                project_name: { type: 'string' },
                project_description: { type: 'string' }
            }
        }
    }
}

export const getProjectsSchema: FastifySchema = {
    querystring: {
        type: 'object',
        properties: {
            page: { type: 'number', default: 1 },
            limit: { type: 'number', default: 10 }
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
                            project_name: { type: 'string' },
                            project_description: { type: 'string' }
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

export const updateProjectSchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['project_id'],
        properties: {
            project_id: { type: 'number' }
        }
    },
    body: {
        type: 'object',
        properties: {
            project_name: { type: 'string' },
            project_description: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                project_id: { type: 'number' },
                project_name: { type: 'string' },
                project_description: { type: 'string' }
            }
        }
    }
}

export const deleteProjectSchema: FastifySchema = {
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