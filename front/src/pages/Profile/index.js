import React, { useEffect, useState } from "react";
import "./styles.css";

import logoImg from "../../assets/logo.svg";
import { FiPower, FiTrash2 } from "react-icons/fi";
import { Link, useHistory } from "react-router-dom";
import api from "../../services/api";

export default function Profile() {
  const ongName = localStorage.getItem("ongName");
  const ongId = localStorage.getItem("ongId");
  const history = useHistory();
  const [incidents, setincidents] = useState([]);

  useEffect(() => {
    async function handleOngData() {
      api
        .get(`/profile`, {
          headers: {
            Authorization: ongId
          }
        })
        .then(response => {
          setincidents(response.data);
        });
    }
    handleOngData();
  }, [ongId]);

  async function handleDeleteIncident(id) {
    try {
      api
        .delete(`incidents/${id}`, {
          headers: {
            Authorization: ongId
          }
        })
        .then(reponse => {
          setincidents(incidents.filter(incident => incident.id !== id));
        });
    } catch (err) {
      alert("Erro ao deletar");
    }
  }

  async function handleLogout() {
    localStorage.clear();
    history.push("/");
  }
  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Logo" />
        <span>Bem Vinda, {ongName}</span>

        <Link to="/incidents/new" className="button">
          Cadastrar novo caso
        </Link>
        <button onClick={handleLogout}>
          <FiPower size={18} color="#e02041" />
        </button>
      </header>

      <h1>Casos Cadastrados</h1>

      <ul>
        {incidents.map(item => (
          <li key={item.id}>
            <strong>Caso:</strong>
            <p>{item.title}</p>
            <strong>Descrição</strong>
            <p>{item.description}</p>
            <strong>Valor</strong>
            <p>
              {Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
              }).format(item.value)}
            </p>

            <button onClick={() => handleDeleteIncident(item.id)}>
              <FiTrash2 size={20} color="#a8a8b3" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
