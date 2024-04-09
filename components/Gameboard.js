import React from "react";
import { useState } from "react";
import { Text, View, Pressable } from "react-native-paper";
import Header from './Header';
import Footer from './Footer';
import {NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS} from '../constants/Game';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Container,Row, Col} from 'react-native-flex-grid';
import style from '../styles/style';

let board = [];

export default function Gameboard({navigation}) {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw dices');
    const [gameEndStatus, setGameEndStatus] = useState(false);

    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
    const [dicePointsTotal, setDicePoints] = useState(new Array(MAX_SPOT).fill(0));

    const [playerName, setPlayerName] = useState('');

    const row = [];
    for (let dice  = 0; dice < NBR_OF_DICES; dice++) {
        row.push(
         <Col key = {'dice' + dice}>
            <Pressable 
            key = {'row' + dice} 
           // onPress = {() => selectDice(dice)}
           >
                <MaterialCommunityIcons 
                //name = {board[dice]} 
                name = {'dice-3'}
                key = {'dice' + dice} 
                size = {50} 
                color = {'black'}
               // color = {getDiceColor(dice)}
               >
                </MaterialCommunityIcons>
            </Pressable>
         </Col>
        )
    }

    return (
     <>
        <Header />
        <View>
            <Container>
                <Row>{row}</Row>
            </Container>
        </View>
        <Footer />
     </>
    )
}