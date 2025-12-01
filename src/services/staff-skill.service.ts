import { prisma } from '../config/database';
import { CreateStaffSkillInput } from "../types/staff-skill.type";
import { SkillResponse } from "../types/skill.type";

export class StaffSkillService {
    private mapToResponse(skill: any): SkillResponse {
        return {
            skill_id: skill.skill_id,
            skill_name: skill.skill_name,
            skill_type: skill.skill_type ?? undefined
        }
    }

    async createStaffSkill(data: CreateStaffSkillInput): Promise<{ data: SkillResponse[], total: number }> {
        await prisma.staff_Skills.create({ data });
        return this.getStaffSkills(data.staff_id);
    }

    async getStaffSkills(staff_id: number): Promise<{ data: SkillResponse[], total: number }> {
        const allStaffSkills = await prisma.skill.findMany({
            where: {
                staff_skills: {
                    some: {
                        staff_id
                    }
                }
            }
        });
        return {
            data: allStaffSkills.map(staffSkill => this.mapToResponse(staffSkill)),
            total: allStaffSkills.length
        };
    }

    async deleteStaffSkill(staff_id: number, skill_id: number): Promise<boolean> {
        await prisma.staff_Skills.delete({
            where: {
                staff_id_skill_id: {
                    staff_id,
                    skill_id
                }
            }
        });
        return true;
    }

    async deleteAllStaffSkills(staff_id: number): Promise<boolean> {
        await prisma.staff_Skills.deleteMany({
            where: {
                staff_id
            }
        });
        return true;
    }
}