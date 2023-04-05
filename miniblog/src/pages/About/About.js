import React from 'react'
import styles from './About.module.css'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className={styles.about}>
      <h2>Sobre o Mini <span>Blog</span></h2>
      <p>Este projeto foi feito com React no front e Firebase no back...</p>
      <Link to="/posts/create" className="btn">Criar Posts</Link>
    </div>
  )
}

export default About