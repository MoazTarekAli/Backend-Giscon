import { FastifySchema } from 'fastify';

export const createStaffSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['staff_name', 'email', 'phone'],
        properties: {
            staff_name: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' }
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                staff_id: { type: 'number' },
                staff_name: { type: 'string' },
                title: { type: 'string' },
                email: { type: 'string', format: 'email' },
                phone: { type: 'string' },
                summary: { type: 'string' }
            }
        }
    }
};

export const getStaffSchema: FastifySchema = {
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
                staff_id: { type: 'number' },
                staff_name: { type: 'string' },
                title: { type: 'string' },
                email: { type: 'string', format: 'email' },
                phone: { type: 'string' },
                summary: { type: 'string' }
            }
        }
    }
};

export const updateStaffSchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['staff_id'],
        properties: {
            staff_id: { type: 'number' }
        }
    },
    body: {
        type: 'object',
        properties: {
            staff_name: { type: 'string' },
            title: { type: 'string' },
            email: { type: 'string', format: 'email' },
            phone: { type: 'string' },
            summary: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                staff_id: { type: 'number' },
                staff_name: { type: 'string' },
                title: { type: 'string' },
                email: { type: 'string', format: 'email' },
                phone: { type: 'string' },
                summary: { type: 'string' }
            }
        }
    }
};

export const deleteStaffSchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['staff_id'],
        properties: {
            staff_id: { type: 'number' }
        }
    },
    response: {
        204: {
            type: 'null'
        }
    }
};

export const getStaffsSchema: FastifySchema = {
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
                            staff_id: { type: 'number' },
                            staff_name: { type: 'string' },
                            title: { type: 'string' },
                            email: { type: 'string', format: 'email' },
                            phone: { type: 'string' },
                            summary: { type: 'string' }
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