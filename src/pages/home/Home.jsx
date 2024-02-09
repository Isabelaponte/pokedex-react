import React, { useState, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa'

import api from '../../api/apiRest'
import css from './Home.module.scss'

import Header from '../../Components/header/Header'
import Card from '../../Components/card/Card'
import Footer from '../../Components/Footer/Footer'

export default function Home () {
  const [pokemon, setPokemon] = useState([])
  const [globalPokemon, setGlobalPokemon] = useState([])
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')

  useEffect(() => {
    const getData = async () => {
      const limit = 15
      const updatedPage = (page - 1) * limit

      const response = await api.get(`/pokemon/?offset=${updatedPage}&limit=${limit}`)
      setPokemon(response.data.results)
    }

    getData()

    getGlobalPokemons()
  }, [page])

  const getGlobalPokemons = async () => {
    const response = await api.get('/pokemon/?offset=0&limit=1000')

    const promises = response.data.results.map(pokemon => {
      return pokemon
    })

    const results = await promises
    setGlobalPokemon(results)
  }

  const filterPokemons = search?.length > 0 ? globalPokemon?.filter(pokemon => pokemon?.name?.includes(search)) : pokemon

  const getSearch = (text) => {
    console.log(text)
    setSearch(text.toLowerCase())
    setPage(1)
  }

  return (
    <div>
      <Header getSearch={getSearch} />

      <main>

        <header className={css.header_main}>
          <h1>Pokédex</h1>

          <div className={css.div_search_pokemons}>

            <div className={css.div_input_search}>

              <label htmlFor="search">Name or Number</label>

              <form className={css.search}>
                <input placeholder='Search...' type="text" name="search" id="search" />
                <button type="submit">
                  <FaIcons.FaSearch className={css.icon_search} />
                </button>
              </form>

            </div>

            <div className={css.div_select}>
              <label htmlFor="select_type">Type</label>

                <select name="select_type" id="select_type">
                  <option value="Bug">Bug</option>
                  <option value="Fire">Fire</option>
                  <option value="AA">BuAAg</option>
                </select>

            </div>

          </div>
        </header>

        <section className={css.section_pokemonList}>

          <div className={css.div_selectSort}>
            <label htmlFor="select_sortPokemon">Sort by</label>
                <select name="select_sortPokemon" id="select_sortPokemon">
                  <option value="lowestFirst" selected>Lowest Number (First)</option>
                  <option value="highestFirst">Highest Number (First)</option>
                  <option value="A-Z">A-Z</option>
                  <option value="Z-A">Z-A</option>
                </select>
          </div>

          <div className={css.card_content}>
            {filterPokemons.map((card, index) => {
              return <Card key={index} card={card} />
            })}
          </div>

          <div className={css.load_pokemon}>
            <button>
              Load more Pokémon
            </button>
          </div>

        </section>

      </main>

      <Footer />
    </div>
  )
}
