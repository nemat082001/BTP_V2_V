import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Touchable } from 'react-native';
import Card from '../Components/Card';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Form from '../Form/Form'
import Logout from '../LogOut/Logout'
import EditDetailsPage from '../Edit_details/Edit_page';
import Files from '../Files/Files';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Survey = () => {
	const [dataList, setDataList] = useState([]);
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
					setDataList(data.data);
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
				data={dataList}
				keyExtractor={(item, index) => index.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity
						onPress={() => navigation.navigate('FillForm', { data: item })}
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
		<Drawer.Navigator initialRouteName="Survey">

			<Drawer.Screen name="Survey" component={Survey} />
			<Drawer.Screen name="Profile" component={EditDetailsPage} />
			<Drawer.Screen name="Create Survey" component={Form} />
			{/* <Drawer.Screen name="FillForm" component={FormFromJSON} /> */}
			<Drawer.Screen name="Log Out" component={Logout} />
			<Drawer.Screen name="Files" component={Files} />
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

