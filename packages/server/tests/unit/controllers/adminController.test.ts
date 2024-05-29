import request from 'supertest';
import { app, sequelize } from '../../../src/app';
import {
    createAdmin,
    getAllAdmins
} from '../../../src/services/adminService';

jest.mock('../../../src/services/adminService', () => ({
    getAllAdmins: jest.fn(),
    createAdmin: jest.fn(),
    getAdminById: jest.fn(),
    updateAdmin: jest.fn(),
    deleteAdmin: jest.fn(),
}));

beforeAll(async () => {
    sequelize.authenticate = jest.fn().mockResolvedValue(undefined);
    sequelize.sync = jest.fn().mockResolvedValue(undefined);

    await sequelize.authenticate();
    await sequelize.sync();
});

afterAll(async () => {
    await sequelize.close();
    jest.clearAllMocks();
});

describe('Admin Controllers', () => {
    describe('createAdminController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should create a new admin', async () => {
            const newAdmin = { id: 1, user_id: 1, role: 'admin' };
            (createAdmin as jest.Mock).mockResolvedValue(newAdmin);

            const response = await request(app)
                .post('/Admins')
                .send({ user_id: 1, role: 'admin' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newAdmin);
        });

        it('should handle validation errors', async () => {
            const response = await request(app)
                .post('/Admins')
                .send({ role: 'admin' }); // Missing user_id

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'All fields are required' });
        });

        it('should handle errors', async () => {
            (createAdmin as jest.Mock).mockRejectedValue(new Error('Failed to create admin'));

            const response = await request(app)
                .post('/Admins')
                .send({ user_id: 1, role: 'admin' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create admin' });
            expect(consoleSpy).toHaveBeenCalledWith('Error creating admin:', expect.any(Error));
        });
    });
    
    describe('getAllAdminsController', () => {
        let originalConsoleError: any;

        beforeAll(() => {
            originalConsoleError = console.error;
            console.error = jest.fn();
        });

        afterAll(() => {
            console.error = originalConsoleError;
        });

        it('should return all admins', async () => {
            const admins = [
                { id: 1, user_id: 1, role: 'admin' },
                { id: 2, user_id: 2, role: 'superadmin' },
            ];
            (getAllAdmins as jest.Mock).mockResolvedValue(admins);

            const response = await request(app).get('/Admins');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(admins);
        });

        it('should handle errors', async () => {
            (getAllAdmins as jest.Mock).mockRejectedValue(new Error('Failed to fetch admins'));

            const response = await request(app).get('/Admins');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch admins' });
        });
    });

});
