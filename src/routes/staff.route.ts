import { FastifyInstance } from 'fastify';
import { StaffController } from '../controllers/staff.controller';
import {
  createStaffSchema,
  getStaffSchema,
  updateStaffSchema,
  deleteStaffSchema,
  getStaffsSchema
} from '../schemas/staff.schema';

const staffController = new StaffController();

export default async function userRoutes(fastify: FastifyInstance) {
  // Create user
  fastify.post(
    '/',
    { schema: createStaffSchema },
    staffController.createStaff.bind(staffController)
  );

  // Get all users
  fastify.get(
    '/',
    { schema: getStaffsSchema },
    staffController.getAllStaff.bind(staffController)
  );

  // Get user by ID
  fastify.get(
    '/:staff_id',
    { schema: getStaffSchema },
    staffController.getStaffById.bind(staffController)
  );

  // Update user
  fastify.put(
    '/:staff_id',
    { schema: updateStaffSchema },
    staffController.updateStaffById.bind(staffController)
  );

  // Delete user
  fastify.delete(
    '/:staff_id',
    { schema: deleteStaffSchema },
    staffController.deleteStaff.bind(staffController)
  );
}