import React from 'react'
import css from './footer.module.scss'

import iconGitHub from '../../../assets/images/medias/github.png'
import iconLinkedin from '../../../assets/images/medias/linkedin.png'
import iconGmail from '../../../assets/images/medias/gmail.png'

export default function Footer () {
  return (
        <footer>
            <div>
                <div><p>Developed by Isabela de Ponte</p></div>

                <div className={css.div_medias}>
                    <p>My medias</p>
                    <div>
                        <img src={iconGitHub} alt="GitHub" />
                        <img src={iconLinkedin} alt="Linkedin" />
                        <img src={iconGmail} alt="Gmail" />
                    </div>
                </div>

                <div className={css.div_usedApps}>
                    <p>App built in</p>
                    <div>
                        <img src={iconGitHub} alt="GitHub" />
                        <img src={iconLinkedin} alt="Linkedin" />
                        <img src={iconGmail} alt="Gmail" />
                        <img src={iconGmail} alt="Gmail" />
                        <img src={iconGmail} alt="Gmail" />
                    </div>
                </div>
            </div>
        </footer>
  )
}
