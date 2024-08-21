import React, {useState, useEffect} from 'react';
import { TextInput, Text, Pressable, View, FlatList} from 'react-native'

export default function Message() {
    const [message, setMessage] = useState('')
    const [messageList, setMessageList] = useState('')

    function sendMessage() {

    }

    return(
        <View>
            <Text>Digite uma mensagem:</Text>
            <TextInput/>

            <Pressable
                title="Enviar"
                onPress={() => sendMessage()}
            />

            <Text> Mensagem enviadas:</Text>
            <FlatList
                data={messageList.reverse()}
                renderItem={({item})=>{
                    return (
                        <Text>{Item}</Text>
                    )
                }}

                keyExtractor={(item)=>{item}}
            />
            
        </View>
    );
}