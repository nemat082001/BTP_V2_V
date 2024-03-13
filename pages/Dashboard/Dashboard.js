import * as React from 'react';
import { Button, View } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Form from './pages/Form/Form'
import ViewSurvey from './pages/ViewSurvey/ViewSurvey'
import Logout from './pages/LogOut/Logout';
import Login from './pages/Login/Login'
import Home from './pages/Home/Home';
import EditDetailsPage from '../Edit_details/Edit_page';
import Edit_page from '../Edit_details/Edit_page';


function HomeScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button
        onPress={() => navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    </View>
  );
}

function NotificationsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
}

const Drawer = createDrawerNavigator();
export default function Dashboard() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={Home}/>
        <Drawer.Screen name="Notifications" component={NotificationsScreen} />
        <Drawer.Screen name="Form" component={Form} />
        <Drawer.Screen name="View Survey" component={ViewSurvey}/>
        <Drawer.Screen name="Edit Page" component={Edit_page}/>
        <Drawer.Screen name="Log Out" component={Logout}/>
        {/* <Drawer.Screen name="Login" component={Login}/> */}
      </Drawer.Navigator>
      {/* <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
        </Stack.Navigator> */}
    </NavigationContainer>
  );
}