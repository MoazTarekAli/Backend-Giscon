export interface WorkExperience {
    work_id: number,
    staff_id: number,
    company: string,
    work_title: string,
    responsibilities: string,
    start_date: Date,
    end_date: Date
}

export interface CreateWorkExperienceInput {
    staff_id: number,
    company: string,
    work_title: string,
    responsibilities: string,
    start_date: Date,
    end_date?: Date
}

export interface UpdateWorkExperienceInput {
    company?: string,
    work_title?: string,
    responsibilities?: string,
    start_date?: Date,
    end_date?: Date
}

export interface WorkExperienceResponse {
    work_id: number,
    staff_id: number,
    company: string,
    work_title: string,
    responsibilities: string,
    start_date: Date,
    end_date?: Date
}