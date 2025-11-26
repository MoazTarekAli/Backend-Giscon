import { FastifySchema } from 'fastify';

export const createWorkSchema: FastifySchema = {
    body: {
        type: 'object',
        required: ['staff_id', 'company', 'work_title', 'responsibilities', 'start_date'],
        properties: {
            staff_id: { type: 'number' },
            company: { type: 'string' },
            work_title: { type: 'string' },
            responsibilities: { type: 'string' },
            start_date: { type: 'string' },
            end_date: { type: 'string' }
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                work_id: { type: 'number' },
                staff_id: { type: 'number' },
                company: { type: 'string' },
                work_title: { type: 'string' },
                responsibilities: { type: 'string' },
                start_date: { type: 'string' },
                end_date: { type: 'string' }
            }
        }
    }
};

export const getWorkSchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['work_id'],
        properties: {
            work_id: { type: 'number' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                work_id: { type: 'number' },
                staff_id: { type: 'number' },
                company: { type: 'string' },
                work_title: { type: 'string' },
                responsibilities: { type: 'string' },
                start_date: { type: 'string' },
                end_date: { type: 'string' }
            }
        }
    }
};

export const getAllStaffWorkSchema: FastifySchema = {
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
                            work_id: { type: 'number' },
                            staff_id: { type: 'number' },
                            company: { type: 'string' },
                            work_title: { type: 'string' },
                            responsibilities: { type: 'string' },
                            start_date: { type: 'string' },
                            end_date: { type: 'string' }
                        }
                    }
                },
                total: { type: 'number' }
            }
        }
    }
};

export const updateWorkSchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['work_id'],
        properties: {
            work_id: { type: 'number' }
        }
    },
    body: {
        type: 'object',
        properties: {
            staff_id: { type: 'number' },
            company: { type: 'string' },
            work_title: { type: 'string' },
            responsibilities: { type: 'string' },
            start_date: { type: 'string' },
            end_date: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                work_id: { type: 'number' },
                staff_id: { type: 'number' },
                company: { type: 'string' },
                work_title: { type: 'string' },
                responsibilities: { type: 'string' },
                start_date: { type: 'string' },
                end_date: { type: 'string' }
            }
        }
    }
};

export const deleteWorkSchema: FastifySchema = {
    params: {
        type: 'object',
        required: ['work_id'],
        properties: {
            work_id: { type: 'number' }
        }
    },
    response: {
        204: {
            type: 'null'
        }
    }
};

export const deleteAllWorksSchema: FastifySchema = {
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