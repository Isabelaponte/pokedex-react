import axios from "axios";
import { URL_POKEMON, URL_SPECIES } from "../../../api/apiRest";

import { useState, useEffect } from "react";

import css from "./card.module.scss";

export default function Card({ card }) {
  const [itemPokemon, setItemPokemon] = useState({});
  const [speciePokemon, setSpeciePokemon] = useState({});


  useEffect(() => {
    const dataPokemon = async () => {
      const api = await axios.get(`${URL_POKEMON}/${card.name}`);

      setItemPokemon(api.data);
    };

    dataPokemon();
  }, [card]);


  useEffect(() => {
    const dataSpecie = async () => {
      const id_URL = card.url.split("/");

      const api = await axios.get(`${URL_SPECIES}/${id_URL[6]}`);

      setSpeciePokemon({
        url_specie: api?.data?.evolution_chain,
        data: api.data
      });
    };

    dataSpecie();
  }, [card]);


  let pokemonId = itemPokemon?.id?.toString();
  pokemonId = pokemonId?.padStart(4, '0');


  return (
    <div className={css.card}>
      <img
        src={itemPokemon.sprites?.other["official-artwork"].front_default}
        alt={card.name}
        className={css.img_pokemon}
      />

      <div className={`bg-${speciePokemon?.data?.color?.name} ${css.sub_card}`}>

        <strong className={css.id_card}>{pokemonId}</strong>
        <strong className={css.name_card}>{itemPokemon.name}</strong>
        <h4 className={css.height}>Height: {itemPokemon.height}0 cm</h4>
        <h4 className={css.weight}>Weight: {itemPokemon.weight} kg</h4>
        <h4 className={css.habitat}>Habitat: {speciePokemon?.data?.habitat?.name}</h4>

        <div className={css.div_stats}>
          {itemPokemon?.stats?.map((sta, index) => {
            return (
              <h6 key={index} className={css.item_stats}>
                <span className={css.name}> {sta.stat.name} </span>
                <progress value={sta.base_stat} max={110}></progress>
                <span className={css.number}> {sta.base_stat} </span>
              </h6>
            );
          })}
        </div>

        <div className={css.div__type_color}>
          {itemPokemon?.types?.map((type, index) => {
            return (
              <h6
                key={index}
                className={`color-${type.type.name} ${css.color_type}`}
              >
                {type.type.name}
              </h6>
            );
          })}
        </div>
      </div>
    </div>
  );
}
