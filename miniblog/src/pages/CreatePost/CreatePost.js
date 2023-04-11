import React, { useState } from 'react'
import styles from './CreatePost.module.css'
import { Navigate } from 'react-router-dom'
import { useAuthValue } from '../../context/AuthContext'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div className={styles.create_post}>
      <h1>CreatePost</h1>
      <p>Compartilhe sua maneira de ver as coisas conosco</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input type="text" name="title" required placeholder="Escreva o titulo..." onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>
        <label>
          <span>URL da imagem</span>
          <input type="text" name="image" required placeholder="Insira a imagem" onChange={(e) => setImage(e.target.value)} value={image} />
        </label>
        <label>
          <span>Conteúdo</span>
          <textarea name="body" required placeholder="Coloque as informações do post" onChange={(e) => setBody(e.target.value)} setBody={body}></textarea>
        </label>
        <label>
          <span>Tags</span>
          <input type="text" name="tags" required placeholder="Insira as tags separadas por vírgula" onChange={(e) => setTags(e.target.value)} value={tags} />
        </label>
        <button className='btn'>Criar</button>
        {/* {!loading && <button className='btn'>Cadastrar</button>}
        {loading && <button className='btn'>Aguarde...</button>}
        {error && <p className='error'>{error}</p>} */}
      </form>
    </div>
  )
}

export default CreatePost