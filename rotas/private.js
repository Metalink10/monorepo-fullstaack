import express from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();


router.get("/listar-usuarios", async (req, res) => {
  console.log(req.params)
  try {
    const users = await prisma.user.findUnique({select: {id: true, email: true, name: true}}).catch((error) => {
      console.log("Erro ao buscar usuários", error);
    });
    res.status(200).json({ message: "Usuários encontrados", users });
    return;
    

  } catch (error) {
    res.status(500).json({ message: "falha no servidor" });
  }
});
export default router;
