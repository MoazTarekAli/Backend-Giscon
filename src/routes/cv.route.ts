import { FastifyInstance } from "fastify";
import { CVController } from "../controllers/cv.controller";
import { 
    getCVHTMLSchema,
    getCVPDFSchema
} from "../schemas/cv.schema";

const cvController = new CVController();

export default async function cvRoutes(fastify: FastifyInstance) {
    // Get CV HTML
    fastify.get(
        '/html/:staff_id',
        { schema: getCVHTMLSchema },
        cvController.getCVHTMLById.bind(cvController)
    )

    // Get CV PDF
    fastify.get(
        '/pdf/:staff_id',
        { schema: getCVPDFSchema },
        cvController.getCVPDFById.bind(cvController)
    )
}