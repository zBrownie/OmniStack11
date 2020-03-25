import React, { useState } from "react";

import "./styles.css";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";
import Axios from "axios";

export default function Register() {
  const history = useHistory();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [whatsapp, setwhatsapp] = useState("");
  const [city, setcity] = useState("");
  const [uf, setuf] = useState("");

  async function handleRegister(event) {
    event.preventDefault();

    const data = {
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      api.post("/ongs", data).then(response => {
        alert(`Seu ID de acesso: ${response.data.id}`);
        history.push('/')
      });

    } catch (err) {
      alert("Erro ao cadastrar!!!");
      console.log(err);
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG.
          </p>
          <Link to="/" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Não tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Nome da ONG"
            value={name}
            onChange={event => setname(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={event => setemail(event.target.value)}
          />
          <input
            type="text"
            placeholder="Whatsapp"
            value={whatsapp}
            onChange={event => setwhatsapp(event.target.value)}
          />
          <div className="input-group">
            <input
              type="text"
              placeholder="Cidade"
              value={city}
              onChange={event => setcity(event.target.value)}
            />
            <input
              type="text"
              placeholder="UF"
              style={{ width: 80 }}
              value={uf}
              onChange={event => setuf(event.target.value)}
            />
          </div>
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
