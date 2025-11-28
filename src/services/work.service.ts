import { CreateWorkExperienceInput, UpdateWorkExperienceInput, WorkExperienceResponse } from "../types/work.type";
import { prisma } from '../config/database';

export class WorkService {
    private mapToResponse(work: any): WorkExperienceResponse {
        return {
            work_id: work.work_id,
            staff_id: work.staff_id,
            company: work.company,
            work_title: work.work_title,
            responsibilities: work.responsibilities,
            start_date: work.start_date,
            end_date: work.end_date ?? undefined
        };
    }

    async createWork(data: CreateWorkExperienceInput): Promise<WorkExperienceResponse> {
        const work = await prisma.work_Experience.create({ data });
        return this.mapToResponse(work);
    }
    
    async getWorkById(work_id: number): Promise<WorkExperienceResponse | null> {
        const work = await prisma.work_Experience.findUnique({
            where: { work_id }
        });
        if (!work) {
            return null;
        }
        return this.mapToResponse(work);
    }

    async getAllWorkByStaffId(staff_id: number) {
        const [works, total] = await Promise.all([
                    prisma.work_Experience.findMany({
                        where: { staff_id }
                    }),
                    prisma.work_Experience.count({
                        where: { staff_id }
                    })
        ]);
        return {
            data: works.map(work => this.mapToResponse(work)),
            total:  total 
        }
    }

    async updateWorkById(work_id: number, data: UpdateWorkExperienceInput): Promise<WorkExperienceResponse> {
        const work = await prisma.work_Experience.update({
            where: { work_id },
            data
        });
        return this.mapToResponse(work);
    }

    async deleteWorkById(work_id: number): Promise<boolean> {
        await prisma.work_Experience.delete({
            where: { work_id }
        });
        return true;
    }

    async deleteAllWorkByStaffId(staff_id: number): Promise<boolean> {
        await prisma.work_Experience.deleteMany({
            where: { staff_id }
        });
        return true;
    }
}