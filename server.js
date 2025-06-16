import express from "express";
import router from "./rotas/public.js";
import privateRoutes from "./rotas/private.js";
import auth from "./middlewares/auth.js";
import cors from "cors";

const app = express();
app.use(express.json());

const apiRouter = express.Router()
apiRouter.get('/users', (req, res) => {
  res.json({ message: 'Lista de usuários da API!' });
});

apiRouter.post('/products', (req, res) => {
  const newProduct = req.body;
  res.status(201).json({ message: 'Produto criado!', product: newProduct });
});

// Anexa o router da API ao aplicativo Express com o prefixo '/api'
app.use('/api', apiRouter)

app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  headers: ["Content-Type", "Authorization", "X-Requested-With"],
  exposedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
 
  credentials: true,
  maxAge: 3600,
}));

app.use(auth);
app.use("/", router);
app.use("/", privateRoutes);

export default app;
