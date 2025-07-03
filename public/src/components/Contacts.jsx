import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.png";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  useEffect(async () => {
    const data = await JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    setCurrentUserName(data.username);
    setCurrentUserImage(data.avatarImage);
  }, []);
  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {currentUserImage && currentUserImage && (
        <Container>
          <div className="brand">
            <img src={Logo} alt="logo" />
            <h3>Synq</h3>
          </div>
          <div className="contacts">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`contact ${
                    index === currentSelected ? "selected" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="avatar">
                    <img
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="username">
                    <h3>{contact.username}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="current-user">
            <div className="avatar">
              <img
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="username">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </Container>
      )}
    </>
  );
}
const Container = styled.div`
  display: grid;
  grid-template-rows: 10% 75% 15%;
  overflow: hidden;
  background-color: #0a0a23;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    padding: 1rem 0;
    img {
      height: 2.2rem;
      filter: drop-shadow(0 0 5px #00e0ff);
    }
    h3 {
      color: #00e0ff;
      text-transform: uppercase;
      font-weight: 700;
      letter-spacing: 1px;
    }
  }

  .contacts {
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    gap: 0.8rem;
    padding: 0 0.5rem;
    scrollbar-width: thin;
    &::-webkit-scrollbar {
      width: 0.2rem;
    }
    &::-webkit-scrollbar-thumb {
      background-color: #00e0ff44;
      border-radius: 1rem;
    }

    .contact {
      background: rgba(255, 255, 255, 0.05);
      backdrop-filter: blur(4px);
      border: 1px solid transparent;
      transition: all 0.3s ease;
      min-height: 5rem;
      cursor: pointer;
      width: 90%;
      border-radius: 0.8rem;
      padding: 0.6rem;
      display: flex;
      gap: 1rem;
      align-items: center;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: #e0e0e0;
          font-weight: 500;
        }
      }

      &:hover {
        border: 1px solid #00e0ff;
        background-color: #1a1a40;
        box-shadow: 0 0 5px #00e0ff66;
      }
    }

    .selected {
      background-color: #00e0ff33;
      border: 1px solid #00e0ff;
      box-shadow: 0 0 8px #00e0ff88;
    }
  }

  .current-user {
    background-color: #111133;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1.5rem;
    padding: 1rem;
    border-top: 1px solid #202045;

    .avatar {
      img {
        height: 3.5rem;
        filter: drop-shadow(0 0 4px #00e0ff99);
      }
    }
    .username {
      h2 {
        color: #ffffffcc;
        font-size: 1.2rem;
        font-weight: 600;
      }
    }

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      gap: 0.8rem;
      .username {
        h2 {
          font-size: 1rem;
        }
      }
    }
  }
`;
