import { createUser, getAllUsers, getUserById, updateUser, deleteUser } from '../../../src/services/userService';
import User from '../../../src/models/User';

jest.mock('../../../src/models/User');

describe('User Service', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('getAllUsers', () => {
        it('should return all users', async () => {
            const users = [
                { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'admin' },
                { id: 2, name: 'Jane Doe', email: 'jane@example.com', password: 'password123', role: 'user' },
            ];
            (User.findAll as jest.Mock).mockResolvedValue(users);

            const result = await getAllUsers();

            expect(result).toEqual(users);
            expect(User.findAll).toHaveBeenCalled();
        });

        it('should throw an error if fetching fails', async () => {
            (User.findAll as jest.Mock).mockRejectedValue(new Error('Failed to fetch users'));

            await expect(getAllUsers()).rejects.toThrow('Error retrieving users');
        });
    });

    describe('createUser', () => {
        it('should create a new user', async () => {
            const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'admin' };
            const newUser = { id: 1, ...userData };
            (User.create as jest.Mock).mockResolvedValue(newUser);

            const result = await createUser(userData);

            expect(result).toEqual(newUser);
            expect(User.create).toHaveBeenCalledWith(userData);
        });

        it('should throw an error if creation fails', async () => {
            const userData = { name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'admin' };
            (User.create as jest.Mock).mockRejectedValue(new Error('Failed to create user'));

            await expect(createUser(userData)).rejects.toThrow('Error creating user');
        });
    });

    describe('getUserById', () => {
        it('should return a user by id', async () => {
            const user = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'admin' };
            (User.findByPk as jest.Mock).mockResolvedValue(user);

            const result = await getUserById(1);

            expect(result).toEqual(user);
            expect(User.findByPk).toHaveBeenCalledWith(1);
        });

        it('should throw an error if user not found', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(getUserById(999)).rejects.toThrow('User not found');
        });

        it('should throw an error if fetching fails', async () => {
            (User.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to fetch user'));

            await expect(getUserById(1)).rejects.toThrow('Error retrieving user');
        });
    });

    describe('updateUser', () => {
        it('should update a user', async () => {
            const user = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'admin', update: jest.fn().mockResolvedValue({ id: 1, name: 'John Updated', email: 'john@example.com', password: 'password123', role: 'admin' }) };
            (User.findByPk as jest.Mock).mockResolvedValue(user);

            const updatedData = { name: 'John Updated' };

            const result = await updateUser(1, updatedData);

            expect(result).toEqual({ id: 1, name: 'John Updated', email: 'john@example.com', password: 'password123', role: 'admin' });
            expect(user.update).toHaveBeenCalledWith(updatedData);
        });

        it('should throw an error if user not found', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(updateUser(999, { name: 'John Updated' })).rejects.toThrow('User not found');
        });

        it('should throw an error if updating fails', async () => {
            const user = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'admin', update: jest.fn().mockRejectedValue(new Error('Failed to update user')) };
            (User.findByPk as jest.Mock).mockResolvedValue(user);

            await expect(updateUser(1, { name: 'John Updated' })).rejects.toThrow('Error updating user');
        });
    });

    describe('deleteUser', () => {
        it('should delete a user', async () => {
            const user = { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123', role: 'admin', destroy: jest.fn().mockResolvedValue(null) };
            (User.findByPk as jest.Mock).mockResolvedValue(user);

            const result = await deleteUser(1);

            expect(result).toEqual(user);
            expect(user.destroy).toHaveBeenCalled();
        });

        it('should throw an error if user not found', async () => {
            (User.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(deleteUser(999)).rejects.toThrow('User not found');
        });

        it('should throw an error if deleting fails', async () => {
            (User.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to delete user'));

            await expect(deleteUser(1)).rejects.toThrow('Error deleting user');
        });
    });
});