import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const navigate = useNavigate();

  async function handleUserChange(event) {
    event.preventDefault();
    if (!email || !password) {
      alert("Preencha todos os campos");
      return;
    }
    if (password.length < 6) {
      alert("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    const data = [];
    data.push({
      email: email,
      password: password,
    });

    try {
      await api
        .post("/login", {
          email,
          password,
        })
        .then((response) => {
          if (response.status === 200) {
            alert("Login realizado com sucesso"), console.log(response.data);
            navigate(
              "/home",
              { replace: true },
              {
                state: {
                  user: response.data.user,
                  token: response.data.token,
                },
              }
            );
          } else {
            alert("Erro ao realizar login. Tente novamente.");
          }
        });
    } catch (error) {
      console.error("Erro ao enviar dados:", error);

      if (error.status === 401 ) {
        alert(
          "Nome de usuário ou senha incorretos. Cadastre-se ou verifique seu email e senha e tente novamente."
        );
        return;
      }
    }
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <form method="GET" onSubmit={handleUserChange}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>

        <button type="submit" onSubmit={handleUserChange}>
          Entrar
        </button>
        <p>
          Não tem uma conta? <a href="/cadastro">Cadastre-se</a>
        </p>
        <p>
          Esqueceu a senha? <a href="/recuperar-senha">Recuperar senha</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
