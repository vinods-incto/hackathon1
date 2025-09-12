import {useEffect, useState} from "react";

export default function useWebSocket() {
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new WebSocket("wss://streamer.finance.yahoo.com/");
        setWs(socket);

        socket.onmessage = (event) => {
            setMessages((prevMessages) => [...prevMessages, event.data]);
            console.log("Received message:", event.data);
        };

        return () => {
            socket.close();
        };
    }, []);

    const sendMessage = (message) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(message);
        }
    };

    return {messages, sendMessage};
}