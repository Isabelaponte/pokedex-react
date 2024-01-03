// import React from 'react';
import axios from 'axios'
import { useState, useEffect } from "react";

import { URL_POKEMON } from '../../../api/apiRest'
import css from './layoutHome.module.scss'

import Header from "../header/Header";
import Card from '../card/Card';


export default function LayoutHome(){

    const [arrayPokemon, setArrayPokemon] = useState([]);

    useEffect(()=> {
       const api = async () => {

        const apiPoke = await axios.get(`${URL_POKEMON}`);

        console.log(apiPoke.data);

        setArrayPokemon(apiPoke.data.results);

    }

    api();
       
    }, [])

    return(
        <div className={css.layout}>
            <Header />

            <div className={css.card_content} >
                {
                    arrayPokemon.map((card, index) => {
                        return <Card key={index} card={card} />
                    })
                }
            </div>
        </div>
    )
}   