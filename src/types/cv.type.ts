import { StaffResponse } from "./staff.type"
import { EducationResponse } from "./education.type"
import { WorkExperienceResponse } from "./work.type"
import { SkillResponse } from "./skill.type"
import { ProjectStaffResponse } from "./project-staff.type"
import { TechnologyResponse } from "./technology.type"

export interface CVResponse {
    data: string
}

export interface CVData {
    staff: StaffResponse,
    educations: {
        data: EducationResponse[],
        total: number
    },
    workExperiences: {
        data: WorkExperienceResponse[],
        total: number
    },
    skills: {
        data: SkillResponse[],
        total: number
    },
    projects: {
        data: ProjectStaffResponse[],
        total: number
    },
    projectTechnologies: Array<{
        data: TechnologyResponse[],
        total: number
    }>
}