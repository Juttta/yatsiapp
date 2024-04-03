import Home from "./components/Home";
import Gameboard from "./components/Gameboard";
import Scoreboard from "./components/Scoreboard";
import { NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator} from "@react-navigation/buttom-tabs";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function App(){
  return(
    <NavigationContainer>
      <Tab.Navigatior
        sceneContainerStyle={{backgroundColor: 'transparent'}}
        screenOptions={{{ route }}} => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'information'
                : 'information-outline';
            } else if (route.name === 'Gameboard') {
              iconName = focused
                ? 'dice-multiple'
                : 'dice-multiple-outline';
            }
          }
        })
      ></Tab.Navigatior>

    </NavigationContainer>
  )
}