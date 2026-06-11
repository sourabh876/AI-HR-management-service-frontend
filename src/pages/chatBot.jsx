import {
  useState
} from "react";

import api from "../api/axios";

function chatBot() {

  const [question,
    setQuestion] =
    useState("");

  const [messages,
    setMessages] =
    useState([]);

  const handleAsk =
    async () => {

      if (!question.trim())
        return;

      try {

        const res =
          await api.post(
            "/chatbot/ask",
            {
              question
            }
          );

        setMessages([
          ...messages,

          {
            type: "user",
            text: question
          },

          {
            type: "bot",
            text:
              res.data.answer
          }

        ]);

        setQuestion("");

      } catch (error) {

        console.log(error);

      }

    };

  return (

    <div
      className="card"
    >

      <div
        className="card-body"
      >

        <h3>
          Leave Policy Chatbot
        </h3>

        <div
          style={{
            height: "300px",
            overflowY: "auto",
            border:
              "1px solid #ddd",
            padding: "10px",
            marginBottom:
              "10px"
          }}
        >

          {
            messages.map(
              (
                msg,
                index
              ) => (

                <div
                  key={index}
                >

                  <strong>

                    {
                      msg.type ===
                      "user"

                        ? "You"

                        : "Bot"
                    }

                    :

                  </strong>

                  {" "}

                  {msg.text}

                </div>

              )
            )
          }

        </div>

        <input
          type="text"
          className="form-control"
          value={question}
          placeholder="Ask about leave policy..."
          onChange={
            (e) =>
              setQuestion(
                e.target.value
              )
          }
        />

        <button
          className="btn btn-primary mt-2"
          onClick={handleAsk}
        >
          Ask
        </button>

      </div>

    </div>

  );

}

export default chatBot;
