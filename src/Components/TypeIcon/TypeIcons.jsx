import React from 'react'
import './TypeIcon.modules.scss'

import bugIcon from '../../assets/images/type_icons/bug.svg'
import darkIcon from '../../assets/images/type_icons/dark.svg'
import dragonIcon from '../../assets/images/type_icons/dragon.svg'
import electricIcon from '../../assets/images/type_icons/electric.svg'
import fairyIcon from '../../assets/images/type_icons/fairy.svg'
import fightingIcon from '../../assets/images/type_icons/fighting.svg'
import fireIcon from '../../assets/images/type_icons/fire.svg'
import flyingIcon from '../../assets/images/type_icons/flying.svg'
import ghostIcon from '../../assets/images/type_icons/ghost.svg'
import grassIcon from '../../assets/images/type_icons/grass.svg'
import groundIcon from '../../assets/images/type_icons/ground.svg'
import iceIcon from '../../assets/images/type_icons/ice.svg'
import normalIcon from '../../assets/images/type_icons/normal.svg'
import poisonIcon from '../../assets/images/type_icons/poison.svg'
import psychicIcon from '../../assets/images/type_icons/psychic.svg'
import rockIcon from '../../assets/images/type_icons/rock.svg'
import steelIcon from '../../assets/images/type_icons/steel.svg'
import waterIcon from '../../assets/images/type_icons/water.svg'

export default function TypeIcons ({ type }) {
  const isValidType = (type) => {
    const validTypes = [
      'bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting',
      'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal',
      'poison', 'psychic', 'rock', 'steel', 'water'
    ]
    return validTypes.includes(type)
  }

  const iconPath = {
    bug: bugIcon,
    dark: darkIcon,
    dragon: dragonIcon,
    electric: electricIcon,
    fairy: fairyIcon,
    fighting: fightingIcon,
    fire: fireIcon,
    flying: flyingIcon,
    ghost: ghostIcon,
    grass: grassIcon,
    ground: groundIcon,
    ice: iceIcon,
    normal: normalIcon,
    poison: poisonIcon,
    psychic: psychicIcon,
    rock: rockIcon,
    steel: steelIcon,
    water: waterIcon
  }

  if (!isValidType(type)) {
    console.error(`Tipo de ícone '${type}' não reconhecido.`)
    return null
  }

  return (
    <div className={`icon ${type}`}>
      <img src={iconPath[type]} alt={type} />
    </div>
  )
}
