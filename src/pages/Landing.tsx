import React, { useState } from 'react'
import { FiLogIn, FiMail, FiLock} from 'react-icons/fi';
import { useHistory } from 'react-router-dom'

// import api from '../services/api';

import Input from '../components/Input';
import Button from '../components/Button';

import { Container, Content } from '../styles/pages/landing'
// import logoImg from '../images/logo.svg'

function Landing() {

  const [id, setId] = useState('');
  const history = useHistory();

  async function handleLogin(e: any) {
    e.preventDefault();

    try{

      // const response = await api.get(`users`);
        
      // localStorage.setItem('userId', id);
      // localStorage.setItem('userName', response.data.name);

        history.push('/app');
      } catch (err) {
        alert('Falha no login, tente novamente');
      }
  }

  return (
    <Container>
      <Content>
      {/* <img src={logoImg} alt="Collectors" /> */}
      <form onSubmit={ handleLogin }>
        <h1>Faça o seu login</h1>
        <Input icon={FiMail} name="email" type="text" placeholder="E-mail" onChange={e => setId(e.target.value)} required />
        <Input
          icon={FiLock}
          name="password"
          type="password"
          placeholder="Senha"
          required
        />
        <Button type="submit">Entrar</Button>
        <a href="forgot">Esqueci minha senha</a>
      </form>

      <a href="signUp">
        <FiLogIn />
        Criar conta
      </a>
      </Content>
    </Container>
  );
}

export default Landing;

