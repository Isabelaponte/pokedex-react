import React from 'react'
import css from './StatsBar.module.scss'

export default function StatsBar ({ stat }) {
  return (
    <div className={css.div_stat}>
      <span className={css.name}> {stat.stat.name} </span>
      <div className={css.progressBar}>

        <div style={{ width: `${stat.base_stat}%` }} className={css.totalProgress}>

        </div>
      </div>

      <span className={css.number}> {stat.base_stat} </span>
    </div>
  )
}
