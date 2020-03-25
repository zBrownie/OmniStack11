import React, { useState } from "react";

import "./styles.css";

import logoImg from "../../assets/logo.svg";
import heroesImg from "../../assets/heroes.png";
import { FiLogIn } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

export default function Login() {
  const [id, setid] = useState("");
  const history = useHistory();

  async function handleLogin(event) {
    event.preventDefault();
    try {
      api.post("/sessions", { id }).then(response => {
        console.log(response.data.name);
        localStorage.setItem("ongId", id);
        localStorage.setItem("ongName", response.data.name);
        history.push("/profile");
      });
    } catch (err) {
      alert("Erro Login ID incorreto");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Logo" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu login</h1>
          <input
            type="text"
            placeholder="Sua ID"
            value={id}
            onChange={event => setid(event.target.value)}
          />
          <button className="button" type="submit">
            Entrar
          </button>
          <Link to="/register" className="back-link">
            <FiLogIn size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </form>
      </section>

      <img src={heroesImg} alt="Heroes Logo" />
    </div>
  );
}
