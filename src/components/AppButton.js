import {Pressable, Text, StyleSheet} from "react-native";

export default function AppButton({title, onPress, style, disabled = false}) {
    return (
        <Pressable onPress={onPress} style={{...styles.button, ...style, ...{
            opacity: disabled ? 0.5 : 1,
        }}} disabled={disabled}>
            <Text style={styles.text}>{title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#495E57",
        padding: 16,
        borderRadius: 8,
        alignItems: "center",
    },
    text: {
        color: "#EDEFEE",
        fontSize: 16,
        fontWeight: "bold",
    }
})