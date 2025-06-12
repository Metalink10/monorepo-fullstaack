import express from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET;

// Rota para Cadastrar
router.post("/cadastro", async (req, res) => {
  try {
    const users = req.body;
    console.log("Usuário recebido", users);

    const salt = await bcrypt.genSalt(10);
    const hashPasssword = await bcrypt.hash(users.password, salt);

    // Cria um novo usuário
    const newUser = await prisma.user.create({
      data: {
        name: users.name,
        email: users.email,
        password: hashPasssword, // hashPasssword,
      },
    });
    console.log("Usuário cadastrado com sucesso", newUser);
    res.status(200).json({ message: "Usuário cadastrado" });

    return;
  } catch (error) {
    console.error("Erro ao cadastrar usuário", error);
    // Verifica se o erro é de email duplicado
    if (error.code === "P2002") {
      return res.status(400).json({ message: "Email já cadastrado" });
    }
    // Se não for erro de email duplicado, retorna erro genérico
    console.error("Erro ao cadastrar usuário", error);
    res
      .status(error)
      .json({ message: "Usuário não cadastrado", error: error.message });
    return;
  }
});

// Rota para buscar dados / login
router.post("/login", async (req, res) => {
  const user = req.body;
  console.log("Usuário recebido", user);
  try {
    const userFilter = await prisma.user.findUnique({
      where: {
        email: user.email,
        password: user.password,
      },
      select: {
        name: true,
        email: true,
      },
    });

    if(userFilter) {
      // Verifica se o usuário foi encontrado
      console.log("Usuário encontrado", userFilter);
      res.status(200).json({ message: "Usuário encontrado", user: userFilter });
      return;
    }

    // const token = jwt.sign({ id: userFilter }, JWT_SECRET, {
    //   expiresIn: "1minutes", // Tempo de expiração do token
    //   issuer: "seu-issuer", // Identificador do emissor do token
    //   algorithm: "HS256",
    // });
    // console.log("Token gerado com sucesso", token);
    // res.setHeader("Authorization", `Bearer ${token}`);
    // res.json(token);
    // return;
  } catch (error) {
    console.error("Erro ao buscar usuário", error);
    res.status(400).json({ message: "Problemas no servidor ao buscar dados" });
  }
});

export default router;
