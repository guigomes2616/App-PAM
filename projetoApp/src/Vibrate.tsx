import react from "react";
import { Vibration, View, Text, Pressable, StyleSheet} from 'react-native'

export function Vibrate() {
    const vibrateDevice = () => {
        Vibration.vibrate(500); //Vibra por 500ms

    };

    return (
        <View>
            <Pressable style={StyleSheet.pressable} OnPress={vibrateDevice}>
                <Text style={StyleSheet.pressableText}>Vibrar</Text>
            </Pressable>
        </View>
  );
};

const style = StyleSheet.create({
    pressable: {
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center",
        width: "95%",
        backgroundColor: "#le0bd0",
        paddingTop: 14,
        paddingBottom: 14,
        marginTop: 14,
        marginHorizontal: 14
    },
    pressableText: {
        fontSize: 20,
        color: "#fff"
    }
})
