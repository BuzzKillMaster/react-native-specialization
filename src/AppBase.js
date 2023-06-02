import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {createStackNavigator} from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import OnboardingScreen from "./screens/OnboardingScreen";
import AppButton from "./components/AppButton";
import IconButton from "./components/IconButton";
import ProfileScreen from "./screens/ProfileScreen";
import MenuContextProvider from "./context/MenuContext";

const Stack = createStackNavigator();

const AppTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        background: "#EDEFEE",
    },
}

export default function AppBase({user}) {
    return (
        <MenuContextProvider>
            <NavigationContainer theme={AppTheme}>
                <Stack.Navigator initialRouteName={user ? "Home" : "Welcome"}>
                    <Stack.Screen name="Home" component={HomeScreen}  options={({ navigation }) => ({
                        headerRight: () => <IconButton iconName="person-circle-outline" onPress={() => navigation.navigate("Profile")}/>,
                        headerRightContainerStyle: {
                            marginRight: 16,
                        },
                        title: "Little Lemon",
                    })}/>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} options={{headerShown: false}}/>
                    <Stack.Screen name="Onboarding" component={OnboardingScreen}/>
                    <Stack.Screen name="Profile" component={ProfileScreen} />
                </Stack.Navigator>
            </NavigationContainer>
        </MenuContextProvider>
    )
}