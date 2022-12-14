import { useState } from 'react'
import './Login.css'
import { Logo } from '../../components/Logo'

import { auth } from '../../services/firebaseConection'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Input } from "../../components/Input";

export default function Login(){

    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    function handleLogin(e){
        e.preventDefault();

        if(email === ''|| password === ''){
            alert("Preencha todos os campos!")
            return;
        }
        signInWithEmailAndPassword(auth,email,password)
        .then(() => {
            toast.success("Bem vindo de volta")
            navigate("/admin",{replace: true})
        })
        .catch(()=>{
            toast.error("Error ao tentar fazer o login")
            console.log("Erro ao fazer seu login");
        })
        
    }

    return(
        <div className="login-container" onSubmit={handleLogin}>
            <Logo/>
            <form className='form'>
                <Input
                    type="text"
                    placeholder='Digite seu email...'
                    value={email}
                    onChange={ (e) => setEmail(e.target.value)}
                />
                <Input
                    type="password"
                    placeholder='*******'
                    autoComplete='on'
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                />
                <button type="submit">Acessar</button>
            </form>
        </div>
    )
}