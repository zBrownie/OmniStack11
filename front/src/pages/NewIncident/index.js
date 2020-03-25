import React, { useState } from "react";

import "./styles.css";
import logoImg from "../../assets/logo.svg";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";

import api from "../../services/api";

export default function NewIncident() {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [valor, setvalor] = useState("");
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();

  function handleNewIncident(event) {
    event.preventDefault();

    const data = {
      title,
      description: desc,
      value: valor
    };
    try {
      api
        .post("/incidents", data, {
          headers: { Authorization: ongId }
        })
        .then(response => {
          history.push("/profile");
        });
    } catch (err) {
      alert("Erro cadastrar novo caso!");
    }
  }
  return (
    <div className="new-incident">
      <div className="content">
        <section>
          <img src={logoImg} alt="Logo" />
          <h1>Cadastro novo caso</h1>
          <p>
            Descreva o caso detalhadamente para encontrar um herói para resolver
            isso
          </p>
          <Link to="/profile" className="back-link">
            <FiArrowLeft size={16} color="#e02041" />
            Voltar para Home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input
            type="text"
            placeholder="Titulo do caso"
            value={title}
            onChange={event => settitle(event.target.value)}
          />
          <textarea
            placeholder="Descrição"
            value={desc}
            onChange={event => setdesc(event.target.value)}
          ></textarea>
          <input
            type="text"
            placeholder="Valor em reais"
            value={valor}
            onChange={event => setvalor(event.target.value)}
          />
          <button type="submit" className="button">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
