import { CreateProjectInput, UpdateProjectInput, ProjectResponse } from "../types/project.types";
import { prisma } from '../config/database';

export class ProjectService {
    async createProject(data: CreateProjectInput): Promise<ProjectResponse> {
        const project = await prisma.project.create({ data });
        return project;
    }

    async getProject(project_id: number): Promise<ProjectResponse> {
        const project = await prisma.project.findUnique({
            where: { project_id }
        });
        if (project == null){
            throw new Error("Project was not found");
        }
        return project;
    }

    async getProjects(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const projects = await prisma.project.findMany({
            skip,
            take: limit
        });
        return {
            data: projects,
            pagination: {
                page,
                limit,
                total: projects.length
            }
        }
    }

    async updateProject(project_id: number, data: UpdateProjectInput): Promise<ProjectResponse> {
        const project = await prisma.project.update({
            where: { project_id },
            data
        });
        return project;
    }

    async deleteProject(project_id: number): Promise<boolean> {
        await prisma.project.delete({ 
            where: { project_id }
        });
        return true;
    }
}