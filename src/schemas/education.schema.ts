import { FastifySchema } from 'fastify';

export const createEducationSchema: FastifySchema = {
    tags: ['education'],
    body: {
        type: 'object',
        required: ['staff_id', 'degree', 'institution', 'start_date'],
        properties: {
            staff_id: { type: 'number' },
            degree: { type: 'string' },
            institution: { type: 'string' },
            field_of_study: { type: 'string' },
            start_date: { type: 'string' },
            end_date: { type: 'string' }
        }
    },
    response: {
        201: {
            type: 'object',
            properties: {
                education_id: { type: 'number' },
                staff_id: { type: 'number' },
                degree: { type: 'string' },
                institution: { type: 'string' },
                field_of_study: { type: 'string' },
                start_date: { type: 'string' },
                end_date: { type: 'string' }
            }
        }
    }
};

export const getEducationSchema: FastifySchema = {
    tags: ['education'],
    params: {
        type: 'object',
        required: ['education_id'],
        properties: {
            education_id: { type: 'number' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                education_id: { type: 'number' },
                staff_id: { type: 'number' },
                degree: { type: 'string' },
                institution: { type: 'string' },
                field_of_study: { type: 'string' },
                start_date: { type: 'string' },
                end_date: { type: 'string' }
            }
        }
    }
};

export const getAllStaffEducationSchema: FastifySchema = {
    tags: ['education'],
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
                            education_id: { type: 'number' },
                            staff_id: { type: 'number' },
                            degree: { type: 'string' },
                            institution: { type: 'string' },
                            field_of_study: { type: 'string' },
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

export const updateEducationSchema: FastifySchema = {
    tags: ['education'],
    params: {
        type: 'object',
        required: ['education_id'],
        properties: {
            education_id: { type: 'number' }
        }
    },
    body: {
        type: 'object',
        properties: {
            staff_id: { type: 'number' },
            degree: { type: 'string' },
            institution: { type: 'string' },
            field_of_study: { type: 'string' },
            start_date: { type: 'string' },
            end_date: { type: 'string' }
        }
    },
    response: {
        200: {
            type: 'object',
            properties: {
                education_id: { type: 'number' },
                staff_id: { type: 'number' },
                degree: { type: 'string' },
                institution: { type: 'string' },
                field_of_study: { type: 'string' },
                start_date: { type: 'string' },
                end_date: { type: 'string' }
            }
        }
    }
};

export const deleteEducationSchema: FastifySchema = {
    tags: ['education'],
    params: {
        type: 'object',
        required: ['education_id'],
        properties: {
            education_id: { type: 'number' }
        }
    },
    response: {
        204: {
            type: 'null'
        }
    }
};

export const deleteAllEducationsSchema: FastifySchema = {
    tags: ['education'],
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