import React from "react";
import styled from "@emotion/styled";
import PropTypes from "prop-types";
import { primeraMayuscula } from "../helper";

const ContenedorResumen = styled.div`
  padding: 1rem;
  background-color: #00838f;
  color: #fff;
  text-align: center;
  margin-top: 1rem;
`;

const Resumen = ({ datos }) => {
  const { marca, year, plan } = datos;

  if (marca === "" || year === "" || plan === "") {
    return null;
  }
  return (
    <ContenedorResumen>
      <h2>Resumen de Cotización</h2>
      <ul>
        <li>Marca: {primeraMayuscula(marca)}</li>
        <li>Plan: {primeraMayuscula(plan)}</li>
        <li>Año del Auto: {year}</li>
      </ul>
    </ContenedorResumen>
  );
};

Resumen.propTypes = {
  datos: PropTypes.object.isRequired,
};

export default Resumen;
