import { prisma } from '../config/database';
import { CreateProjectStaffInput, UpdateProjectStaffInput, ProjectStaffResponse } from '../types/projectStaff.types';

export class ProjectStaffService {
    private mapToResponse(projectStaff: any): ProjectStaffResponse {
        return {
            role_id: projectStaff.role_id,
            staff_id: projectStaff.staff_id,
            project_id: projectStaff.project_id,
            project_name: projectStaff.project.project_name,
            project_description: projectStaff.project.project_description,
            staff_role: projectStaff.staff_role
        };
    }

    async createProjectStaff(data: CreateProjectStaffInput): Promise<ProjectStaffResponse> {
        const projectStaff = await prisma.project_Staff.create({
            data,
            include: {
                project: true
            }
        });
        return this.mapToResponse(projectStaff);
    }

    async getProjectStaff(staff_id: number): Promise<{ data: ProjectStaffResponse[], total: number }> {
        const projectStaff = await prisma.project_Staff.findMany({
            where: {
                staff_id
            },
            include: {
                project: true
            }
        });
        return {
            data: projectStaff.map(project => this.mapToResponse(project)),
            total: projectStaff.length
        }
    }

    async updateProjectStaff(role_id: number, data: UpdateProjectStaffInput): Promise<ProjectStaffResponse> {
        const projectStaff = await prisma.project_Staff.update({
            where: {
                role_id
            },
            data,
            include: {
                project: true
            }
        });
        return this.mapToResponse(projectStaff);
    }

    async deleteProjectStaff(role_id: number): Promise<boolean> {
        await prisma.project_Staff.delete({
            where: { role_id }
        });
        return true;
    }
}