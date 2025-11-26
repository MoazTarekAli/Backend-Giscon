import { CreateSkillInput, UpdateSkillInput, SkillResponse } from "../types/skill.types";
import { prisma } from '../config/database';

export class SkillService {
    private mapToResponse(skill: any): SkillResponse {
        return {
            skill_id: skill.skill_id,
            skill_name: skill.skill_name,
            skill_type: skill.skill_type ?? undefined
        }
    }

    async createSkill(data: CreateSkillInput): Promise<SkillResponse> {
        const skill = await prisma.skill.create({ data });
        return this.mapToResponse(skill);
    }

    async getSkillById(skill_id: number): Promise<SkillResponse> {
        const skill = await prisma.skill.findUnique({
            where: { skill_id }
        });
        return this.mapToResponse(skill);
    }

    async getAllSkills(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [skills, total] = await Promise.all([
            prisma.skill.findMany({
                skip,
                take: limit
            }),
            prisma.skill.count()
        ]);
        return {
            data: skills.map(skill => this.mapToResponse(skill)),
            pagination: {
                page,
                limit,
                total
            }
        };
    }

    async updateSkillById(skill_id: number, data: UpdateSkillInput): Promise<SkillResponse> {
        const skill = await prisma.skill.update({
            where: { skill_id },
            data
        });
        return this.mapToResponse(skill);
    }

    async deleteSkillById(skill_id: number): Promise<boolean> {
        await prisma.skill.delete({
            where: { skill_id }
        });
        return true;
    }
}