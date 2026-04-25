import style from "../styles/products.module.css";
import React from "react";

export default function Product({ text, image }) {
  return (
    <div className={style["box"]}>
      <p>{text}</p>
      <img src={image} alt={text} />
    </div>
  );
}
