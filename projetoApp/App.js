import React, { useEffect, useState } from "react";
import { View, Text, Pressable, StyleSheet, TextInput } from "react-native";
import socket from './socket';

export default function App() {
  const [room, setRoom] = useState('default');
  const [message, setMessage] = useState('');
  const [receivedMessage, setReceivedMessage] = useState('');

  const sendMessage = () => {
    if (message.trim()) {
      socket.emit('send_message', { room, message });
      console.log(`Mensagem enviada: ${message}`); // Log da mensagem enviada
      setMessage('');
    } else {
      console.log('Mensagem vazia, não enviada'); // Log se a mensagem estiver vazia
    }
  };

  useEffect(() => {
    socket.emit('join_room', room);
    
    socket.on('connect', () => {
      console.log('Conectado ao servidor'); // Log de conexão
    });

    socket.on('receive_message', (msg) => {
      setReceivedMessage(msg);
      console.log(`Mensagem recebida: ${msg}`); // Log da mensagem recebida
    });

    return () => {
      socket.off('receive_message');
    };
  }, [room]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Canal: {room}</Text>

      <TextInput
        placeholder='Digite sua mensagem'
        value={message}
        onChangeText={setMessage}
        style={styles.input}
      />

      <Pressable style={styles.button} onPress={sendMessage}>
        <Text style={styles.buttonText}>Enviar mensagem</Text>
      </Pressable>

      <Text style={styles.receivedMessageTitle}>Mensagem recebida:</Text>
      <Text style={styles.receivedMessage}>
        {receivedMessage || 'Nenhuma mensagem recebida'}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  receivedMessage: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
    padding: 10,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
    textAlign: 'center',
  },
  receivedMessageTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
});
