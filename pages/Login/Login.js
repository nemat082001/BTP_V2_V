// import axios from 'axios';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Config from 'react-native-config';

const Login = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  let status = null;

  // const handleLogin = async () => {
  //   try {
  //    await fetch('https://dog.ceo/api/breeds/list').then((res)=>{
  //        alert(res.ok);
  //     });

  //     if (response.status === 200) {
  //       setIsAuthenticated(true);
  //       navigation.navigate('ViewSurvey');
  //     } else {
  //       setIsAuthenticated(false);
  //       setError('Invalid email or password. Please try again.');
  //     }
  //   } catch (error) {
  //     setIsAuthenticated(false);
  //     setError('An error occurred during login. Please try again.');
  //   }
  // };

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   // alert('button pressed')
  //    await fetch("https://82a5-203-110-242-42.ngrok-free.app/auth/login", {
  //       method: 'POST',
  //       // body: JSON.stringify(data),
  //       headers: {
  //           'Content-Type': 'application/json'
  //       },
        
  //       body: JSON.stringify({ email: 'puma@gmail.com', password: '8627' })
  //   }).then((res)=>{
  //       alert("hi");
  //       console.log(res);
  //   },(err)=>{
  //     alert(err); 
  //    });
  //  // alert( response.text())
  // }

  const handleLogin = async () => {
    // console.log(Config.BASE_URL)
    try {
      console.log(email, password)
       await fetch("http://65.2.70.232/api/auth/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email:email, password:password }) // Use the actual email and password entered by the user
      }).then(response=>{
        console.log(response.ok)
        if(!response.ok){
          throw new Error('erorr', error.message)
        }
        return response.json();
      }).then(async( data)=>{
        await AsyncStorage.setItem("jwtToken", data.token);
        // if (response.status === 200) {
  
          // console.log(response.data.token)
          navigation.navigate('ViewSurvey');
        // } else {
        //   setError('Invalid email or password. Please try again.');
        // }
        console.log(data);
      }).catch((error)=>{
        console.log(error);
      });

      // console.log(response.json());
      
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
    marginTop: 10, // Add some margin to separate it from the "Sign up" link
  },
});

export default Login;