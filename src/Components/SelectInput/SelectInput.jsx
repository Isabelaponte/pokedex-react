import React from 'react'
import './SelectInput.module.scss'

export default function SelectInput ({ options }) {
  return (
    <select name="select_sortPokemon" id="select_sortPokemon">
        {
            options.map((option, index) => {
              return <option key={index} defaultValue={option} >{option}</option>
            })
        }
    </select>
  )
}
