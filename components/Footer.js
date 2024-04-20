import React from "react";
import { Text, View } from "react-native";
import style from '../styles/style';

export default function Footer({navigation}){
    return(
        <View style={style.footer}>
            <Text style={style.author}>
                Author Jutta Anttila
            </Text>
        </View>
    )
}