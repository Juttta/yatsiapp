import React from "react";
import { Text, View } from "react-native-paper";
import style from '../styles/style';

export default function Footer(){
    return(
        <View style={styles.footer}>
            <Text style={styles.author}>
                Author Jutta Anttila
            </Text>
        </View>
    )
}