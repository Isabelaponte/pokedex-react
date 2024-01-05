import axios from "axios";
import { useState, useEffect } from "react";

import css from "./card.module.scss";
import api from "../../../api/apiRest";

export default function Card({ card }) {
  const [itemPokemon, setItemPokemon] = useState({});
  const [speciePokemon, setSpeciePokemon] = useState({});
  const [evolutions, setEvolutions] = useState([]);

  useEffect(() => {
    const dataPokemon = async () => {
      const url = await axios.get(`${card.url}`);

      setItemPokemon(url.data);
    };

    dataPokemon();
  }, [card]);

  useEffect(() => {
    const dataSpecie = async () => {
      if (itemPokemon?.id) {
        const response = await api.get(`/pokemon-species/${itemPokemon?.id}`);

        setSpeciePokemon(response?.data);
      }
    };

    dataSpecie();
  }, [itemPokemon]);

  useEffect(() => {
    const evolutionChain_URL = speciePokemon.evolution_chain?.url;

    if (evolutionChain_URL) {
      const dataEvolutionChain = async () => {
        const response = await axios.get(evolutionChain_URL);

        const arrayEvolution = [];

        const getEvolutionInfo = async (pokemonName) => {
          const getData = await api.get(`pokemon/${pokemonName}`);

          arrayEvolution.push({
            id: getData.data?.id,
            name: getData.data?.name,
            img: getData.data.sprites?.other["official-artwork"].front_default,
          });
        };

        getEvolutionInfo(response.data.chain?.species.name);

        const evolutionChain = response.data.chain?.evolves_to;

        if (!evolutionChain.length) {
          console.log("This Pokemon dont have evolutions");
          return;
        }

        evolutionChain.forEach((evolution) => {
          getEvolutionInfo(evolution?.species.name);

          const secondEvolution = evolution?.evolves_to;

          if (!secondEvolution.length) {
            console.log("the first evolution dont have more evolutions");
            return;
          }

          secondEvolution.forEach((evolution) => {
            getEvolutionInfo(evolution?.species.name);
          });
        });

        setEvolutions(arrayEvolution);
      };

      dataEvolutionChain();
    }
  }, [speciePokemon]);

  let pokemonId = itemPokemon?.id?.toString();
  pokemonId = pokemonId?.padStart(4, "0");

  return (
    <div className={css.card}>
      <img
        src={itemPokemon.sprites?.other["official-artwork"].front_default}
        alt={card.name}
        className={css.img_pokemon}
      />

      <div className={`bg-${speciePokemon.color?.name} ${css.sub_card}`}>
        <strong className={css.id_card}>{pokemonId}</strong>
        <strong className={css.name_card}>{itemPokemon.name}</strong>
        <h4 className={css.height}>Height: {itemPokemon.height}0 cm</h4>
        <h4 className={css.weight}>Weight: {itemPokemon.weight} kg</h4>
        <h4 className={css.habitat}>Habitat: {speciePokemon.habitat?.name}</h4>

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

        <div>{evolutions.name?.ma}</div>
      </div>
    </div>
  );
}
