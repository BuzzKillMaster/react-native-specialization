import {Image, View, StyleSheet, Text} from "react-native";

export default function HomeScreenListItem({ item }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.description}>{item.description}</Text>
                <Text style={styles.price}>${item.price}</Text>
            </View>

            <Image source={{ uri: item.image }} style={styles.image}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        flexDirection: "row",
        gap: 16,
        padding: 24,
    },
    content: {
        flex: 1,
        gap: 8,
    },
    image: {
        width: "25%",
        aspectRatio: 1,
        resizeMode: "cover",
        borderRadius: 8,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 8,
    },
    description: {
        fontSize: 16,
    },
    price: {
        fontSize: 16,
        fontWeight: "bold",
    }
})