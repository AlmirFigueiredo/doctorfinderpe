import { createAdmin, getAllAdmins, getAdminById, updateAdmin, deleteAdmin } from '../../../src/services/adminService';
import Admin from '../../../src/models/Admin';

jest.mock('../../../src/models/Admin');

describe('Admin Service', () => {
    let consoleSpy: jest.SpyInstance;

    beforeEach(() => {
        consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => { });
    });

    afterEach(() => {
        consoleSpy.mockRestore();
    });

    describe('getAllAdmins', () => {
        it('should return all admins', async () => {
            const admins = [
                { admin_id: 1, user_id: 1, role: 'admin' },
                { admin_id: 2, user_id: 2, role: 'superadmin' },
            ];
            (Admin.findAll as jest.Mock).mockResolvedValue(admins);

            const result = await getAllAdmins();

            expect(result).toEqual(admins);
            expect(Admin.findAll).toHaveBeenCalled();
        });

        it('should throw an error if fetching fails', async () => {
            (Admin.findAll as jest.Mock).mockRejectedValue(new Error('Failed to fetch admins'));

            await expect(getAllAdmins()).rejects.toThrow('Error retrieving admins');
        });
    });

    describe('createAdmin', () => {
        it('should create a new admin', async () => {
            const adminData = { user_id: 1, role: 'admin' };
            const newAdmin = { admin_id: 1, ...adminData };
            (Admin.create as jest.Mock).mockResolvedValue(newAdmin);

            const result = await createAdmin(adminData);

            expect(result).toEqual(newAdmin);
            expect(Admin.create).toHaveBeenCalledWith(adminData);
        });

        it('should throw an error if creation fails', async () => {
            const adminData = { user_id: 1, role: 'admin' };
            (Admin.create as jest.Mock).mockRejectedValue(new Error('Failed to create admin'));

            await expect(createAdmin(adminData)).rejects.toThrow('Error creating admin');
        });
    });

    describe('getAdminById', () => {
        it('should return an admin by id', async () => {
            const admin = { admin_id: 1, user_id: 1, role: 'admin' };
            (Admin.findByPk as jest.Mock).mockResolvedValue(admin);

            const result = await getAdminById(1);

            expect(result).toEqual(admin);
            expect(Admin.findByPk).toHaveBeenCalledWith(1);
        });

        it('should throw an error if admin not found', async () => {
            (Admin.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(getAdminById(999)).rejects.toThrow('Admin not found');
        });

        it('should throw an error if fetching fails', async () => {
            (Admin.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to fetch admin'));

            await expect(getAdminById(1)).rejects.toThrow('Error retrieving admin');
        });
    });

    describe('updateAdmin', () => {
        it('should update an admin', async () => {
            const admin = { admin_id: 1, user_id: 1, role: 'admin', update: jest.fn().mockResolvedValue({ admin_id: 1, user_id: 1, role: 'superadmin' }) };
            (Admin.findByPk as jest.Mock).mockResolvedValue(admin);

            const updatedData = { role: 'superadmin' };

            const result = await updateAdmin(1, updatedData);

            expect(result).toEqual({ admin_id: 1, user_id: 1, role: 'superadmin' });
            expect(admin.update).toHaveBeenCalledWith(updatedData);
        });

        it('should throw an error if admin not found', async () => {
            (Admin.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(updateAdmin(999, { role: 'superadmin' })).rejects.toThrow('Admin not found');
        });

        it('should throw an error if updating fails', async () => {
            (Admin.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to update admin'));

            await expect(updateAdmin(1, { role: 'superadmin' })).rejects.toThrow('Error updating admin');
        });
    });

    describe('deleteAdmin', () => {
        it('should delete an admin', async () => {
            const admin = { admin_id: 1, user_id: 1, role: 'admin', destroy: jest.fn().mockResolvedValue(null) };
            (Admin.findByPk as jest.Mock).mockResolvedValue(admin);

            const result = await deleteAdmin(1);

            expect(result).toEqual(admin);
            expect(admin.destroy).toHaveBeenCalled();
        });

        it('should throw an error if admin not found', async () => {
            (Admin.findByPk as jest.Mock).mockResolvedValue(null);

            await expect(deleteAdmin(999)).rejects.toThrow('Admin not found');
        });

        it('should throw an error if deleting fails', async () => {
            (Admin.findByPk as jest.Mock).mockRejectedValue(new Error('Failed to delete admin'));

            await expect(deleteAdmin(1)).rejects.toThrow('Error deleting admin');
        });
    });
});
