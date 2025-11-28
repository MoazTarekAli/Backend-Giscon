export interface Technology {
    technology_id: number,
    technology_name: string,
}

export interface CreateTechnologyInput {
    technology_name: string
}

export interface UpdateTechnologyInput {
    technology_name?: string
}

export interface TechnologyResponse {
    technology_id: number,
    technology_name: string,
}