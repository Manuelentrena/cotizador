import React, { useState } from "react";
import styled from "@emotion/styled";
import { obtenerDiferenciaYear, calcularMarca, obtenerPlan } from "../helper";
import PropTypes from "prop-types";

const Campo = styled.div`
  display: flex;
  margin-bottom: 1rem;
  align-items: center;
`;

const Label = styled.label`
  flex: 0 0 100px;
`;

const Select = styled.select`
  display: block;
  width: 100%;
  padding: 1rem;
  border: 1px solid #e1e1e1;
  --webkit-appearance: none;
`;

const InputRadio = styled.input`
  margin: 0 1rem;
`;

const Boton = styled.button`
  background-color: #00838f;
  font-size: 16px;
  width: 100%;
  padding: 1rem;
  color: #fff;
  text-transform: uppercase;
  font-weight: bold;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin-top: 2rem;

  &:hover {
    background-color: #26c6da;
  }
`;

const Error = styled.div`
  color: white;
  background-color: red;
  padding: 1rem;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

const Formulario = ({ setResumen, setCargando }) => {
  const [datos, setDatos] = useState({
    marca: "",
    year: "",
    plan: "basico",
  });
  const [error, setError] = useState(false);

  /* Extraer los datos del state */
  const { marca, year, plan } = datos;

  /* leer datos del formulario */
  const obtenerInformacion = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value,
    });
  };

  /* Cuando el usuario presiona en submit */
  const cotizarSeguro = (e) => {
    e.preventDefault();
    if (marca.trim() === "" || year.trim() === "" || plan.trim() === "") {
      setError(true);
      return;
    }

    setError(false);

    let resultado = 2000;

    /* Obtener la diferencia de años */
    const diferencia = obtenerDiferenciaYear(year);
    /* por cada año hay que restar el 3% */
    resultado -= (diferencia * 3 * resultado) / 100;
    /* Americano 15 */
    /* Asiatico 5%*/
    /* Europe 30% */
    resultado = calcularMarca(marca) * resultado;
    /* Basico aumento 20% */
    /* Completo 50% */
    const incrementoPlan = obtenerPlan(plan);
    resultado = parseFloat(incrementoPlan * resultado).toFixed(2);
    /* Mostrar spinner */
    setCargando(true);

    setTimeout(() => {
      setCargando(false);
      setResumen({
        cotizacion: Number(resultado),
        datos,
      });
    }, 1500);
    //total
  };

  /* Renderizamos el componente */
  return (
    <form onSubmit={cotizarSeguro}>
      {error ? <Error>Todos los campos son obligatorios</Error> : null}
      <Campo>
        <Label>Marca</Label>
        <Select name="marca" value={marca} onChange={obtenerInformacion}>
          <option value="">-- Seleccione --</option>
          <option value="americano">Americano</option>
          <option value="europeo">Europeo</option>
          <option value="asiatico">Asiatico</option>
        </Select>
      </Campo>

      <Campo>
        <Label>Año</Label>
        <Select name="year" value={year} onChange={obtenerInformacion}>
          <option value="">-- Seleccione --</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
          <option value="2019">2019</option>
          <option value="2018">2018</option>
          <option value="2017">2017</option>
          <option value="2016">2016</option>
          <option value="2015">2015</option>
          <option value="2014">2014</option>
          <option value="2013">2013</option>
          <option value="2012">2012</option>
        </Select>
      </Campo>

      <Campo>
        <Label name="plan" value={plan}>
          Plan
        </Label>
        <InputRadio
          type="radio"
          name="plan"
          value="basico"
          checked={plan === "basico"}
          onChange={obtenerInformacion}
        />
        Básico
        <InputRadio
          type="radio"
          name="plan"
          value="completo"
          checked={plan === "completo"}
          onChange={obtenerInformacion}
        />
        Completo
      </Campo>

      <Boton type="submit">Cotizar</Boton>
    </form>
  );
};

Formulario.propTypes = {
  setResumen: PropTypes.func.isRequired,
  setCargando: PropTypes.func.isRequired,
};

export default Formulario;
