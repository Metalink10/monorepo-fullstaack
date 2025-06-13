import express from "express";
import router from "./rotas/public.js";
import privateRoutes from "./rotas/private.js";
import auth from "./middlewares/auth.js";
import cors from "cors";

const app = express();
app.use(express.json());

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

app.listen(3000, () => {
  console.log("servidor rodando");
});
