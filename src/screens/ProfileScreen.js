import {Alert, StyleSheet, TextInput, View, Text, Pressable, Image, ScrollView} from "react-native";
import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {useEffect, useRef, useState} from "react";
import LoadingScreen from "./LoadingScreen";
import {MaskedTextInput} from "react-native-mask-text";
import * as ImagePicker from 'expo-image-picker';
import AppCheckbox from "../components/AppCheckbox";
import BottomSheet from "@gorhom/bottom-sheet";

export default function ProfileScreen({navigation}) {
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    const bottomSheetRef = useRef(null)

    const showBottomSheet = () => bottomSheetRef.current.expand()
    const hideBottomSheet = () => bottomSheetRef.current.close()

    const handleSignOut = async () => {
        await AsyncStorage.removeItem("user");

        navigation.reset({
            index: 0,
            routes: [{name: "Welcome"}],
        });
    }

    useEffect(() => {
        (async () => {
            try {
                const user = await AsyncStorage.getItem("user")
                setUser(JSON.parse(user))
            } catch (e) {
                Alert.alert("Error Occurred", "It looks like there was an error retrieving your user data. Please try again later.")
            }

            setIsLoading(false)
        })()
    }, [])

    const saveUser = async () => {
        try {
            if (user.phoneNumber.length !== 0 && !user.phoneNumber.match(/^\(\d{3}\) \d{3}-\d{4}$/)) {
                Alert.alert("Invalid Phone Number", "Please enter a valid phone number.")
                return
            }

            if (user.name.length === 0) {
                Alert.alert("Invalid Name", "Please enter a valid name.")
                return
            }

            if (!user.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                Alert.alert("Invalid Email", "Please enter a valid email.")
                return
            }

            await AsyncStorage.setItem("user", JSON.stringify(user))

            Alert.alert("Success", "Your user data has been saved.")
        } catch (e) {
            Alert.alert("Error Occurred", "It looks like there was an error saving your user data. Please try again later.")
        }
    }

    const changeProfileImage = async () => {
        if (!user.image) {
            await getProfileImage()
            return
        }

        showBottomSheet()
    }

    const getProfileImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
            aspect: [1, 1],
        })

        if (!result.canceled) {
            setUser({
                ...user,
                image: result.assets[0].uri,
            })
        }
    }

    if (isLoading) return <LoadingScreen/>

    return (
        <ScrollView>
            <View style={styles.container}>
                <Pressable onPress={changeProfileImage}>
                    {user.image && <Image source={{uri: user.image}} style={styles.image} /> }

                    {!user.image && (
                        <View style={styles.imagePlaceholder}>
                            <Text style={styles.imagePlaceholderText}>{user.name.slice(0, 1)}</Text>
                        </View>
                    )}
                </Pressable>

                <View>
                    <Text style={styles.label}>Name</Text>
                    <TextInput style={styles.input} value={user.name} onChangeText={(name) => setUser({...user, name})}  placeholder={"Name"}></TextInput>
                </View>

                <View>
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input} value={user.email} onChangeText={(email) => setUser({...user, email})} placeholder={"Email"}></TextInput>
                </View>

                <View>
                    <Text style={styles.label}>Phone Number</Text>
                    <MaskedTextInput
                        style={styles.input}
                        mask={"(999) 999-9999"}
                        value={user.phoneNumber}
                        placeholder={"Phone Number"}
                        keyboardType={"phone-pad"}
                        onChangeText={(phoneNumber) => {
                            if (phoneNumber.length === 0 && user.phoneNumber?.length !== 0) return

                            setUser({
                                ...user,
                                phoneNumber,
                            })
                        }}
                    />
                </View>

                <View>
                    <Text style={styles.label}>Email Notifications</Text>

                    <View style={styles.notifications}>
                        <AppCheckbox label={"Order Status Updates"} value={user.orderStatusUpdates} onValueChange={(orderStatusUpdates) => setUser({...user, orderStatusUpdates})} />
                        <AppCheckbox label={"Password Changes"} value={user.passwordChanges} onValueChange={(passwordChanges) => setUser({...user, passwordChanges})} />
                        <AppCheckbox label={"Special Offers"} value={user.specialOffers} onValueChange={(specialOffers) => setUser({...user, specialOffers})} />
                        <AppCheckbox label={"Newsletter"} value={user.newsletter} onValueChange={(newsletter) => setUser({...user, newsletter})} />
                    </View>
                </View>

                <View style={styles.buttonsContainer}>
                    <AppButton title={"Save Information"} onPress={saveUser} />
                    <AppButton title={"Sign Out"} onPress={handleSignOut} />
                </View>
            </View>

            <BottomSheet backgroundStyle={{backgroundColor: "#EDEFEE"}} ref={bottomSheetRef} enablePanDownToClose={true} snapPoints={["50%"]} index={-1}>
                <View style={styles.bottomSheet}>
                    <AppButton title={"Change Profile Image"} onPress={getProfileImage} />
                    <AppButton title={"Remove Profile Image"} onPress={() => setUser({...user, image: null})} />

                    <AppButton title={"Cancel"} onPress={hideBottomSheet} />
                </View>
            </BottomSheet>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        gap: 24,
    },
    bottomSheet: {
        padding: 24,
        gap: 8,
    },
    input: {
        backgroundColor: "#fff",
        padding: 16,
        borderRadius: 8,
        width: "100%",
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
    imagePlaceholder: {
        width: 100,
        height: 100,
        backgroundColor: "#333333",
        color: "#EDEFEE",
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    imagePlaceholderText: {
        fontSize: 32,
        fontWeight: "bold",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 8,
    },
    notifications: {
        gap: 16,
    },
    buttonsContainer: {
        gap: 8,
    }
})