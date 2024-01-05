import { useState, useEffect } from "react";

import api from "../../../api/apiRest";
import css from "./layoutHome.module.scss";

import Header from "../header/Header";
import Card from "../card/Card";

export default function LayoutHome() {
  const [pokemon, setPokemon] = useState([]);

  useEffect(() => {

    const getData = async () => {
      const response = await api.get(`/pokemon`);
      setPokemon(response.data.results);
    };

    getData();
    
  }, []);

  return (
    <div className={css.layout}>
      <Header />

      <div className={css.card_content}>
        {pokemon.map((card, index) => {
          return <Card key={index} card={card} />;
        })}
      </div>
    </div>
  );
}
