import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet} from 'react-native';
import { useNavigation } from '@react-navigation/native';
// import Config from 'react-native-config';

const Signup = () => {
  const navigation = useNavigation(); // Access the navigation object
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setuserName] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('Passwords do not match. Please try again.');
      return;
    }
  
    const userData = {
      userName,
      email,
      password,
    };
    
    // console.log(Config.BASE_URL)
    try {
      const response = await fetch("65.2.70.232/api/auth/signup", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        // Registration was successful
        // const { token } = await response.json();
        // // Save the JWT token securely using AsyncStorage
        // await AsyncStorage.setItem('authToken', token);
        alert('Registration successful! You can now log in.');
        
        navigation.navigate('Login'); // Navigate to the login screen
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
        placeholder="userName"
        onChangeText={(text) => setuserName(text)}
        value={userName}
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
