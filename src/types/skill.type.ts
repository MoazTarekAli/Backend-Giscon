export interface Skill {
    skill_id: number,
    skill_name: string,
    skill_type: string
}

export interface CreateSkillInput {
    skill_name: string,
    skill_type?: string
}

export interface UpdateSkillInput {
    skill_name?: string,
    skill_type?: string
}

export interface SkillResponse {
    skill_id: number,
    skill_name: string,
    skill_type?: string
}