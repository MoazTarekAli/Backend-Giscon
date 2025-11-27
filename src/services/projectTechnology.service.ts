import { prisma } from '../config/database';
import { CreateProjectTechnologyInput } from '../types/projectTechnology.types';
import { TechnologyResponse } from '../types/technology.types';

export class ProjectTechnologyService {
    async createProjectTechnology (data: CreateProjectTechnologyInput): Promise <{ data: TechnologyResponse[], total: number}> {
        await prisma.project_Technology.create({ data });
        return await this.getProjectTechnologies(data.project_id);
    }

    async getProjectTechnologies (project_id: number): Promise <{ data: TechnologyResponse[], total: number}> {
        const technologies = await prisma.technology.findMany({
            where: {
                project_technology: {
                    some: {
                        project_id
                    }
                }
            }
        });
        return {
            data: technologies,
            total: technologies.length
        }
    }

    async deleteProjectTechnology (project_id: number, technology_id: number): Promise<boolean> {
        await prisma.project_Technology.delete({
            where: {
                project_id_technology_id: {
                    project_id,
                    technology_id
                }
            }
        });
        return true;
    }

    async deleteAllProjectTechnologies (project_id: number): Promise<boolean> {
        await prisma.project_Technology.deleteMany({
            where: {
                project_id
            }
        });
        return true;
    }
}