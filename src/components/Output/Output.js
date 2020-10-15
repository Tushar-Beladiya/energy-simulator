import React, { useEffect, useState } from "react";
import axios from "axios";
import Loader from "react-loader-spinner";
import { Button, Form, Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";

import "./output.scss";
import { Link } from "react-router-dom";

function Output({ formData }) {
  const [output, setOutput] = useState([]);
  const [isLoader, setIsLoader] = useState(true);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [show, setShow] = useState(false);

  let history = useHistory();

  const onCloseBtnHandler = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleClose = () => {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (userName && userEmail && userEmail.match(mailformat)) {
      setShow(false);
    }
    history.push("/");
  };
  const outputTitle = [
    "Tarifa Azul",
    "Tarifa Verde",
    "ACL Convencional",
    "ACL I0",
    "ACL CG5",
    "ACL I5",
    "ACL I1",
    "Tarifa Branca",
    "Tarifa Convencional",
    "GD Autoconsumo",
    "GD Compartilhada",
  ];

  useEffect(() => {
    // "Energy-Simulator-Auth": "93906abd-5573-4f82-935e-d37490362306",

    axios
      .post(
        "https://cors-anywhere.herokuapp.com/http://ec2-54-207-233-11.sa-east-1.compute.amazonaws.com:8081/api/energy/calculation",
        formData,
        {
          headers: {
            "Energy-Simulator-Auth": "93906abd-5573-4f82-935e-d37490362306",
          },
        }
      )
      .then((res) => {
        console.log(res, res.data.energyCalculations[0].brl_mwh);
        setOutput(res.data.energyCalculations);
        setIsLoader(false);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div className="mainWraper">
        <div class="container">
          <div className="innerContainer">
            <div className="mainTitleWraper">
              <p className="mainTitle">Simulador de Energia</p>
            </div>
            <div className="loaderWraper">
              {isLoader && (
                <Loader type="Bars" color="#00BFFF" height={80} width={80} />
              )}
            </div>
            <div class="row">
              {output.length > 0 &&
                output.map((data, i) => {
                  return (
                    <div class="col-xs-12 col-sm-6 col-lg-3">
                      <p class="card1" href="#">
                        <h3 className="outputTitleWraper">{outputTitle[i]}</h3>
                        <span className="spanWraper">Você vai pagar:</span>
                        <p class="big">
                          {Number(data.brl_mwh)
                            .toFixed(3)
                            .toString()
                            .replace(".", ",")}
                        </p>
                        <p className="small">R$/MWh</p>
                        <div class="go-corner" href="#">
                          <div class="go-arrow">→</div>
                        </div>
                      </p>
                    </div>
                  );
                })}
            </div>
            <div className="infoWraper">
              <div className="infoTitle">
                <p className="title">Informações:</p>
                <p className="info">
                  Os valores e os consumos apurados são apenas uma estimativa
                  realizada com base nas informações cadastradas no simulador,
                  não serão utilizadas para o faturamento de sua unidade
                  consumidora.
                </p>
                <p className="info">
                  Tarifa utilizada considerando a aplicação dos tributos: ICMS,
                  PIS/PASEP e COFINS.
                </p>
                <p className="info">
                  Nesta simulação não estão sendo considerados os valores das
                  bandeiras tarifárias.
                </p>
                <p className="title">Mercado Livre</p>
                <p className="info">
                  Esta é uma estimativa dos valores que considera os preços
                  médios de energia no mercado livre.
                </p>
                <p className="info">
                  Estão aptos ao ML aqueles que possuem uma demanda superior a
                  500 kW ou mais de um estabelecimento onde a soma da demanda
                  contratada alcançar 500 kW
                </p>
                <p className="info">
                  Clientes com demanda inferior a 2.000 kW necessitam contratar
                  energia incentivada.
                </p>
                <p className="title">Geração Distribuída</p>
                <p className="info">
                  Valores podem variar de acordo com potência instalada da usina
                  escolhida
                </p>
              </div>
            </div>
            <div className="proposalBtnWraper">
              <div className="proposalBtn">
                <Button onClick={handleShow}>Solicitar uma proposta</Button>
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
        <Modal show={show} onHide={onCloseBtnHandler} centered>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                value={userName}
                placeholder="Enter Name"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                value={userEmail}
                placeholder="Enter email"
                onChange={(e) => setUserEmail(e.target.value)}
                required
              />
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onCloseBtnHandler}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default Output;
