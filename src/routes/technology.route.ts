import { FastifyInstance } from 'fastify';
import { TechnologyController } from '../controllers/technology.controller';
import { 
    createTechnologySchema,
    updateTechnologySchema,
    getTchnologySchema,
    getAllTechnologySchema,
    deleteTechnologySchema
} from '../schemas/technology.schema';

const technologyController = new TechnologyController();

export default async function technologyRoutes(fastify: FastifyInstance) {
    // Create Technology
    fastify.post(
        '/',
        { schema: createTechnologySchema },
        technologyController.createTechnology.bind(technologyController)
    );

    // Get All Technologies
    fastify.get(
        '/',
        { schema: getAllTechnologySchema },
        technologyController.getAllTechnologies.bind(technologyController)
    )

    // Get Technology
    fastify.get(
        '/:technology_id',
        { schema: getTchnologySchema },
        technologyController.getTechnology.bind(technologyController)
    )

    // Update Technology
    fastify.put(
        '/:technology_id',
        { schema: updateTechnologySchema },
        technologyController.updateTechnology.bind(technologyController)
    )

    // Delete Technology
    fastify.delete(
        '/:technology_id',
        { schema: deleteTechnologySchema },
        technologyController.deleteTechnology.bind(technologyController)
    )
}