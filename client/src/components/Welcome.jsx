import styled from 'styled-components';

import Robot from '../assets/robot.gif';
const Welcome = ({ currentUser }) => {
    console.log(currentUser)
  return (
    <Container>
      <img src={Robot} alt="robot" />
      <h1>
        Welcome, <span>{currentUser?.username}!</span>
      </h1>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;

export default Welcome;
