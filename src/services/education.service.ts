import { CreateEducationInput, UpdateEducationInput, EducationResponse } from "../types/education.types";
import { prisma } from "../config/database";

export class EducationService {
    private mapToResponse(education: any): EducationResponse {
        return {
            education_id: education.education_id,
            staff_id: education.staff_id,
            degree: education.degree,
            institution: education.institution,
            field_of_study: education.field_of_study ?? undefined,
            start_date: education.start_date,
            end_date: education.end_date ?? undefined
        };
    }

    async createEducation(data: CreateEducationInput): Promise<EducationResponse> {
        const education = await prisma.education.create({ data });
        return this.mapToResponse(education);
    }

    async getEducationById(education_id: number): Promise<EducationResponse | null> {
        const education = await prisma.education.findUnique({ 
            where: { education_id }
        });
        if (!education) {
            return null;
        }
        return this.mapToResponse(education);
    }

    async getAllEducationsByStaffId(staff_id: number) {
        const [educations, total] = await Promise.all([
            prisma.education.findMany({
                where: { staff_id }
            }),
            prisma.education.count({
                where: { staff_id }
            })
        ]);
        return {
            data: educations.map(education => this.mapToResponse(education)),
            total: total
        }
    }

    async updateEducationById(education_id: number, data: UpdateEducationInput): Promise<EducationResponse> {
        const education = await prisma.education.update({
            where: { education_id },
            data
        });
        return this.mapToResponse(education);
    }

    async deleteEducationById(education_id: number): Promise<boolean> {
        await prisma.education.delete({
            where: { education_id }
        });
        return true;
    }

    async deleteAllEducationByStaffId(staff_id: number): Promise<boolean> {
        await prisma.education.deleteMany({
            where: { staff_id }
        });
        return true;
    }
}