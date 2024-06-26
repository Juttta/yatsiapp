import { useState, useEffect } from "react";
import { Text, View, Pressable, Button } from "react-native";
import Header from './Header';
import Footer from './Footer';
import {NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS} from '../constants/Game';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Container,Row, Col} from 'react-native-flex-grid';
import style from '../styles/style';


export default function Gameboard({navigation, route}) {

    const [nbrOfThrowsLeft, setNbrOfThrowsLeft] = useState(NBR_OF_THROWS);
    const [status, setStatus] = useState('Throw dices');
    const [gameEndStatus, setGameEndStatus] = useState(false);

    const [selectedDices, setSelectedDices] = useState(new Array(NBR_OF_DICES).fill(false));
    const [diceSpots, setDiceSpots] = useState(new Array(NBR_OF_DICES).fill(0));
    const [selectedDicePoints, setSelectedDicePoints] = useState(new Array(MAX_SPOT).fill(false));
    const [dicePointsTotal, setDicePointsTotal] = useState(new Array(MAX_SPOT).fill(0));

    const [board, setBoard] = useState([]);

    const [playerName, setPlayerName] = useState('');

    const [currentRound, setCurrentRound] = useState(1);

    const [totalPoints, setTotalPoints] = useState(0);

    useEffect(() => {
        if (playerName === '' && route.params?.player) {
            setPlayerName(route.params.player);
        }
    }, []);

    useEffect(() => {
        const sum = dicePointsTotal.reduce((acc, cur) => acc + cur, 0);
        setTotalPoints(sum);
    }, [dicePointsTotal]);


    const row = [];
    for (let dice  = 0; dice < NBR_OF_DICES; dice++) {
        row.push(
         <Col key = {'dice' + dice}>
            <Pressable 
            key = {'row' + dice} 
            onPress = {() => selectDice(dice)}
           >
                <MaterialCommunityIcons 
                name = {board[dice]} 
                key = {'dice' + dice} 
                size = {50} 
                color = {getDiceColor(dice)}
               >
                </MaterialCommunityIcons>
            </Pressable>
         </Col>
        );
    }

    const pointsRow = [];
    for (let spot = 0 ; spot < MAX_SPOT ; spot++){
        pointsRow.push(
            <Col key = {'pointsRow' + spot}>
                <Text key = {'pointsRow' + spot}>{getSpotTotal(spot)}</Text>
            </Col>
        );
    }

    const poinstToSelectRow = [];
    for (let diceButton = 0; diceButton < MAX_SPOT; diceButton++) {
      poinstToSelectRow.push(
        <Col key = {'buttonsRow' + diceButton}>
            <Pressable 
              key = {'buttonsRow' + diceButton}
              onPress = {() => selectDicePoints(diceButton)}
              >
                <MaterialCommunityIcons 
                key = {'buttonsRow' + diceButton}
                name = {'numeric-' + (diceButton + 1) + '-circle'}
                size = {35}
                color = {getDicePointsColor(diceButton)}
                >

                </MaterialCommunityIcons>
            </Pressable>
        </Col>
      );
    }


    const selectDice = (i) => {
        let dices = [...selectedDices];
        dices[i] = selectedDices[i] ? false : true;
        setSelectedDices(dices);
    }

    function getDiceColor(i) {
        return selectedDices[i] ? 'black' : '#FCBB42'
    }

    function getDicePointsColor(i) {
        return selectedDicePoints[i] ? 'black' : '#FCBB42'
    }

   

const selectDicePoints = (i) => {
        let selectedPoints = [...selectedDicePoints];
        let points = [...dicePointsTotal];
        if (!selectedPoints[i]) {
            selectedPoints[i] = true;
            let nbrOfDices = diceSpots.reduce((total, x) => (x === (i + 1) ? total + 1 : total), 0 );
            points[i] = nbrOfDices * (i + 1);
            // setNbrOfThrowsLeft(NBR_OF_THROWS);
            setDicePointsTotal(points);
            setSelectedDicePoints(selectedPoints);
            return points[i];
        } else {
            setStatus('You already selected points for ' + (i + 1));
        }

};

    const throwDices = () => {
        if (nbrOfThrowsLeft > 0) {
            let spots = [...diceSpots];
            let newBoard = [];
            let points = [...dicePointsTotal];
            for (let i = 0; i < NBR_OF_DICES; i++) {
                if (!selectedDices[i]) {
                    let randomNumber = Math.floor(Math.random() * MAX_SPOT +1);
                    spots[i] = randomNumber;
                    newBoard.push('dice-' + randomNumber);
                    
                } else{
                    newBoard.push(board[i]);
                    points[diceSpots[i] - 1] += diceSpots[i];
                }
            }
            setDiceSpots(spots);
            setNbrOfThrowsLeft(nbrOfThrowsLeft-1);
            setBoard(newBoard);
            
        } else {
            if (currentRound < 6){
                setCurrentRound(currentRound + 1);
                setNbrOfThrowsLeft(NBR_OF_THROWS);
            } else {
                setGameEndStatus(true);
            }
            setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        }
        
    };
        

    function getSpotTotal(i) {
        return dicePointsTotal[i];
    }

    const playAgain = () => {
        // Reset all necessary state variables to start a new game
        setNbrOfThrowsLeft(NBR_OF_THROWS);
        setStatus('Throw dices');
        setGameEndStatus(false);
        setSelectedDices(new Array(NBR_OF_DICES).fill(false));
        setDiceSpots(new Array(NBR_OF_DICES).fill(0));
        setSelectedDicePoints(new Array(MAX_SPOT).fill(false));
        setDicePointsTotal(new Array(MAX_SPOT).fill(0));
        setBoard([]);
        setCurrentRound(1);
        setTotalPoints(0);
    };

    return (
     <>
        <Header />
        <View style = {style.container}>
            <Container>
                <Row>{row}</Row>
            </Container>
            <Text>Round: {currentRound}</Text>
            <Text> Throw and select dices</Text>
            <Text>Throws Left: {nbrOfThrowsLeft} </Text>
            <Pressable
                onPress = {() => throwDices()}>
                <Text>Throw</Text>
            </Pressable>
            <Container>
                <Row>{pointsRow}</Row>
            </Container>
            <Container>
                <Row>{poinstToSelectRow}</Row>
            </Container>
            <Text>Player name: {playerName}</Text>
            <Text>Total points: {totalPoints}</Text>
            {gameEndStatus && (
                <Button
                color = '#FFCE54'
                title= "Play again"
                onPress={() => playAgain()}/>
            )}
        </View>
        <Footer />
     </>
    );
}