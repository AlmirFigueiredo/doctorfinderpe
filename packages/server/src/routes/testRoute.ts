import express from 'express';
import sequelize from '../config/database';
import Admin from '../models/admin';

const router = express.Router();

router.get('/test', async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    const admins = await Admin.findAll();
    res.status(200).json({ success: true, data: admins });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    res.status(500).json({ success: false, message: 'Error retrieving admins', error: "went wrong" });
  }
});

export default router;