import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import querystring from "querystring";
import styled from "styled-components";

const StyledChatDiv = styled.div`
  font-family: "Avenir", "sans-serif";
  display: flex;
  justify-content: center;
  height: 100%;

  .container {
    width: 70%;
    height: 100%;
    position: relative;
  }

  h1 {
    text-align: center;
    margin: 10px;
  }
  .messages-wrapper {
    overflow-y: scroll;
    height: 80%;
    padding: 10px 0px;

    & > div {
      &.sent {
        text-align: right;
        span.name {
          margin-right: 5px;
        }
        span.content {
          background-image: linear-gradient(to bottom right, #8f00bf, #bf0043);
          color: white;
        }
      }
      &.received {
        text-align: left;
        span.name {
          margin-left: 5px;
        }
        span.content {
          background-color: #ddd;
          color: #323333;
        }
      }
    }
    span {
      &.name {
        display: block;
      }
      &.content {
        display: inline-block;
        padding: 5px 15px;
        border-radius: 25px;
        margin: 3px 0 15px 0;
      }
    }
  }
  .form-wrapper {
    position: absolute;
    bottom: 40px;
    height: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;

    form {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;

      input {
        box-sizing: border-box;
        height: 100%;
        width: 100%;
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
        width: 100px;
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
  }
`;

interface Message {
  name: string | null;
  content: string | null;
}

/* websocket connection stuff */
const connection = new WebSocket("ws://localhost:8080");
connection.onopen = (e): void => {
  console.log("WebSocket is now open");
};
connection.onclose = (e): void => {
  console.log("WebSocket is closed now.");
};
connection.onerror = (e): void => {
  console.error("WebSocket error observed:", e);
};

/* app stuff */
const Chat = (): JSX.Element => {
  const history = useHistory();
  const name = querystring.parse(history.location.search.slice(1)).name;

  connection.onmessage = (e): void => {
    const data: Message = JSON.parse(e.data);
    setMessages([...messages, { name: data.name, content: data.content }]);
    const container = document.getElementById("messages");
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  };

  const renderMessages = (): Array<JSX.Element> => {
    return messages.map((message, i) => (
      <div className={message.name === name ? "sent" : "received"} key={i}>
        <span className="name">{message.name}</span>
        <span className="content">{message.content}</span>
      </div>
    ));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    connection.send(JSON.stringify({ name, content: inputVal }));
    setInputVal("");
  };

  const [messages, setMessages] = useState<Array<Message>>([]);
  const [inputVal, setInputVal] = useState<string>("");

  return (
    <StyledChatDiv>
      <div className="container">
        <h1>chatroom 1</h1>
        <div id="messages" className="messages-wrapper">
          {renderMessages()}
        </div>
        <div className="form-wrapper">
          <form action="submit" onSubmit={handleSubmit}>
            <input
              value={inputVal}
              type="text"
              onChange={e => setInputVal(e.target.value)}
            />
            <button type="submit">Message</button>
          </form>
        </div>
      </div>
    </StyledChatDiv>
  );
};

export default Chat;
