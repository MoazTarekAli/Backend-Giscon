export interface Education {
    education_id: number,
    staff_id: number,
    degree: string,
    institution: string,
    field_of_study: string,
    start_date: Date,
    end_date: Date
}

export interface CreateEducationInput {
    staff_id: number,
    degree: string,
    institution: string,
    field_of_study?: string,
    start_date: string,
    end_date?: Date
}

export interface UpdateEducationInput {
    degree?: string,
    institution?: string,
    field_of_study?: string,
    start_date?: Date,
    end_date?: Date
}

export interface EducationResponse {
    education_id: number,
    staff_id: number,
    degree: string,
    institution: string,
    field_of_study?: string,
    start_date: Date,
    end_date?: Date
}