import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";
import { configDotenv } from "dotenv";
configDotenv();

const userRouter = Router();
const prisma = new PrismaClient();


userRouter.get("/", async (req: Request, res: Response) => {
    console.log("User route hit");
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            chats: {
                select: {
                    id: true,
                    name: true,
                },
            },
        }
    });
    res.status(200).json(users);
});

userRouter.post("/login", async (req: Request, res: Response) => {

    console.log("Login route hit");
    const { email, password } = req.body;
    console.log(email, password);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    console.log(`hashedPassword: ${hashedPassword}`);

    const user = await prisma.user.findUnique({
        where: {
            // hashedPassword: hashedPassword,
            email: email,
        },
        select: {
            id: true,
            email: true,
            hashedPassword: true,
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
        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
            console.log(`Unsuccessful login attempt for email: ${email}`);
            res.status(401).json({ message: "Invalid email or password" });
            return;
        }
        console.log(user);
        res.status(200).json({ message: "Login successful", user });
        return;
    }
});

userRouter.post("/signup", async (req: Request, res: Response) => {
    console.log("Signup route hit");
    console.log(`${req.body}`);
    const { email, password, name } = req.body;
    console.log(email, password, name);

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
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

export default userRouter;