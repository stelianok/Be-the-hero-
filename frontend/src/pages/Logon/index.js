import React, {useState}  from 'react';
import { Link, useHistory } from 'react-router-dom';

import './styles.css';
import {FiLogIn} from 'react-icons/fi';

import api from '../../services/api';

import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon(){

  const [id,setId] = useState();
  const history = useHistory();

  async function HandleLogin(e) {
    e.preventDefault();

    try{
      const response = await api.post('sessions', { id });
      
      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName',response.data.name);

      history.push('/profile');
      
      
      console.log(response.data.name);
    }
    catch(err){
      alert('Falha no login, tente Novamente');
    }

  }
  return(
    <div className="logon-container">
      <section className="form">
        <img src = {logoImg} alt = "Be the hero" />

        <form onSubmit ={HandleLogin}>
          <h1> Faça seu logon </h1>

          <input placeholder = "Sua ID" 
            value ={id}
            onChange={e => setId(e.target.value)}/>

          <button className = "button" type =  "submit">Entrar</button>

          <Link className = "back-link" to="/register">
          <FiLogIn size = {16} color = "#E02041"/>
            Não tenho Cadastro
          </Link>
        </form>
      </section>

      <img src ={heroesImg} alt = "Heroes" />
    </div>
  );
}
