import {Text, View, StyleSheet, TextInput, ScrollView, Pressable} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import {MenuContext} from "../context/MenuContext";

export default function HomeScreenListHeader() {
    const [options, setOptions] = useState([])

    const {menu, category, selectCategory, search, setSearch} = useContext(MenuContext)

    useEffect(() => {
        setOptions([...new Set(menu.map(item => item.category))])
    }, [])

    return (
        <View>
            <View style={styles.hero}>
                <Text style={styles.heading}>Little Lemon</Text>
                <Text style={styles.subheading}>Chicago</Text>

                <Text style={styles.description}>We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.</Text>

                <TextInput style={styles.input} placeholder={"Search our menu"} value={search} onChangeText={setSearch}></TextInput>
            </View>

            <View style={styles.container}>
                <Text style={styles.orderTitle}>Order For Delivery</Text>

                <ScrollView horizontal>
                    {options.map((option, index) => {
                        return (
                            <View key={index}>
                                <Pressable style={{...styles.category,
                                    backgroundColor: option === category ? "#F4CE14" : "#495E57",
                                }} onPress={() => selectCategory(option)}>
                                    <Text style={{
                                        fontWeight: "bold",
                                        color: option === category ? "#333333" : "#EDEFEE"
                                    }}>{option}</Text>
                                </Pressable>
                            </View>
                        )
                    })}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
    },
    hero: {
        gap: 12,
        padding: 24,
        backgroundColor: "#495E57",
    },
    orderTitle: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 24,
    },
    heading: {
        fontSize: 32,
        fontWeight: "bold",
        color: "#F4CE14",
    },
    subheading: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#EDEFEE",
    },
    description: {
        fontSize: 16,
        color: "#EDEFEE",
    },
    input: {
        backgroundColor: "#EDEFEE",
        borderRadius: 8,
        padding: 16,
        marginTop: 24,
    },
    category: {
        backgroundColor: "#495E57",
        borderRadius: 8,
        padding: 16,
        marginHorizontal: 8,
    },
})