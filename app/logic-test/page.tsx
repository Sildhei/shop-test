"use client";

import { useState } from "react";
import Container from "../components/commons/Container/Container";
import styles from "./LogicTest.module.scss";

export default function LogicTest() {
  const [output, setOutput] = useState("");

  const handleOnChange = (input: string) => {

    let specialCharArr: { index: number; char: string }[] = [];
    let charArr: string[] = [];

    Array.from(input).map((char, index) => {
      if (/[a-zA-Z]/.test(char)) {
        charArr.push(char);
      } else {
        specialCharArr.push({ char, index });
      }
    });

    let reverseArray = charArr.reverse();

    specialCharArr.map((char) => reverseArray.splice(char.index, 0, char.char));

    setOutput(reverseArray.join(""));
  };

  return (
    <div className={styles.mainContainer}>
      <Container>
        <h2>Test de lógica</h2>
        <div className={styles.rulesContainer}>
          <p>
            Dada una cadena que contiene un carácter especial junto con letras
            (de la 'a' a la 'z' y de la 'A' a la 'Z'), invierta la cadena de
            manera que los caracteres especiales no se vean afectados.
          </p>
          <p>
            Ejemplos: Entrada: str = "a,b$c" Salida: str = "c,b$a". Tenga en
            cuenta que $ y , no se mueven a ningún lado.
          </p>
          <p>
            Solo se invierte la subsecuencia "abc" Entrada: str = "Ab,c,de!$"
            Salida: str = "ed,c,bA!$"
          </p>
        </div>
        <div className={styles.inputContainer}>
          <label htmlFor="name">Ingrese un string</label>
          <input
            id="name"
            type="text"
            onChange={(e) => handleOnChange(e.target.value)}
          />
        </div>
        <div className={styles.outputContainer}>
          <p>Salida:</p>
          <p>{output}</p>
        </div>
      </Container>
    </div>
  );
}
