import React, { useEffect, useState } from 'react'
import Header from '../../Components/header/Header'

import * as FaIcons from 'react-icons/fa6'

import pokebolaImage from '../../assets/images/pokebola.png'
import bulbasaur from '../../assets/images/001.png'
import css from './PokemonDetails.module.scss'
import SelectInput from '../../Components/SelectInput/SelectInput'
import TypeIcons from '../../Components/TypeIcon/TypeIcons'
import StatsBar from '../../Components/StatsBar/StatsBar'

import api from '../../api/apiRest'

export default function PokemonDetails () {
  const [itemPokemon, setItemPokemon] = useState({})
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const dataPokemon = async () => {
      const response = await api.get('pokemon/1')
      setIsLoading(false)

      setItemPokemon(response?.data)
    }

    dataPokemon()
  }, [])

  return (
    <>
    {
        isLoading
          ? (<div className={css.loader}>Carregando...</div>)
          : <>
            <Header/>
            <div className={css.container}>
                <span className={css.pokebolaImage}>
                    <img className={css.pokebolaImage} src={pokebolaImage} alt="Pokebola" />
                </span>
                <header>
                    <div className={css.pokemonName}>
                        <a><FaIcons.FaArrowLeft /></a>
                        <h1>Bulbasaur</h1>
                    </div>

                    <div className={css.pokemonId}>
                        <h2>#0001</h2>
                    </div>
                </header>

                <section className={css.card}>

                    <div className={css.divPokemonImage}>
                        <img src={bulbasaur} alt="Bulbasaur" />
                    </div>

                    <header>
                        <span className={css.star} >
                            <FaIcons.FaRegStar />
                        </span>
                        <h3>{itemPokemon.name}</h3>

                        <SelectInput options={['Option1', 'Option2']} />

                        <div className={css.types}>
                            <TypeIcons type={'grass'} />
                            <TypeIcons type={'poison'} />
                        </div>

                        <p className={css.typesName}>grass / poison</p>

                        <div className={css.weightHeight}>
                            <div>
                                <p>6.39 kg</p>
                                <h4 className={css.label}>Weight</h4>
                            </div>
                            <div>
                                <p>0.63 m</p>
                                <h4 className={css.label}>Height</h4>
                            </div>
                        </div>

                    </header>

                    <div className={css.div_hr}>
                        <hr />
                    </div>

                    <section>
                        <h4 className={css.stats}>Stats</h4>

                        <div className={css.div_statsBar}>

                            {itemPokemon?.stats.map((stat, index) => {
                              return <StatsBar key={index} stat={stat} />
                            })

                            }
                        </div>
                    </section>

                </section>

            </div>

        </>
    }
    </>
  )
}
