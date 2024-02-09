import React from 'react'
import * as FaIcons from 'react-icons/fa'
import css from './header.module.scss'

import logo from '../../assets/images/pokemon.png'

export default function Header () {
  return (
        <nav className={css.header}>
            <div className={css.div_header}>
                <div className={css.logo}>
                    <img src={logo} alt="Pokemon Logo" />
                </div>
                <div className={css.login}>
                    <div className={css.user_icon}>
                        <FaIcons.FaUser />
                    </div>
                    <p>Login</p>
                </div>
            </div>
        </nav>
  )
}
