import {useState} from 'react';
import { Text, View, TextInput, Pressable, Keyboard } from 'react-native';
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Header from "./Header"
import Footer from './Footer';
import {NBR_OF_DICES, NBR_OF_THROWS, MIN_SPOT, MAX_SPOT, BONUS_POINTS_LIMIT, BONUS_POINTS} from '../constants/Game';
import style from '../styles/style';

export default function Home({navigation}){

    const [playerName, setPlayerName] = useState('');
    const [hasPlayerName, setHasPlayerName] = useState(false);

    const handlePlayerName = (value) => {
        if (typeof value === 'string' && value.trim().length > 0) {
            setHasPlayerName(true);
            Keyboard.dismiss();
        }
    }

    return(
        <>
        <Header />
        <View style = {style.container}>
          <MaterialCommunityIcons
              name='information'
              size={90}
              color='#FCBB42'
          />
          { !hasPlayerName ?
           <>
              <Text> For Scoreboard enter your Name here</Text>
              <TextInput
                  onChangeText={setPlayerName}
                  autoFocus={true}
              />
              <Pressable
                  onPress={() => handlePlayerName(playerName)}>
                  <Text>READY</Text>
              </Pressable>
           </>
            : 
           <>
              <Text>Rules of the game</Text>
              <Text multiline = 'true'> Rules </Text>
              <Text multiline='true' style={style.text}>
              THE GAME: Upper section of the classic Yahtzee 
dice game. You have {NBR_OF_DICES} dices and 
for the every dice you have {NBR_OF_THROWS} 
throws. After each throw you can keep dices in 
order to get same dice spot counts as many as 
possible. In the end of the turn you must select 
your points from {MIN_SPOT} to {MAX_SPOT}. 
Game ends when all points have been selected. 
The order for selecting those is free. {' \n'}
POINTS: After each turn game calculates the sum 
for the dices you selected. Only the dices having 
the same spot count are calculated. Inside the 
game you can not select same points from 
{MIN_SPOT} to {MAX_SPOT} again.</Text>
              <Text>Good luck, {playerName} </Text>
              <Pressable
                  onPress={() => navigation.navigate('Gameboard', {player: playerName})}>
              <Text>PLAY</Text>
              </Pressable>
           </>
}
        </View>
        <Footer />
       </>
    );
}