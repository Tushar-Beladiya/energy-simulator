import React, { useState } from "react";
import "./FormInput.css";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";

import jsonData from "../../data.json";
// import FormInput from "../FormInput/Output";

function FormInput({ getFormData }) {
  const { handleSubmit, register, errors } = useForm();

  let history = useHistory();

  const onSubmit = (values) => {
    getFormData(values);
    history.push("/output");
  };

  return (
    <div class="section_main">
      <div class="container">
        <div class="row">
          <div class="col-md-12 heading_text">
            <div class="detail">
              <h2>Simulador de Energia</h2>
              <p>
                Compare as tarifas entre Mercado Livre, Mercado Regulado e
                Geração Distribuída. Veja como economizar aderindo a melhor
                modalidade tarifária para sua unidade consumidora!
              </p>
            </div>
            <div class="form_fix">
              <form onSubmit={handleSubmit(onSubmit)}>
                <p class="form_fix_title">
                  Preencha os dados e veja qual a melhor tarifa para você
                </p>
                <div class="section_dropdown">
                  <select
                    className="btn dropdown-toggle distribuidora"
                    id="dropdownMenuLink"
                    name="distribuidora"
                    required
                    ref={register({
                      required: "Distribuidora is missing",
                    })}
                  >
                    <option value="" className="hoverBtn">
                      Distribuidora
                    </option>
                    {jsonData &&
                      jsonData.distribuidora.map((data) => {
                        return <option value={data}>{data}</option>;
                      })}{" "}
                    {errors.distribuidora && errors.distribuidora.message}
                  </select>
                  <div class="dropdown  dropdown_box modalidade">
                    <select
                      className="btn dropdown-toggle distribuidora"
                      id="dropdownMenuLink"
                      name="modalidade"
                      required
                      ref={register({
                        required: "Modalidade is missing",
                      })}
                    >
                      <option value="">Modalidade </option>
                      <option value="Azul">Azul</option>
                      <option value="Convencional">Convencional</option>
                      <option value="Verde">Verde</option>
                      <option value="Branca">Branca</option>
                    </select>
                  </div>
                  <div class="dropdown  dropdown_box classe">
                    <select
                      className="btn dropdown-toggle distribuidora"
                      id="dropdownMenuLink"
                      name="classe"
                      required
                      ref={register({
                        required: "Classe is missing",
                      })}
                    >
                      <option value="">Classe </option>
                      <option value="Não se aplica">Não se aplica</option>
                      <option value="Residencial">Residencial</option>
                      <option value="Rural">Rural</option>
                      <option value="Iluminação pública">
                        Iluminação pública
                      </option>
                    </select>
                  </div>
                  <div class="dropdown dropdown_box tensao">
                    <select
                      className="btn dropdown-toggle distribuidora"
                      id="dropdownMenuLink"
                      name="tensao"
                      required
                      ref={register({
                        required: "Tensão is missing",
                      })}
                    >
                      <option>Tensão</option>
                      {jsonData &&
                        jsonData.Tensão.map((data) => {
                          return <option value={data}>{data}</option>;
                        })}
                    </select>
                  </div>
                  <div class="dropdown  dropdown_box fase">
                    <select
                      className="btn dropdown-toggle distribuidora"
                      id="dropdownMenuLink"
                      name="fase"
                      required
                      ref={register({
                        required: "Fase is missing",
                      })}
                    >
                      <option value="">Fase</option>
                      <option value="MONOFASICO">MONOFASICO</option>
                      <option value="BIFASICO">BIFASICO</option>
                      <option value="TRIFASICO">TRIFASICO</option>
                    </select>
                  </div>
                </div>
                <div class="input_field">
                  <div class="feild_box">
                    <input
                      type="number"
                      name="demanda_fora_ponta_kw"
                      step="any"
                      ref={register({
                        required: "Demanda Fora Ponta is missing",
                      })}
                      defaultValue={0}
                    />
                    <label>Demanda Fora Ponta (kW)</label>
                  </div>
                  <div class="feild_box">
                    <input
                      type="number"
                      defaultValue={0}
                      step="any"
                      name="demanda_ponta_kw"
                      ref={register({
                        required: "Demanda Ponta is missing",
                      })}
                    />
                    <label>Demanda Ponta (kW)</label>
                  </div>
                  <div class="feild_box">
                    <input
                      type="number"
                      name="consumo_medio_fp_mwh"
                      defaultValue={0}
                      step="any"
                      ref={register({
                        required: "Consumo Fora Ponta is missing",
                      })}
                    />
                    <label>Consumo Fora Ponta (kWh)</label>
                  </div>
                  <div class="feild_box">
                    <input
                      type="number"
                      name="consumo_medio_p_mwh"
                      defaultValue={0}
                      step="any"
                      ref={register({
                        required: "Consumo Ponta is missing",
                      })}
                    />
                    <label>Consumo Ponta (kWh)</label>
                  </div>
                </div>
                <div class="second_feild">
                  <div class="feild_box">
                    <input
                      type="number"
                      name="icms"
                      defaultValue={25 / 100}
                      step="any"
                      ref={register({
                        required: "ICMS is missing",
                      })}
                    />
                    <label>Icms (%)</label>
                  </div>
                  <div class="feild_box">
                    <input
                      type="number"
                      name="pis"
                      defaultValue={1 / 100}
                      step="any"
                      ref={register({
                        required: "Pis is missing",
                      })}
                    />
                    <label>PIS (%)</label>
                  </div>
                  <div class="feild_box">
                    <input
                      type="number"
                      name="cofins"
                      id="cofins"
                      step="any"
                      defaultValue={5 / 100}
                      ref={register({
                        required: "cofins is missing",
                      })}
                    />
                    <label>COFINS(%)</label>
                  </div>
                </div>
                <div class="simulation">
                  <button type="submit">Simulação</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <p className="contact">
          <Link className="contact-link">
            {" "}
            Gostou do simulador? Entre em contato para ter no seu site
          </Link>
        </p>
      </div>
    </div>
  );
}

export default FormInput;
