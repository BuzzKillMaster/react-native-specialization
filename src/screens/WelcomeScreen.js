import {View, Text, StyleSheet, Button, Image, Pressable} from "react-native";
import React from "react";
import AppButton from "../components/AppButton";

export default function WelcomeScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.welcomeMessage}>
                <Image source={require("../../assets/images/logo-grey.png")} style={styles.image}/>

                <Text style={styles.title}>Welcome to Little Lemon</Text>
                <Text style={styles.description}>The ultimate destination for authentic Mediterranean food and experiences.</Text>
            </View>
            
            <View>
                <AppButton onPress={() => navigation.navigate("Onboarding")} title={"Get Started"} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
    },
    welcomeMessage: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginTop: 36,
        marginBottom: 24,
        textAlign: "center",
    },
    description: {
        fontSize: 16,
        textAlign: "center",
    },
    image: {
        height: 200,
        resizeMode: "contain",
    },
})