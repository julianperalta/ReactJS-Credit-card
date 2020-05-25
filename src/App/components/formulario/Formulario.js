import React, { Component } from 'react';
import PropTypes from "prop-types";
import {Grid, Row, Col} from 'react-flexbox-grid';
import _ from 'lodash';
import {Tarjeta} from '../tarjeta';
import './Formulario.css';

export default class Formulario extends Component {

  constructor(props) {
    super(props);

    this.state = {
      nroTarjeta: "",
      apyn: "",
      mesVenc: "",
      anioVenc: "",
      cvv: "",

      showBack: false
    };

    this.meses = ["Mes"];
    this.anios = ["Año"];

    for(let i = 1; i < 13; i++) this.meses.push(_.padStart(i.toString(), 2, "0"));
    for(let j = 2000; j <= 2030; j++) this.anios.push(j.toString());
  }

  /**
   * @param {string} inputStr 
   * @returns {boolean} Verdadero si inputStr es un número entero
   */
  isIntNumber = (inputStr) => {
    const rexp = new RegExp("^\d+$");
    return rexp.test(inputStr);
  }

  /**
   * @param {string} inputStr
   */
  isValidName = (inputStr) => {
    // eslint-disable-next-line
    const rexp = new RegExp("^[^\d\n$!\"#$%&/()='¿?¡¬|°~,;:._@+<>\-^\\{}[\]*]+$", "g");
    return rexp.test(inputStr);
  }

  /**
   * @param {React.ChangeEvent} evt 
   */
  handle_onChange = (evt) => {
    this.setState({
      [evt.currentTarget.name]: evt.currentTarget.value
    });
  }
  
  /**
   * @param {string} nroTarjeta 
   * @param {string} apyn 
   * @param {string} cvv 
   */
  validateInput = (nroTarjeta, apyn, cvv) => {
    return {
      nroTarjeta: { isError: this.isIntNumber(nroTarjeta) && nroTarjeta.length === 16, msg: "Número de tarjeta inválido" },
      apyn: { isError: this.isValidName(apyn) && apyn.length <= 20, msg: "Nombre y apellido inválidos" },
      cvv: { isError: this.isIntNumber(cvv) && cvv.length === 3, msg: "Código de seguridad inválido" },
    };
  }

  /**
   * @param {boolean} showBack
   */
  changeSide = (showBack) => {
    this.setState({showBack});
  }

  render() {
    const { nroTarjeta, apyn, 
      mesVenc, anioVenc, cvv, showBack } = this.state;
    const errors = this.validateInput(nroTarjeta, apyn, cvv); // Despues implementar

    return (
      <div className = "Formulario-container">
        <Tarjeta
          numero = {nroTarjeta} titular = {apyn}
          mesVenc = {mesVenc} anioVenc = {anioVenc}
          cvv = {cvv}
          showBack = {showBack}
        />
        <div className = "Formulario-content">

          <Grid>
            <Row>
              <Col xs = {12}>
                <label>Número de tarjeta</label>
                <input 
                  type = "text" name = "nroTarjeta" 
                  onChange = {(evt) => {
                    if(evt.currentTarget.value.length <= 16)
                      this.handle_onChange(evt);
                  }}
                  onFocus = {() => this.changeSide(false)}
                  value = {nroTarjeta} autoComplete = "cc-csc" 
                  // https://stackoverflow.com/questions/37595141/disable-chrome-autofill-creditcard
                />
              </Col>
            </Row>

            <Row>
              <Col xs = {12}>
                <label>Nombre y apellido del titular</label>
                <input 
                  type = "text" name = "apyn"
                  onChange = {(evt) => {
                    if(evt.currentTarget.value.length <= 30)
                      this.handle_onChange(evt);
                  }}
                  onFocus = {() => this.changeSide(false)}
                  value = {apyn} autoComplete = "off"
                />
              </Col>
            </Row>

            <Row between = "xs">
              <Col xs = {12} sm = {12} md = {12} lg = {8} xl = {8}>
                <label>Fecha de vencimiento</label>
                
                <Row between = "xs">
                  <Col xs = {6} sm = {6} md = {6} lg = {6} xl = {6}>
                    <select 
                      name = "mesVenc" placeholder = "Mes"
                      onChange = {this.handle_onChange}
                      onFocus = {() => this.changeSide(false)}
                      value = {mesVenc}
                    >
                      {this.meses.map((m, idx) => 
                        <option value = {m} key = {`m_${idx}`}>{m}</option>  
                      )}
                    </select>
                  </Col>
                  <Col xs = {6} sm = {6} md = {6} lg = {6} xl = {6}>
                    <select 
                      name = "anioVenc" placeholder = "Año"
                      onChange = {this.handle_onChange}
                      onFocus = {() => this.changeSide(false)}
                      value = {anioVenc}
                    >
                      {this.anios.map((a, idx) =>
                        <option value = {a} key = {`a_${idx}`}>{a}</option>
                      )}
                    </select>
                  </Col>
                </Row>
              </Col>
              <Col xs = {12} sm = {12} md = {12} lg = {4} xl = {4}>
                <label>CVV</label>
                <input 
                  type = "text" name = "cvv" 
                  style = {{marginBottom: 0}}
                  onChange = {this.handle_onChange}
                  onFocus = {() => this.changeSide(true)}
                  value = {cvv} autoComplete = "off"
                />
              </Col>
            </Row>
          </Grid>

        </div>
      </div>
    )
  }

}

Formulario.propTypes = {
  nroTarjeta: PropTypes.string,
  apyn: PropTypes.string,
  mesVenc: PropTypes.string,
  anioVenc: PropTypes.string,
  cvv: PropTypes.string,

  meses: PropTypes.arrayOf(PropTypes.string),
  anios: PropTypes.arrayOf(PropTypes.string),
};
