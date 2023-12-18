import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../assets/logo.svg';
import { toast } from 'react-toastify';
import axios from 'axios';
import { registerRoute } from '../utils/ApiRoutes';

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
const Register = () => {
  const navigate = useNavigate();

  const iniitialState = {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  };
  const [formData, setFormData] = useState(iniitialState);
  // console.log(formData);

  const handleValidation = () => {
    const { username, password, confirmPassword, email } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (password !== confirmPassword) {
      toast.error('password must match', toastOptions);
      return false;
    } else if (password.length < 6) {
      toast.error('password must be more than 6 characters', toastOptions);
      return false;
    } else if (username.length < 3) {
      toast.error('Username must be more than 3 characters', toastOptions);
      return false;
    } 
    else if (/\d/.test(username)) {
      toast.error('Username should not contain numbers', toastOptions);
      return false;
    }else if (email === '') {
      toast.error('Email is required', toastOptions);
      return false;
    }
    else if (!emailRegex.test(email)) {
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
    if (handleValidation()) {
      console.log('validation', registerRoute);
      const { username, password, email } = formData;
      const { data } = await axios.post(registerRoute, {
        username,
        email,
        password,
      });
      if (data.status === false) {
        toast.error(data.message, toastOptions);
      }
      if (data.status === true)
        localStorage.setItem('chat-app-user', JSON.stringify(data.rest));
      toast.success('User created successfully', toastOptions);
      navigate('/setAvatar');
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
            type="text"
            placeholder="username"
            name="username"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="text"
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
          <input
            type="password"
            placeholder="Confirm password"
            name="confirmPassword"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Create User</button>
          <span>
            Already have an account?
            <Link to="/login">Login</Link>
          </span>
        </form>
      </FormContainer>
    </>
  );
};
export default Register;
