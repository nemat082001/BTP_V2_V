import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Image, Text } from 'react-native';
import Card from '../Components/Card';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Form from '../SurveyForm/SurveyForm'
import Logout from '../LogOut/Logout'
import EditDetailsPage from '../Profile/ProfilePage';
import Files from '../Files/Files';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LogoAndTitle = () => {
	return (
		<View style={{
			flexDirection: 'row',
			alignItems: 'center',
		}}>
			<Image source={require('../../assets/logo.webp')} style={{ width: 50, height: 50 }} />
			<Text style={{ fontSize: 24, marginLeft: 10 }}>V2V</Text>
		</View>
	);
};
const Survey = () => {
	const [surveyList, setSurveyList] = useState([]);
	const navigation = useNavigation();
	useEffect(() => {
		const fetchData = async () => {
			try {
				const apiUrl = "http://65.2.70.232/api/survey/getAllSurveys";
				const token = await AsyncStorage.getItem('jwtToken');
				await fetch(apiUrl, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
				}).then(response => {
					return response.json();
				}).then((data) => {
					setSurveyList(data.data);
					console.log(data);
				})
			}
			catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	return (
		<View style={styles.container}>
			<FlatList
				data={surveyList}
				keyExtractor={(data, index) => index.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => navigation.navigate('CreateSurvey', { surveyList, data: item, setSurveyList })}
					>
						<Card data={item} />
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

const Drawer = createDrawerNavigator();
const ViewSurvey = () => {
	return (
		<Drawer.Navigator initialRouteName="Survey"
			screenOptions={{
				headerTitle: (props) => <LogoAndTitle {...props} />
			}}
		>
			<Drawer.Screen name="Survey" component={Survey} />
			<Drawer.Screen name="Profile" component={EditDetailsPage} />
			<Drawer.Screen name="Create Survey" component={Form} />
			<Drawer.Screen name="Files" component={Files} />
			<Drawer.Screen name="Log Out" component={Logout} />
		</Drawer.Navigator>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f0f0f0',
	},
});

export default ViewSurvey;

