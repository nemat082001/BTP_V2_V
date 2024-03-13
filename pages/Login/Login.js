import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const handleLogin = async () => {
		try {
			console.log(email, password)
			await fetch("http://65.2.70.232/api/auth/login", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({ email: email, password: password })
			}).then(response => {
				console.log(response.ok)
				if (!response.ok) {
					throw new Error('erorr', error.message)
				}
				return response.json();
			}).then(async (data) => {
				await AsyncStorage.setItem("jwtToken", data.token);
				navigation.navigate('ViewSurvey');
				console.log(data);
			}).catch((error) => {
				console.log(error);
			});
		} catch (error) {
			setError('An error occurred during login. Please try again.');
		}
	}
	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Login</Text>
			<TextInput
				style={styles.input}
				placeholder="Email"
				onChangeText={(text) => setEmail(text)}
				value={email}
			/>
			<TextInput
				style={styles.input}
				placeholder="Password"
				secureTextEntry
				onChangeText={(text) => setPassword(text)}
				value={password}
			/>
			<Button title="Login" onPress={handleLogin} />
			<Text style={styles.signupText}>
				Don't have an account?{' '}
				<Text style={styles.signupLink} onPress={() => navigation.navigate('Signup')}>
					Sign up
				</Text>
			</Text>
			<Text style={styles.forgotPasswordLink} onPress={() => navigation.navigate('ForgotPassword')}>
				Forgot Password?
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	heading: {
		fontSize: 24,
		marginBottom: 20,
	},
	input: {
		width: '80%',
		height: 40,
		borderColor: 'gray',
		borderWidth: 1,
		marginBottom: 10,
		paddingLeft: 10,
	},
	signupText: {
		fontSize: 16,
		textAlign: 'center',
	},
	signupLink: {
		fontWeight: 'bold',
		color: 'blue',
	},
	forgotPasswordLink: {
		fontWeight: 'bold',
		color: 'blue',
		marginTop: 10,
	},
});

export default Login;