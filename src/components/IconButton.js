import {Pressable} from "react-native";
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function IconButton({ onPress, iconName }) {
    return (
        <Pressable onPress={onPress}>
            <Ionicons name={iconName} size={24}/>
        </Pressable>
    );
};
