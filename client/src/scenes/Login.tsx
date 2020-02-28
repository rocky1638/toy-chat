import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const StyledLoginContainer = styled.div`
  width: 100vw;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  font-family: "Avenir", "sans-serif";

  h1 {
    margin-bottom: 10px;
  }

  form {
    height: 40px;

    div {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    input {
      box-sizing: border-box;
      height: 100%;
      width: 175px;
      border-radius: 4px;
      border: 1px solid lightgray;
      margin: 0 10px;
      transition: 600ms;
      padding-left: 10px;
      font-size: 14px;
      &:focus {
        border: 1px solid gray;
        outline: none;
        transition: 600ms;
      }
    }

    button {
      height: 100%;
      border: none;
      font-weight: bold;
      background-image: linear-gradient(to bottom right, #8f00bf, #bf0043);
      padding: 0 15px;
      border-radius: 4px;
      font-size: 12px;
      color: white;
      transition: 800ms;
      &:hover {
        cursor: pointer;
        border-radius: 20px;
        transition: 800ms;
      }
    }
  }

  span.error {
    color: red;
    display: block;
    font-size: 12px;
    margin-top: 5px;
  }
`;

const Login = (): JSX.Element => {
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const history = useHistory();

  /* stores name in localStorage, then redirects to chat */
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    if (name.length === 0) {
      setError(true);
    } else {
      history.push(`/chat?name=${name}`);
    }
  };

  return (
    <StyledLoginContainer>
      <h1>Enter your name:</h1>
      <form onSubmit={handleSubmit} action="submit">
        <div>
          <input onChange={e => setName(e.target.value)} type="text" />
          <button type="submit">Chat!</button>
        </div>
      </form>
      {error && <span className="error">Name is required.</span>}
    </StyledLoginContainer>
  );
};

export default Login;
