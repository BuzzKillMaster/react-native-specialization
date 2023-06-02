import {View, Text, ScrollView, StyleSheet, FlatList, Alert} from "react-native";
import React, {useContext, useEffect, useState} from "react";
import LoadingScreen from "./LoadingScreen";
import HomeScreenListHeader from "../components/HomeScreenListHeader";
import HomeScreenListItem from "../components/HomeScreenListItem";
import {MenuContext} from "../context/MenuContext";
import {createMenuItemsTable, dropMenuItemsTable, fetchMenuItems, insertMenuItem} from "../database";
import * as SQLite from "expo-sqlite";

const db = SQLite.openDatabase('menu_items.db')

function ItemSeparatorComponent() {
    return <View style={{ height: 2, backgroundColor: "#333333", marginVertical: 12, marginHorizontal: 24 }} />
}

export default function HomeScreen({navigation}) {
    const [isLoading, setIsLoading] = useState(true)
    const {menu, setMenu} = useContext(MenuContext)

    useEffect(() => {
        (async () => {
            try {
                const fetchedMenu = await fetchMenuItems()

                if (fetchedMenu.length) {
                    setMenu(fetchedMenu)
                    setIsLoading(false)
                    return
                }
            } catch (e) {
                createMenuItemsTable()
            }

            const response = await fetch("https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json")
            const data = await response.json()

            const menu = data.menu.map(item => {
              return {
                  ...item,
                  image: "https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/" + item.image + "?raw=true"
              }
            })

            menu.forEach(item => {
                insertMenuItem(item)
            })

            setMenu(menu)
            setIsLoading(false)
        })()
    }, [])

    if (isLoading) return <LoadingScreen/>

    return (
        <FlatList style={styles.container} data={menu} ListHeaderComponent={HomeScreenListHeader} renderItem={HomeScreenListItem} ItemSeparatorComponent={ItemSeparatorComponent}/>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    }
})