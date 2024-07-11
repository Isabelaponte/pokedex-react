import React from 'react'
import css from './loadingPage.module.scss'

import loadingImage from '../../assets/images/loading.gif'

export default function LoadingPage(){
    return(
        <div className={css.container_loading}>
            <img src={loadingImage} alt="" />
            <div className={css.loader}>Carregando...</div>
        </div>
    )
}