// ViewPage.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet, Touchable } from 'react-native';
import Card from '../Components/Card'; // Import the Card component
import { createDrawerNavigator } from '@react-navigation/drawer';
import Form from '../Form/Form'
import Logout from '../LogOut/Logout'
import FormFromJSON from '../FillForm/fillForm';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Config from 'react-native-config';


const Survey = () => {
  // console.log(Config.BASE_URL);
  const [dataList, setDataList] = useState([]);
  const navigation = useNavigation();
  // Simulated data for demonstration purposes; replace with your actual data source
  const dummyData = [
    {
      title: 'Location 1',
      description: 'Description for Location 1',
      // latitude: '12.345',
      // longitude: '67.890',
      // imageSource: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fswarajyamag.com%2Fpolitics%2Fhow-the-nda-government-has-taken-up-the-cause-of-the-fishermen-of-tamil-nadu&psig=AOvVaw13IfQIPnW3nRYBdYzTNPgk&ust=1699028777967000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjoicjdpYIDFQAAAAAdAAAAABAE',
    },
    {
      title: 'Location 1',
      description: 'Description for Location 1',
      // latitude: '12.345',
      // longitude: '67.890',
      // imageSource: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fswarajyamag.com%2Fpolitics%2Fhow-the-nda-government-has-taken-up-the-cause-of-the-fishermen-of-tamil-nadu&psig=AOvVaw13IfQIPnW3nRYBdYzTNPgk&ust=1699028777967000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjoicjdpYIDFQAAAAAdAAAAABAE',
    }
    // Add more data items as needed
  ];

  // useEffect(() => {
  //   // Simulated data fetching; replace with your data fetching logic
  //   setDataList(dummyData);
  // }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = "http://65.2.70.232/api/survey/getAllSurveys";
        const token = await AsyncStorage.getItem('jwtToken');
        // console.log(token);
        
        await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }).then(response => {
          return response.json();
        }).then((data)=>{
          setDataList(data.data);
          console.log(data);
        })
      }  
      catch(error){
         console.log(error);
      }
    } 
    fetchData();
   },[]);

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
        <Drawer.Screen name="Survey" component={Survey}/>
        {/* <Drawer.Screen name="Home" component={Home}/> */}
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
        <Drawer.Screen name="Form" component={Form} />
        <Drawer.Screen name="FillForm" component={FormFromJSON} />
        <Drawer.Screen name="Log Out" component={Logout}/>
        {/* <Drawer.Screen name="Login" component={Login}/> */}
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

