import React, { useRef } from 'react';
import PropTypes from "prop-types";
import _ from 'lodash';
import logoVisa from "../../../images/logo\ visa\ small.png";
import chip from "../../../images/chip.png";
import world from "../../../images/mundo.png";
import "./Tarjeta.css";

/**
 * 
 * @param {string} inputStr 
 */
const maskAndSplitBy4 = (inputStr) => {
  let splitString = "";

  for (let i = 0; i < inputStr.length; i++) {
    let char = inputStr[i];

    if(char !== "#" && i >= 4 && i <= 11)
      char = "*";

    splitString += i % 4 === 0 ? " " + char : char;
  }

  return splitString;
}

/**
 * 
 * @param {string} numero
 * @param {string} cvv 
 */
const renderBack = (numero, cvv) => {
  console.log(numero.length)
  let last4Digits = numero.substring(15);
  // console.log(last4Digits)

  return (
    <div className = "card-back">
      <div className = "magnetic-band"/>
      <div className = "card-back-content">
        <img src = {world} alt = "world" className = "world"/>
        <div className = "cvv">
          <label>{last4Digits + " " + cvv}</label>
        </div>
        <img src = {logoVisa} alt = "emisorLogoBack" 
          className = "emisorLogo" style = {{alignSelf: "flex-end"}}
        />
      </div>
    </div>
  );
}

/**
 * 
 * @param {string} numero 
 * @param {string} titular 
 * @param {string} mesVenc 
 * @param {string} anioVenc 
 */
const renderFront = (numero, titular, mesVenc, anioVenc) => {
  return (
    <div className = "card-front">
      <div className = "card-front-imgs">
        <img src = {chip} alt = "chip" className = "chip"/>
        <img src = {logoVisa} alt = "emisorLogoFront" className = "emisorLogo"/>
      </div>
      <div className = "card-front-info">
        <label className = "card-number">{numero}</label>

        <div className = "name-expiring">
          <div>
            <label style = {{display: "block", color: "darkgray"}}>Titular</label>
            <label className = "card-holder">{titular}</label>
          </div>
          <div >
            <label style = {{display: "block", color: "darkgray"}}>Vence</label>
            <label className = "expire">{mesVenc}/{anioVenc}</label>
          </div>
        </div>
      </div>
    </div>
  );
}

const orUndefinedString = (str) => defaultV => !str ? defaultV : str;

const Tarjeta = (props) => {
  let { numero, titular, 
    mesVenc, anioVenc, 
    cvv, showBack } = props;

  numero = orUndefinedString(numero)("############");
  titular = orUndefinedString(titular)("apyn");
  mesVenc = orUndefinedString(mesVenc)("MM");
  anioVenc = orUndefinedString(anioVenc)("YY");
  cvv = orUndefinedString(cvv)("000");

  numero = maskAndSplitBy4(_.padEnd(numero, 16, "#"));
  anioVenc = anioVenc.length > 2 ? anioVenc.substring(2,4) : anioVenc;

  let containerStyle = "card-container";
  if(showBack)
    containerStyle += "-active";

  return (
    <div className = {containerStyle}>
      <div className = "card">
        {renderFront(numero, titular, mesVenc, anioVenc)}
        {renderBack(numero, cvv)}
      </div>
    </div>
  )
}

export default Tarjeta;

Tarjeta.propTypes = {
  numero: PropTypes.string,
  titular: PropTypes.string,
  mesVenc: PropTypes.string,
  anioVenc: PropTypes.string,
  cvv: PropTypes.string
};