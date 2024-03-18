import React from 'react';
import { View, Image, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import SurveyForm from './pages/SurveyForm/SurveyForm';
import ViewSurvey from './pages/ViewSurvey/ViewSurvey';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import CreateSurvey from './pages/CreateSurvey/CreateSurvey';
import EditDetailsPage from './pages/Profile/ProfilePage';
const Stack = createStackNavigator();

const LogoAndTitle = () => {
	return (
		<View style={{
			flexDirection: 'row',
			alignItems: 'center',
		}}>
			<Image source={require('./assets/logo.webp')} style={{ width: 50, height: 50 }} />
			<Text style={{ fontSize: 24, marginLeft: 10 }}>V2V</Text>
		</View>
	);
};

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Home"
				screenOptions={{
					headerTitle: (props) => <LogoAndTitle {...props} />
				}}
			>
				<Stack.Screen name="Home" component={Home} />
				<Stack.Screen name="Login" component={Login} />
				<Stack.Screen name="Signup" component={Signup} />
				<Stack.Screen name="ForgotPassword" component={ForgotPassword} />
				<Stack.Screen name="SurveyForm" component={SurveyForm} />
				<Stack.Screen name="CreateSurvey" component={CreateSurvey} />
				<Stack.Screen name="EditDetailsPage" component={EditDetailsPage} />
				<Stack.Screen name="ViewSurvey" component={ViewSurvey} options={{ headerShown: false }} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;