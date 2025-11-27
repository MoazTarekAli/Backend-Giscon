import { prisma } from "../config/database";
import { CreateTechnologyInput, UpdateTechnologyInput, TechnologyResponse } from "../types/technology.types";

export class TechnologyService {
    async createTechnology(data: CreateTechnologyInput): Promise<TechnologyResponse> {
        const technology = await prisma.technology.create({ data });
        return technology;
    }

    async updateTechnology(technology_id: number, data: UpdateTechnologyInput): Promise<TechnologyResponse> {
        const technology = await prisma.technology.update({
            where: { technology_id },
            data
        });
        return technology;
    }

    async getTechnology(technology_id: number): Promise<TechnologyResponse> {
        const technology = await prisma.technology.findUnique({ 
            where: { technology_id }
        });
        if(technology == null) {
            throw new Error("Technology was not found");
        }
        return technology;
    }

    async getAllTechnology(page: number = 1, limit: number = 10) {
        const skip = (page - 1) * limit;
        const [technologies, total] = await Promise.all([
            prisma.technology.findMany({
            skip,
            take: limit
            }),
            prisma.technology.count()
        ]);
        return {
            data: technologies,
            pagination: {
                page,
                limit,
                total: total
            }
        };
    }

    async deleteTechnology(technology_id: number): Promise<boolean> {
        await prisma.technology.delete({
            where: { technology_id }
        });
        return true;
    }
}