import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../../contexts/AuthContext"
import styles from "./CreatePost.module.css"
import { useInsertDocument } from "../../hooks/useInsertDocument"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")
  const [qt, setQt] = useState("")

  const { user } = useAuthValue();
  const { insertDocument, response } = useInsertDocument("posts")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    // validate image URL
    try {
      new URL(image)
    } catch (error) {
      return setFormError("A imagem precisa ser uma URL")
    }

    // criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    // checar todos os valores

    if (!title || !image || !body || !tags) {
      setFormError("Por favor, preencha todos os campos.")
    }

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tags: tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    // redirect to home page
    navigate("/")
  };

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Poste e compartilher seu conhecimento conosco</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input type="text"
            name="title"
            required
            placeholder="Escreva o título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title} />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input type="text"
            name="image"
            required
            placeholder="Escolha uma boa imagem..."
            onChange={(e) => setImage(e.target.value)}
            value={image} />
        </label>
        <label>
          <span>conteudo:</span>
          <textarea name="body"
            required
            placeholder="Escreva seu conteudo do seu post"
            onChange={(e) => setBody(e.target.value)}
            value={body}></textarea>
        </label>
        <label>
          <span>Tags:</span>
          <input type="text"
            name="tags"
            required
            placeholder="Escolha as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags} />
        </label>        
        {!response.loading && <button className="btn">Criar</button>}
        {response.loading && (
          <button className="btn" disabled>Aguarde...</button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  )
}

export default CreatePost