import { useState } from "react";
import axios from "axios";


const api = axios.create({
  baseURL: "http://localhost:3000",
});

function Cadastro() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  async function handleNameChange(event) {
    event.preventDefault();
    

    await api.post("/cadastro", { email, name, password }).then((response) => {
      if (response.status === 200) {
        alert("Usuário cadastrado com sucesso");
        console.log(response.data);
        // Redirecionar para a página de login ou outra página após o cadastro
        setTimeout(() => {
          window.location.href = "/"; // Redireciona para a página de login
        }, 1000); // Atraso de 1 segundo antes do redirecionamento
      }
    }).catch((error) => {
      if(error.response === 402)
      console.error("Erro ao cadastrar usuário:", error);
      alert("Erro ao cadastrar usuário. Tente novamente.");
    });

  }
  return (
    <>
      <h1>Cadastro</h1>
      <form method="POST">
        <div>
          <label htmlFor="nome">Nome:</label>
          <input
            type="text"
            id="nome"
            name="nome"
            required
            onChange={(event) => setName(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(event) => setEmail(event.target.value)}
          />
        </div>
        <div>
          <label htmlFor="senha">Senha:</label>
          <input
            type="password"
            id="senha"
            name="senha"
            required
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit" onClick={handleNameChange}>
          Cadastrar
        </button>
      </form>

    </>
  );
}

export default Cadastro;
