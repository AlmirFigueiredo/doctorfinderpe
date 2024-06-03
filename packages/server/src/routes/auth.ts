import { Router } from 'express';
import User from '../models/User';
import jwt from 'jsonwebtoken'
const router = Router();

router.post('/login', async (req, res) => {
    try {

        const { email, password } = req.body;
        const user = await User.findOne({where: {email}  })

        if (!user) {
            throw new Error('Account do not exists!')
        }

        const passwordMatch = password === user.password

        if(!passwordMatch) {
            throw new Error("Aunthentication failed!");
        }

        const token = jwt.sign({
            id: user.user_id,
            username: user.username,
            name: user.name,
            role: user.role
        }, 'salgadinho123', {expiresIn: '2h'})
        return res.status(201).send({token: token})
    } catch {
        
    }
})


export default router