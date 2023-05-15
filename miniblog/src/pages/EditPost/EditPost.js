import styles from "./EditPost.module.css"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useAuthValue } from "../../contexts/AuthContext"
import { useFetchDocument } from "../../hooks/useFetchDocument"
import { useUpdatetDocument } from "../../hooks/useUpdateDocument"

const EditPost = () => {
    const { id } = useParams()
    const { document: post } = useFetchDocument("posts", id)

    const [title, setTitle] = useState("")
    const [image, setImage] = useState("")
    const [body, setBody] = useState("")
    const [tags, setTags] = useState([])
    const [formError, setFormError] = useState("")


    useEffect(() => {
        if (post) {
            setTitle(post.title)
            setBody(post.body)
            setImage(post.image)

            const textTags = post.tags.join(", ")

            setTags(textTags)
        }
    }, [post])

    const { user } = useAuthValue();
    const { updateDocument, response } = useUpdatetDocument("posts")
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

        const data = {
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName,
        }

        updateDocument(id, data);

        // redirect to home page
        navigate("/dashboard")
    };

    return (
        <div className={styles.edit_post}>
            {post && (
                <>
                    <h2>Editar Post: {post.title}</h2>
                    <p>Altere aqui seu post</p>
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
                            <p className={styles.preview_title}>Preview da imagem atual:</p>
                            <img className={styles.image_preview}
                                src={post.image}
                                alt={post.title}
                            />
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
                        {!response.loading && <button className="btn">Editar</button>}
                        {response.loading && (
                            <button className="btn" disabled>Aguarde...</button>
                        )}
                        {response.error && <p className="error">{response.error}</p>}
                        {formError && <p className="error">{formError}</p>}
                    </form>
                </>
            )}
        </div>
    )
}

export default EditPost