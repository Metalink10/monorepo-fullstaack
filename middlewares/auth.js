import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

const auth = (req, res, next) => {
  const token = req.headers.authorization;

  try {
    
    const decoded = jwt.verify(token.replace("Bearer", "", JWT_SECRET));
    req.userId = decoded.id;
    res.status(200).json(decoded);
    return res.status(401).json({ message: "Token inválido" });
  } catch (error) {}
  next();
  
};

export default auth;
