import * as React from 'react';
import {Alert} from 'react-native';
import 'react-native-gesture-handler';
import AsyncStorage from "@react-native-async-storage/async-storage";
import LoadingScreen from "./src/screens/LoadingScreen";
import AppBase from "./src/AppBase";
import {useEffect, useState} from "react";

export default function App() {
    const [user, setUser] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const forceDelay = async (delay = 2000) => {
            return new Promise(resolve => setTimeout(resolve, delay))
        }

        (async () => {
            let user = null

            try {
                user = await AsyncStorage.getItem('user')
            } catch (e) {
                Alert.alert("Error Occurred", "It looks like there was an error retrieving your user data (or lack thereof). Please try again later.")
            }

            if (user) {
                setUser(JSON.parse(user))
            }

            setIsLoading(false)
        })();
    }, [])

    return isLoading ? <LoadingScreen/> : <AppBase user={user}/>
}