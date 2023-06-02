import {Pressable, StyleSheet, Text} from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

export default function AppCheckbox({ value, onValueChange, label }) {
    const handlePress = () => onValueChange(!value);

    return (
        <Pressable style={styles.container} onPress={handlePress}>
            <Ionicons name={value ? "checkbox" : "square-outline"} size={24}/>
            <Text style={styles.text}>{label}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
    },
    text: {
        marginLeft: 8,
    }
})