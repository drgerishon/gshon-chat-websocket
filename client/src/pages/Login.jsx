import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { toast } from 'react-toastify';
import { loginRoute } from '../utils/ApiRoutes';
import axios from 'axios';

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: white;
      text-transform: uppercase;
    }
  }
  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #00000076;
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0%.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;
      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }
    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;
      &:hover {
        background-color: #4e0eff;
      }
    }
    span {
      color: white;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;
const Login = () => {
  const navigate = useNavigate();
  const iniitialState = {
    email: '',
    password: '',
  };
  const [formData, setFormData] = useState(iniitialState);
  console.log(formData);

  const handleValidation = () => {
    const { password, email } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!email || !password) {
      toast.error('All fields are required', toastOptions);
      return false; 
    }
    else if (password.length < 6) {
      toast.error('password must be more than 6 characters', toastOptions);
      return false;
    } else if (email === '') {
      toast.error('Email is required', toastOptions);
      return false;
    } else if (!emailRegex.test(email)) {
      toast.error('Invalid email address', toastOptions);
      return false;
    }
    return true;
  };
  const toastOptions = {
    position: 'bottom-right',
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: 'dark',
  };

  useEffect(() => {
    if(localStorage.getItem("chat-app-user")) {
      navigate("/")
    }
  },[navigate])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (handleValidation()) {
        console.log('validation', loginRoute);
        const { password, email } = formData;
        const { data } = await axios.post(loginRoute, {
          email,
          password,
        });
        if (data.status === true) {
          localStorage.setItem('chat-app-user', JSON.stringify(data.rest));
          toast.success('User looged in successfully', toastOptions);
          navigate('/');
        } else {
          toast.error(data.message, toastOptions);
        }
      }
    } catch (error) {
    if (error.response && error.response.data) {
      toast.error(error.response.data.message, toastOptions);
    } else {
      toast.error('An error occurred. Please try again later.', toastOptions);
    }
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h1>Gshon</h1>
          </div>
          <input
            type="email"
            placeholder="email"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login</button>
          <span>
            Don&apos;t have an account?
            <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
};
export default Login;
