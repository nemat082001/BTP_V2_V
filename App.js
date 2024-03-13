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
import EditDetailsPage from './pages/Edit_details/Edit_page';
import SurveyPage from './pages/Survey/SurveyPage.js';
import FormFromJSON from './pages/Fill_form/FormFromJSON.js';
import ImageUploadScreen from './pages/Upload_files/Upload_files.js';
// Remove ProfilePhoto if it's not meant to be a screen
// import ProfilePhoto from './pages/Edit_details/Profile_Image';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Form" component={Form}/>
        <Stack.Screen name="EditDetailsPage" component={EditDetailsPage} />
        <Stack.Screen name="SurveyPage" component={SurveyPage} />
        <Stack.Screen name="FormFromJSON" component={FormFromJSON} />
        <Stack.Screen name="Files" component={ImageUploadScreen} />
        {/* If ProfilePhoto is not a screen, remove this line */}
        {/* <Stack.Screen name="ProfilePage" component={ProfilePhoto} /> */}
        {/* view survey button to be removed post development, only here for unauthorised access */}
        <Stack.Screen name="ViewSurvey" component={ViewSurvey} options={{headerShown: false}}/>
        {/* <Stack.Screen name="Dashboard" component={Dashboard}/> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
