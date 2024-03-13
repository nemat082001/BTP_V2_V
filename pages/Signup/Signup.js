import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
const Signup = () => {
	const navigation = useNavigation();
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [name, setName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [organisation, setOrganisation] = useState('');
	const [role, setRole] = useState('public');
	const roles = ['Public', 'Admin', 'Faculty', 'Student', 'NGO Partner', 'Beneficiary']
	const handleSignup = async () => {
		if (password !== confirmPassword) {
			alert('Passwords do not match. Please try again.');
			return;
		}

		const userData = {
			name,
			email,
			password,
			confirmPassword,
			university: organisation,
			role,
			mobileNumber: phoneNumber,
		};
		console.log(userData);
		try {
			const response = await fetch("http://65.2.70.232/api/auth/signup", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(userData),
			});

			if (response.ok) {
				alert('Registration successful! You can now log in.');
				navigation.navigate('Login');
			} else {
				const data = await response.json();
				alert(`Registration failed: ${data.message}`);
			}
		} catch (error) {
			console.error('Error occurred during registration:', error);
			alert('An error occurred during registration. Please try again later.');
		}
	};

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Signup</Text>
			<TextInput
				style={styles.input}
				placeholder="Name"
				onChangeText={(text) => setName(text)}
				value={name}
			/>
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
			<TextInput
				style={styles.input}
				placeholder="Confirm Password"
				secureTextEntry
				onChangeText={(text) => setConfirmPassword(text)}
				value={confirmPassword}
			/>
			<TextInput
				style={styles.input}
				placeholder="Phone Number"
				onChangeText={(text) => setPhoneNumber(text)}
				value={phoneNumber}
			/>
			<TextInput
				style={styles.input}
				placeholder="Organisation"
				onChangeText={(text) => setOrganisation(text)}
				value={organisation}
			/>
			<View style={{
				flexDirection: 'row',
				justifyContent: 'space-between',
				alignItems: 'centre',
				width: '80%',
				height: 40,
				borderColor: 'gray',
				borderWidth: 1,
				marginBottom: 10,
				paddingLeft: 10,
			}}>
				<Text style={{ fontSize: 16, alignSelf: 'center', justifyContent: 'center' }}>Role</Text>
				<Picker
					selectedValue={role}
					onValueChange={(itemValue) => setRole(itemValue)}
					style={{ width: 150, justifyContent: 'center', alignSelf: 'center' }}
				>
					{roles.map((role) => (
						<Picker.Item key={role} label={role} value={role} />
					))}
				</Picker>
			</View>
			<Button title="Signup" onPress={handleSignup} />
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
});

export default Signup;
