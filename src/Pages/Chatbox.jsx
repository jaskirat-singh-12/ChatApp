import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
function Chatbox() {
  const { sender, reciever } = useParams();
  let workingUrl = process.env.REACT_APP_API_URL;
  let [data, setData] = useState([]);
  let [messageBody, setMessageBody] = useState("");
  const socketRef = useRef(null);
  let sendMessage = async () => {
    if (socketRef.current) {
      socketRef.current.emit(
        "pm",
        { body: messageBody, senderId: sender },
        reciever
      );
      console.log("send message called");
      setMessageBody("");
    }
  };

  let getmessages = async () => {
    try {
      console.log(sender, reciever);
      let results = await axios.get(
        workingUrl + `/messages/${sender}/${reciever}`
      );
      console.log(results.data);
      setData(results.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let socket = io(workingUrl);
    socketRef.current = socket;
    socket.emit("register", sender);

    socket.on("pm", (msg) => {
      getmessages();
    });
    return () => {
      socket.disconnect();
    };
  }, [sender]);

  useEffect(() => {
    getmessages();
  }, [sender, reciever]);

  return (
    <div className="container-fluid chatboxElement">
      <div className="flexbox" id="messagebox">
        {data.map((message) => {
          if (sender == message.sender._id) {
            return (
              <div className="sender d-flex justify-content-between align-items-center">
                <p>{message.messageBody}</p>
                <p>
                  {new Date(message.timeStamp).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  
                </p>
              </div>
            );
          } else {
            return (
              <div className=" reciever d-flex justify-content-between align-items-center">
                <p>{message.messageBody}</p>
                <p>
                  {new Date(message.timeStamp).toLocaleTimeString("en-IN", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            );
          }
        })}
      </div>
      <div className="inputBox">
        <textarea
          onChange={(e) => {
            setMessageBody(e.target.value);
          }}
          value={messageBody}
          className="form-control"
          type="text"
        />
        <button onClick={sendMessage} className="btn btn-success">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbox;
