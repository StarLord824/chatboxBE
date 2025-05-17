"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.configDotenv)();
const userRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
userRouter.get("/", async (req, res) => {
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
userRouter.post("/login", async (req, res) => {
    console.log("Login route hit");
    const { email, password } = req.body;
    console.log(email, password);
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
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
    }
    else {
        const isPasswordValid = await bcrypt_1.default.compare(password, user.hashedPassword);
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
userRouter.post("/signup", async (req, res) => {
    console.log("Signup route hit");
    console.log(`${req.body}`);
    const { email, password, name } = req.body;
    console.log(email, password, name);
    const salt = await bcrypt_1.default.genSalt(10);
    const hashedPassword = await bcrypt_1.default.hash(password, salt);
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
    }
    else {
        console.log(user);
        res.status(201).json({ message: "Signup successful", user });
        return;
    }
});
exports.default = userRouter;
