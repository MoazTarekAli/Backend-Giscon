export interface Project {
    project_id: number,
    project_name: string,
    project_description: string
}

export interface CreateProjectInput {
    project_name: string,
    project_description: string
}

export interface UpdateProjectInput {
    project_name?: string,
    project_description?: string
}

export interface ProjectResponse {
    project_id: number,
    project_name: string,
    project_description: string
}