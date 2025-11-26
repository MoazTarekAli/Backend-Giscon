import { CreateStaffInput, UpdateStaffInput, StaffResponse } from '../types/staff.types';
import { prisma } from '../config/database';

export class StaffService {
    private mapToResponse(staff: any): StaffResponse {
        return {
            staff_id: staff.staff_id,
            email: staff.email,
            phone: staff.phone,
            staff_name: staff.staff_name,
            title: staff.title ?? undefined,
            summary: staff.summary ?? undefined
        };
    }

    async createStaff(data: CreateStaffInput): Promise<StaffResponse> {
        const staff = await prisma.staff.create({ data });
        return this.mapToResponse(staff);
    }

    async getStaffById (staff_id: number): Promise<StaffResponse | null> {
        const staff = await prisma.staff.findUnique({
            where: { staff_id }
        });
        if (!staff) {
            return null;
        }
        return this.mapToResponse(staff);
    }

    // define return of all users 
    async getAllStaff(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [staffs, total] = await Promise.all([
            prisma.staff.findMany({
                skip,
                take: limit,
            }),
            prisma.staff.count()
        ]);
        return {
            data: staffs.map(staff => this.mapToResponse(staff)),
            pagination: {
                page,
                limit,
                total
            }
        };
    }

    async updateStaffById(staff_id: number, data: UpdateStaffInput): Promise<StaffResponse> {
        const staff = await prisma.staff.update({
            where: { staff_id },
            data
        });
        return this.mapToResponse(staff);
    }
    
    async deleteStaffById(staff_id: number): Promise<boolean> {
        await prisma.staff.delete({
            where: { staff_id }
        });
        return true;
    }
}