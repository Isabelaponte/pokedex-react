import React, { useState, useEffect } from 'react'
import axios from 'axios'

import css from './card.module.scss'
import api from '../../api/apiRest'

export default function Card ({ card }) {
  const [itemPokemon, setItemPokemon] = useState({})
  const [speciePokemon, setSpeciePokemon] = useState({})
  const [evolutions, setEvolutions] = useState([])

  useEffect(() => {
    const dataPokemon = async () => {
      const url = await axios.get(`${card.url}`)

      setItemPokemon(url.data)
    }

    dataPokemon()
  }, [card])

  useEffect(() => {
    const dataSpecie = async () => {
      if (itemPokemon?.id) {
        const response = await api.get(`/pokemon-species/${itemPokemon?.id}`)

        setSpeciePokemon(response?.data)
      }
    }

    dataSpecie()
  }, [itemPokemon])

  useEffect(() => {
    const evolutionChainUrl = speciePokemon.evolution_chain?.url

    if (evolutionChainUrl) {
      const dataEvolutionChain = async () => {
        const response = await axios.get(evolutionChainUrl)

        const arrayEvolution = []

        const getEvolutionInfo = async (pokemonName) => {
          const getData = await api.get(`pokemon/${pokemonName}`)

          return {
            id: getData.data?.id,
            name: getData.data?.name,
            img: getData.data.sprites?.other['official-artwork'].front_default
          }
        }

        const processEvolutionChain = async (evolutionChain) => {
          for (const evolution of evolutionChain) {
            const evolutionInfo = await getEvolutionInfo(
              evolution?.species.name
            )
            arrayEvolution.push(evolutionInfo)

            if (evolution.evolves_to.length) {
              await processEvolutionChain(evolution.evolves_to)
            }
          }
        }

        await processEvolutionChain([response.data.chain])
        setEvolutions(arrayEvolution)
      }

      dataEvolutionChain()
    }
  }, [speciePokemon])

  let pokemonId = itemPokemon?.id?.toString()
  pokemonId = pokemonId?.padStart(4, '0')

  return (
    <div className={css.card}>
      <header className={css.div_pokemonImage}>
        <p>{pokemonId}</p>
        <img
          className={css.pokemonImage}
          src={itemPokemon.sprites?.other['official-artwork'].front_default}
          alt={card.name}
        />
      </header>

      <section>
        <div className={css.div_pokemonInfo}>
          <div className={css.div_name}>
            <p>Nº {pokemonId}</p>
            <p className={css.name}>{card.name}</p>
          </div>

          <div className={css.div__type_color}>
            {itemPokemon?.types?.map((type, index) => {
              return (
                <div
                  key={index}
                  className={`color-${type.type.name} ${css.color_type}`}
                >
                  {type.type.name}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
