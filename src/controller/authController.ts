import {Request,Response } from 'express';
import { hashPassword } from '../service/password.service';
import prisma from '../model/user'
import { generateToken } from '../service/auth.service';


export const register = async(req: Request,res: Response): Promise<void>=>{

    const {email,password} = req.body;

    try {
        
        const hashedPassword = await hashPassword(password);
        console.log(hashPassword);
        
        const user = await prisma.create(
            {
                data: {
                    email,
                    password: hashedPassword
                }
            }
        )

        const token = generateToken(user);
        res.status(201).json({token});

    } catch (error) {
        //TODO rehacer los errores
        console.log(error);
        res.status(500).json({error:"Error"});
        
    }


};