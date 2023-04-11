import React from 'react'
import styles from './Login.module.css'
import { useState, useEffect } from 'react'
import { useAuthentication } from '../../hooks/useAuthentication'

const Login = () => {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")    
    const [error, setError] = useState("")

    const { login, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")
        const user = {            
            email,
            password
        };       
        const res = await login(user)
        console.log(res)
    }

    useEffect(() => {
        if (authError) {
            setError(authError);
        }
    }, [authError]);
    return (
        <div className={styles.login}>
            <h1>Entrar</h1>
            <p>Logue-se para desfrutar do melhor do sistema</p>
            <form onSubmit={handleSubmit}>
                {/* <label>
                    <span>Nome:</span>
                    <input type="text" name='displayName' required placeholder='Nome do usuário' value="" onChange={(e) => setDisplayName(e.target.value)} />
                </label> */}
                <label>
                    <span>E-mail:</span>
                    <input type="email" name='email' required placeholder='Digite o email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    <span>Senha:</span>
                    <input type="password" name='password' required placeholder='Digite a sua senha' value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                {!loading && <button className='btn'>Cadastrar</button>}
                {loading && <button className='btn'>Aguarde...</button>}
                {error && <p className='error'>{error}</p>}
            </form>
        </div>
    )
}

export default Login