import request from 'supertest';
import { app, sequelize } from '../../../src/app';
import {
    createUser,
    getAllUsers
} from '../../../src/services/userService';

jest.mock('../../../src/services/userService', () => ({
    createUser: jest.fn(),
    getAllUsers: jest.fn(),
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

describe('User Controllers', () => {
    describe('getAllUsersController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should return all users', async () => {
            const users = [
                { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
                { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
            ];
            (getAllUsers as jest.Mock).mockResolvedValue(users);

            const response = await request(app).get('/users');

            expect(response.status).toBe(200);
            expect(response.body).toEqual(users);
        });

        it('should handle errors', async () => {
            (getAllUsers as jest.Mock).mockRejectedValue(new Error('Failed to fetch users'));

            const response = await request(app).get('/users');

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to fetch users' });
        });
    });

    describe('createUserController', () => {
        let consoleSpy: jest.SpyInstance;

        beforeEach(() => {
            consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
        });

        afterEach(() => {
            consoleSpy.mockRestore();
        });

        it('should create a new user', async () => {
            const newUser = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password', role: 'admin' };
            (createUser as jest.Mock).mockResolvedValue(newUser);

            const response = await request(app)
                .post('/users')
                .send({ name: 'John Doe', email: 'john@example.com', password: 'password', role: 'admin' });

            expect(response.status).toBe(201);
            expect(response.body).toEqual(newUser);
        });

        it('should handle validation errors', async () => {
            const response = await request(app)
                .post('/users')
                .send({ name: 'John Doe' });

            expect(response.status).toBe(400);
            expect(response.body).toEqual({ error: 'All fields are required' });
        });

        it('should handle errors', async () => {
            (createUser as jest.Mock).mockRejectedValue(new Error('Failed to create user'));

            const response = await request(app)
                .post('/users')
                .send({ name: 'John Doe', email: 'john@example.com', password: 'password', role: 'admin' });

            expect(response.status).toBe(500);
            expect(response.body).toEqual({ error: 'Failed to create user' });
        });
    });
});
