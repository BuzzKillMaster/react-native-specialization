import {ActivityIndicator, View, Text, StyleSheet} from "react-native";

export default function LoadingScreen({navigation}) {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
    }
})