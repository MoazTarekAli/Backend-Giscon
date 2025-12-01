import { prisma } from "../config/database";
import { StaffService } from "./staff.service";
import { EducationService } from "./education.service";
import { WorkService } from "./work.service";
import { StaffSkillService } from "./staff-skill.service";
import { ProjectStaffService } from "./project-staff.service";
import { ProjectTechnologyService } from "./project-technology.service";
import { CVData, CVResponse } from "../types/cv.type";
import { CVTemplateLoader } from "../utils/cv-template-loader.util";
import puppeteer from 'puppeteer';

const staffService = new StaffService();
const educationService = new EducationService();
const workService = new WorkService();
const staffSkillService = new StaffSkillService();
const projectStaffService = new ProjectStaffService();
const projectTechnologyService = new ProjectTechnologyService();

export class CVService {
    async getCVHTML(staff_id: number): Promise<CVResponse> {
        const [staff, educations, workExperiences, skills, projects] = await Promise.all([
            staffService.getStaffById(staff_id),
            educationService.getAllEducationsByStaffId(staff_id),
            workService.getAllWorkByStaffId(staff_id),
            staffSkillService.getStaffSkills(staff_id),
            projectStaffService.getProjectStaff(staff_id)
        ]);

        const projectTechnologies = await Promise.all(
            projects.data.map(project => 
                projectTechnologyService.getProjectTechnologies(project.project_id)
            )
        );

        const staffData: CVData = {
            staff,
            educations,
            workExperiences,
            skills,
            projects,
            projectTechnologies
        };

        return this.generateCVHTML(staffData);
    }

    async getCVPDF(staff_id: number): Promise<Buffer> {
        const cvHTML = await this.getCVHTML(staff_id);
        const cvPDF = await this.htmlToPdf(cvHTML.data);
        return cvPDF;
    }

    private async htmlToPdf(html: string): Promise<Buffer> {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: 'networkidle0' });
        
        const pdf = await page.pdf({
            format: 'A4',
            printBackground: true
        });

        await browser.close();
        
        return Buffer.from(pdf);
    }

    private generateCVHTML(staffData: CVData): CVResponse {
        const cssStyles = CVTemplateLoader.loadCSS();
        return {
            data: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>${this.escapeHtml(staffData.staff.staff_name)} - CV</title>
                    <style>
                        ${cssStyles}
                    </style>
                </head>
                <body>
                    <div class="container">
                        <!-- Header -->
                        <div class="header">
                            <h1>${this.escapeHtml(staffData.staff.title ?? '')} ${this.escapeHtml(staffData.staff.staff_name)}</h1>
                            <div class="contact-info">
                                <span>📧 ${this.escapeHtml(staffData.staff.email)}</span>
                                <span>📱 ${this.escapeHtml(staffData.staff.phone)}</span>
                            </div>
                        </div>
                        
                        <div class="content">
                            <!-- Summary -->
                            ${staffData.staff.summary ? `
                            <section class="section">
                                <h2 class="section-title">Professional Summary</h2>
                                <p class="summary">${this.escapeHtml(staffData.staff.summary)}</p>
                            </section>
                            ` : ''}
                            
                            <!-- Experience -->
                            ${staffData.workExperiences.total > 0 ? `
                            <section class="section">
                                <h2 class="section-title">Professional Experience</h2>
                                ${staffData.workExperiences.data.map(exp => `
                                    <div class="item">
                                        <div class="item-header">
                                            <div>
                                                <div class="item-title">${this.escapeHtml(exp.work_title)}</div>
                                                <div class="item-subtitle">${this.escapeHtml(exp.company)}</div>
                                            </div>
                                            <div class="item-date">
                                                ${this.formatDate(exp.start_date.toISOString())} - ${exp.end_date ? this.formatDate(exp.end_date.toISOString()) : 'Present'}
                                            </div>
                                        </div>
                                        <div class="item-description">
                                            <strong>Responsibilities:</strong>
                                            <ul class="achievements">
                                                <li>${this.escapeHtml(exp.responsibilities)}</li>
                                            </ul>
                                        </div>
                                    </div>
                                `).join('')}
                            </section>
                            ` : ''}

                            <!-- Education -->
                            ${staffData.educations.total > 0 ? `
                            <section class="section">
                                <h2 class="section-title">Education</h2>
                                ${staffData.educations.data.map(edu => `
                                    <div class="item">
                                        <div class="item-header">
                                            <div>
                                                <div class="item-title">${this.escapeHtml(edu.degree)} in ${this.escapeHtml(edu.field_of_study ?? '')}</div>
                                                <div class="item-subtitle">${this.escapeHtml(edu.institution)}</div>
                                            </div>
                                            <div class="item-date">
                                                ${this.formatDate(edu.start_date.toISOString())} - ${edu.end_date ? this.formatDate(edu.end_date.toISOString()) : 'Present'}
                                            </div>
                                        </div>
                                    </div>
                                `).join('')}
                            </section>
                            ` : ''}

                            <!-- Skills -->
                            ${staffData.skills.total > 0 ? `
                            <section class="section">
                                <h2 class="section-title">Skills</h2>
                                <div class="skills-grid">
                                    ${staffData.skills.data.map(skill => `
                                        <div class="skill-category">
                                            <div class="skill-items">
                                                <span class="skill-tag">${this.escapeHtml(skill.skill_name)}</span>
                                            </div>
                                        </div>
                                    `).join('')}
                                </div>
                            </section>
                            ` : ''}

                            <!-- Projects -->
                            ${staffData.projects.total > 0 ? `
                            <section class="section">
                                <h2 class="section-title">Projects</h2>
                                <div class="projects-grid">
                                    ${staffData.projects.data.map((project, id) => `
                                        <div class="project-card">
                                            <h3>${this.escapeHtml(project.project_name)}</h3>
                                            <p>${this.escapeHtml(project.project_description)}</p>
                                            <p>${this.escapeHtml(project.staff_role)}</p>
                                            ${staffData.projectTechnologies[id].total > 0 ? `
                                                <div class="tech-tags">
                                                    ${staffData.projectTechnologies[id].data.map(tech => `
                                                        <span class="tech-tag">${this.escapeHtml(tech.technology_name)}</span>
                                                    `).join('')}
                                                </div>
                                            ` : ''}
                                        </div>
                                    `).join('')}
                                </div>
                            </section>
                            ` : ''}
                        </div>
                    </div>
                </body>
                </html>
            `.trim()
        };
    }

    private escapeHtml(text: string): string {
        const map: { [key: string]: string } = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, (m) => map[m]);
    }

    //Utility: Format date
    private formatDate(dateString: string): string {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Invalid Date';
        }
        return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
}