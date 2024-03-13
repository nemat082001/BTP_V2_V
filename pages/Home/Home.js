import React from 'react';
import { View, Text, Button, ImageBackground, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<ImageBackground source={require('./background.gif')} style={styles.backgroundImage}>
				<View style={styles.container}>
					<Text style={styles.title}>Vulnerability to Viability Global Partnership</Text>
					<Text style={styles.subtitle}>
						V2V is a transdisciplinary global partnership and knowledge network
						with members from Africa, Asia, Canada, and Internationally. Our aim is to
						support small-scale fishers in their transition from vulnerability to viability.
					</Text>
					<Button title="Learn more" onPress={() => alert('Learn more button clicked')} />
				</View>
				<View style={styles.signupButtonContainer}>
					<Button title="Login" onPress={() => navigation.navigate('Login')} />
				</View>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	backgroundImage: {
		position: 'absolute',
		top: 0,
		left: 0,
		width: '100%',
		height: '100%',
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		margin: 20,
	},
	subtitle: {
		fontSize: 16,
		textAlign: 'center',
		margin: 20,
	},
	signupButtonContainer: {
		position: 'absolute',
		top: 20,
		right: 20,
	},
});

export default Home;
