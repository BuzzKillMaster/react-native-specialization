import {View, Text, StyleSheet, Alert, TextInput} from "react-native";
import PagerView from "react-native-pager-view";
import {useEffect, useRef, useState} from "react";
import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./LoadingScreen";

export default function OnboardingScreen({navigation}) {
    const pager = useRef(null)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    const [nameIsValid, setNameIsValid] = useState(false)
    const [emailIsValid, setEmailIsValid] = useState(false)

    const [isLoading, setIsLoading] = useState(false)

    const handleRegistration = async () => {
        setIsLoading(true)

        try {
            await AsyncStorage.setItem('user', JSON.stringify({
                name,
                email,
            }))

            // replace all screens in the stack with the Home screen
            navigation.reset({
                index: 0,
                routes: [{ name: 'Home' }],
            })
        } catch (e) {
            setIsLoading(false)

            Alert.alert("Error Occurred", "It looks like there was an error saving your user data. Please try again later.")
        }
    }

    const setPage = (page) => pager.current.setPage(page)

    useEffect(() => {
        setNameIsValid(name.length > 0)
    }, [name])

    useEffect(() => {
        setEmailIsValid(email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) !== null)
    }, [email])

    if (isLoading) return <LoadingScreen/>

    return (
        <PagerView ref={pager} style={styles.container} initialPage={0} scrollEnabled={false}>
            <View style={styles.page} key="1">
                <View style={styles.inputContainer}>
                    <Text style={styles.description}>{"Let's get to know you a little better!\nWhat should we call you?"}</Text>
                    <TextInput style={styles.input} value={name} onChangeText={setName} placeholder={"Name"}></TextInput>
                </View>

                <View style={styles.navigationButtons}>
                    <AppButton style={styles.button} title="Previous" onPress={() => navigation.pop()} />
                    <AppButton style={styles.button}  title="Next" onPress={() => setPage(1)} disabled={!nameIsValid} />
                </View>
            </View>

            <View style={styles.page} key="2">
                <View style={styles.inputContainer}>
                    <Text style={styles.description}>{"It's nice to meet you, " + name + ".\nHow may we contact you?"}</Text>
                    <TextInput style={styles.input} keyboardType={"email-address"} value={email} onChangeText={setEmail} placeholder={"Email"}></TextInput>
                </View>

                <View style={styles.navigationButtons}>
                    <AppButton style={styles.button}  title="Previous" onPress={() => setPage(0)} />
                    <AppButton style={styles.button}  title="Next" onPress={() => setPage(2)} disabled={!emailIsValid}/>
                </View>
            </View>

            <View style={styles.page} key="3">
                <View style={styles.inputContainer}>
                    <Text style={styles.description}>{"Thank you for joining Little Lemon.\nWelcome to the community!"}</Text>
                </View>

                <View style={styles.navigationButtons}>
                    <AppButton style={styles.button}  title="Previous" onPress={() => setPage(1)} />
                    <AppButton style={styles.button}  title="Complete" onPress={handleRegistration} />
                </View>
            </View>
        </PagerView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
    },
    inputContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
    },
    input: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        width: "100%",
    },
    description: {
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center",
    },
    navigationButtons: {
        flexDirection: "row",
        gap: 16,
    },
    button: {
        flex: 1,
    }
})