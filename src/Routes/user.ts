import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router();
const prisma = new PrismaClient();

router.post("/login", async (req: Request, res: Response) => {

    console.log("Login route hit");
    const { email, password } = req.body;
    console.log(email, password);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = await prisma.user.findUnique({
        where: {
            email: email,
            hashedPassword: hashedPassword,
        },
        select: {
            id: true,
            email: true,
            chats: {
                select: {
                    id: true,
                    name: true,
                },
            },
        }
    });
    if (!user) {
        console.log(`Unsuccessful login attempt for email: ${email}`);
        res.status(401).json({ message: "Invalid email or password" });
        return;
    } else {
        console.log(user);
        res.status(200).json({ message: "Login successful", user });
        return;
    }
});

router.post("/signup", async (req: Request, res: Response) => {
    console.log("Signup route hit");
    const { email, password, name } = req.body;
    console.log(email, password, name);

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    const user = await prisma.user.create({
        data: {
            email: email,
            hashedPassword: hashedPassword,
            name: name,
        },
    });
    if (!user) {
        console.log(`Unsuccessful signup attempt for email: ${email}`);
        res.status(401).json({ message: "Invalid email or password" });
        return;
    } else {
        console.log(user);
        res.status(201).json({ message: "Signup successful", user });
        return; 
    }
});

export default router;