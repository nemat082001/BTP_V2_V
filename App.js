// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './pages/Login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';
import Form from './pages/Form/Form';
import ViewSurvey from './pages/ViewSurvey/ViewSurvey';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import FormFromJSON from './pages/FillForm/fillForm';
import EditDetailsPage from './pages/Edit_details/Edit_page';
// import Dashboard from './pages/Dashboard/Dashboard';
// import { SafeAreaProvider } from 'react-native-safe-area-context';
const Stack = createStackNavigator();

const App = () => {
  return (
    // <SafeAreaProvider>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Form" component={Form}/>
        <Stack.Screen name="FillForm" component={FormFromJSON}/>
        <Stack.Screen name="EditDetailsPage" component={EditDetailsPage} />
        {/* view survey button to be removed post development, only here for unauthorised access */}
        <Stack.Screen name="ViewSurvey" component={ViewSurvey} options={{headerShown: false}}/>
        {/* <Stack.Screen name="Dashboard" component={Dashboard}/> */}
      </Stack.Navigator>
    </NavigationContainer>
    // </SafeAreaProvider>
  );
};

export default App;