import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Robot from "../assets/robot.gif";

export default function Welcome() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const getName = async () => {
      const data = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
      );
      setUserName(data.username);
    };
    getName();
  }, []);

  return (
    <Container>
      <img src={Robot} alt="Robot" />
      <h1>
        Welcome, <span className="glow">{userName}!</span>
      </h1>
      <h3 className="sub">Please select a chat to start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  text-align: center;
  gap: 1.5rem;

  img {
    height: 18rem;
    filter: drop-shadow(0 0 4px #00e0ff55);
  }

  h1 {
    font-size: 2.5rem;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0 0 2px #00e0ff44;

    .glow {
      color: #7f00ff;
      text-shadow: 0 0 2px #7f00ff66, 0 0 3px #00e0ff33;
    }
  }

  .sub {
    font-size: 1.2rem;
    color: #cccccc;
    text-shadow: 0 0 1px #00e0ff22;
  }

  @media screen and (max-width: 768px) {
    h1 {
      font-size: 1.8rem;
    }
    .sub {
      font-size: 1rem;
    }
    img {
      height: 12rem;
    }
  }
`;
