import { FastifyInstance } from "fastify";
import { WorkController } from "../controllers/work.controller";
import { 
    createWorkSchema, 
    getWorkSchema,
    getAllStaffWorkSchema,
    updateWorkSchema, 
    deleteWorkSchema,
    deleteAllWorksSchema
} from "../schemas/work.schema";

const workController = new WorkController();

export default async function workRoutes(fastify: FastifyInstance) {
    // Create work
    fastify.post(
        '/',
        { schema: createWorkSchema },
        workController.createWork.bind(workController)
    );

    // Get work by id 
    fastify.get(
        '/workid/:work_id',
        { schema: getWorkSchema },
        workController.getWorkById.bind(workController)
    );

    // Get all works by staff_id
    fastify.get(
        '/staffid/:staff_id',
        { schema: getAllStaffWorkSchema },
        workController.getAllWorkByStaffId.bind(workController)
    );

    // Update Work 
    fastify.put(
        '/workid/:work_id',
        { schema: updateWorkSchema },
        workController.updateWorkById.bind(workController)
    );

    // Delete Work
    fastify.delete(
        '/workid/:work_id',
        { schema: deleteWorkSchema },
        workController.deleteWorkById.bind(workController)
    );

    // Delete all works by staff_id
    fastify.delete(
        '/staffid/:staff_id',
        { schema: deleteAllWorksSchema },
        workController.deleteWorkByStaffId.bind(workController)
    ); 
}