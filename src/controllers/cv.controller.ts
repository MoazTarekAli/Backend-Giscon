import { FastifyRequest, FastifyReply } from 'fastify';
import { CVService } from '../services/cv.service';
import { StaffService } from '../services/staff.service';
const cvService = new CVService();
const staffService = new StaffService();

export class CVController {
    async getCVHTMLById(
        request: FastifyRequest <{ Params: { staff_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const staff_id = parseInt(request.params.staff_id);
            const cv = await cvService.getCVHTML(staff_id);
            return reply.code(200).send(cv);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to fetch cv html' });
        }
    }
    
    async getCVPDFById(
        request: FastifyRequest <{ Params: { staff_id: string } }>,
        reply: FastifyReply
    ) {
        try {
            const staff_id = parseInt(request.params.staff_id);
            const [cv, staff_data] = await Promise.all([
                cvService.getCVPDF(staff_id),
                staffService.getStaffById(staff_id)
            ]);

            return reply
                .header('Content-Type', 'application/pdf')
                .header('Content-Disposition', `attachment; filename="cv-${staff_data.staff_name}.pdf"`)
                .code(200)
                .send(cv);
        } catch (error: any) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to fetch cv PDF' });
        }
    }
}