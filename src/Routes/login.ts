import { Express } from "express";
import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import bcrypt from "bcrypt";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
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
});