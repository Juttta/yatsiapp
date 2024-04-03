import React from "react";
import { Text, View } from "react-native-paper";
import style from '../styles/style';

export default function Header(){
    return (
        <View style={style.header}>
            <Text style={style.title}>
                Yatsi game
            </Text>
        </View>
    )
}