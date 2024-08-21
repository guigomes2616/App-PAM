import React, {useState, useEffect} from "react";
import { View, Text } from "react-native";
import socket from "./socket";

export default function App() {
  const [message, setMessage] = useState('');

    useEffect(() =>{
      socket.on('connect', ()=>{
        console.log("Conectado no servidor!")
      });

      socket.on("message", (msg)=>{
        setMessage(msg)
      });

      return () =>{
        socket.off("connect");
        socket.off("message");
      }
    }, []);

  return (
    <View style={{flex:1, justifyContent: "center", alignItems: "center"}}>
      <Text>Mensagem do servidor: {message}</Text>
    </View>
  );
}