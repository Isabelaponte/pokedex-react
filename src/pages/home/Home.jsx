import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";

import api from "../../api/apiRest";
import css from "./Home.module.scss";

import Header from "../../Components/header/Header";
import Card from "../../Components/card/Card";
import Footer from "../../Components/Footer/Footer";
import LoadingPage from "../../Components/loading/LoadingPage";

export default function Home() {
  const [pokemon, setPokemon] = useState([]);
  const [globalPokemons, setGlobalPokemon] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const filterPokemons =
    search?.length > 0
      ? globalPokemons?.filter((pokemon) => pokemon?.name?.includes(search))
      : pokemon;

  useEffect(() => {
    getData();
    getAllPokemons();
  }, [page, search]);

  const getData = async () => {
    setLoading(true);
    const limit = 16;
    const offset = (page - 1) * limit;
    const response = await api.get(`/pokemon/?offset=${offset}&limit=${limit}`);

    if (page === 1) {
      setPokemon(response.data.results);
    } else {
      setPokemon((prevPokemon) => [...prevPokemon, ...response.data.results]);
    }

    setLoading(false);
  };

  const getAllPokemons = async () => {
    const response = await api.get("/pokemon/?offset=0&limit=1000");

    const promises = response.data.results.map((pokemon) => {
      return pokemon;
    });
    setGlobalPokemon(promises);
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const getSearch = (text) => {
    setSearch(text.toLowerCase());
    setPage(1);
  };

  return (
    <div>
      <Header getSearch={getSearch} />

      <main>
        <header className={css.header_main}>
          <h1>Pokédex</h1>

          <div className={css.div_search_pokemons}>
            <div className={css.div_input_search}>
              <label htmlFor="search">Name</label>

              <form
                className={css.search}
                onSubmit={(e) => {
                  e.preventDefault();
                  getSearch(e.target.search.value);
                }}
              >
                <input
                  placeholder="Search..."
                  type="text"
                  name="search"
                  id="search"
                />
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
              <option value="lowestFirst">Lowest Number (First)</option>
              <option value="highestFirst">Highest Number (First)</option>
              <option value="A-Z">A-Z</option>
              <option value="Z-A">Z-A</option>
            </select>
          </div>
          {loading ? (
            <LoadingPage />
          ) : (
            <div className={css.card_content}>
              {filterPokemons.map((card, index) => {
                return <Card key={index} card={card} />;
              })}
            </div>
          )}

          <div className={css.load_pokemon}>
            <button onClick={handleLoadMore}>Load more Pokémon</button>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
