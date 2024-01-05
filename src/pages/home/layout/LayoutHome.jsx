import React, { useState, useEffect } from 'react'
import * as FaIcons from 'react-icons/fa'

import api from '../../../api/apiRest'
import css from './layoutHome.module.scss'

import Header from '../header/Header'
import Card from '../card/Card'

export default function LayoutHome () {
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
    <div className={css.layout}>
      <Header getSearch={getSearch} />

      <section className={css.section_pagination}>
        <div className={css.div_pagination} >
          <span className={css.left_arrow_pagination} onClick={() => {
            if (page === 1) {
              return
            }
            setPage(page - 1)
          }} >
            <FaIcons.FaAngleLeft />
          </span>
          <span className={css.pages} > {page} </span>
          <span className={css.pages} > of </span>
          <span className={css.pages} > {Math.round(globalPokemon?.length / 15)} </span>
          <span className={css.right_arrow_pagination} onClick={() => {
            if (page === 67) {
              return
            }
            setPage(page + 1)
          }} >
            <FaIcons.FaAngleRight />
          </span>
        </div>
      </section>

      <div className={css.card_content}>
        {filterPokemons.map((card, index) => {
          return <Card key={index} card={card} />
        })}
      </div>
    </div>
  )
}
