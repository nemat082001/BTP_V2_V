// ViewPage.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Card from '../Components/Card'; // Import the Card component
import { createDrawerNavigator } from '@react-navigation/drawer';
import Form from '../Form/Form'
import Logout from '../LogOut/Logout'
import EditDetailsPage from '../Edit_details/Edit_page';
import ImageUploadScreen from '../Upload_files/Upload_files';


const Survey = () => {
  const [dataList, setDataList] = useState([]);

  // Simulated data for demonstration purposes; replace with your actual data source
  const dummyData = [
    {
      name: 'Location 1',
      description: 'Description for Location 1',
      latitude: '12.345',
      longitude: '67.890',
      imageSource: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fswarajyamag.com%2Fpolitics%2Fhow-the-nda-government-has-taken-up-the-cause-of-the-fishermen-of-tamil-nadu&psig=AOvVaw13IfQIPnW3nRYBdYzTNPgk&ust=1699028777967000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPjoicjdpYIDFQAAAAAdAAAAABAE',
    },
    {
        name: 'Location 1',
        description: 'Description for Location 1',
        latitude: '12.345',
        longitude: '67.890',
        imageSource: 'https://amazon.jobs/content/_next/image?url=https%3A%2F%2Fstatic.jobs.production.amazon-jobs.brightspot.cloud%2F97%2F83%2Fb19e9f994d2b8869c0388279e408%2Fsp-amer-arlington-img-9507.jpg&w=3840&q=75',
      },
      {
        name: 'Location 1',
        description: 'Description for Location 1',
        latitude: '12.345',
        longitude: '67.890',
        imageSource: 'https://amazon.jobs/content/_next/image?url=https%3A%2F%2Fstatic.jobs.production.amazon-jobs.brightspot.cloud%2F97%2F83%2Fb19e9f994d2b8869c0388279e408%2Fsp-amer-arlington-img-9507.jpg&w=3840&q=75',
      },
      {
        name: 'Location 1',
        description: 'Description for Location 1',
        latitude: '12.345',
        longitude: '67.890',
        imageSource: 'https://amazon.jobs/content/_next/image?url=https%3A%2F%2Fstatic.jobs.production.amazon-jobs.brightspot.cloud%2F97%2F83%2Fb19e9f994d2b8869c0388279e408%2Fsp-amer-arlington-img-9507.jpg&w=3840&q=75',
      },
      {
        name: 'Location 1',
        description: 'Description for Location 1',
        latitude: '12.345',
        longitude: '67.890',
        imageSource: 'https://amazon.jobs/content/_next/image?url=https%3A%2F%2Fstatic.jobs.production.amazon-jobs.brightspot.cloud%2F97%2F83%2Fb19e9f994d2b8869c0388279e408%2Fsp-amer-arlington-img-9507.jpg&w=3840&q=75',
      },
      {
        name: 'Location 1',
        description: 'Description for Location 1',
        latitude: '12.345',
        longitude: '67.890',
        imageSource: 'https://amazon.jobs/content/_next/image?url=https%3A%2F%2Fstatic.jobs.production.amazon-jobs.brightspot.cloud%2F97%2F83%2Fb19e9f994d2b8869c0388279e408%2Fsp-amer-arlington-img-9507.jpg&w=3840&q=75',
      },
      {
        name: 'Location 1',
        description: 'Description for Location 1',
        latitude: '12.345',
        longitude: '67.890',
        imageSource: 'https://amazon.jobs/content/_next/image?url=https%3A%2F%2Fstatic.jobs.production.amazon-jobs.brightspot.cloud%2F97%2F83%2Fb19e9f994d2b8869c0388279e408%2Fsp-amer-arlington-img-9507.jpg&w=3840&q=75',
      },
      {
        name: 'Location 1',
        description: 'Description for Location 1',
        latitude: '12.345',
        longitude: '67.890',
        imageSource: 'https://amazon.jobs/content/_next/image?url=https%3A%2F%2Fstatic.jobs.production.amazon-jobs.brightspot.cloud%2F97%2F83%2Fb19e9f994d2b8869c0388279e408%2Fsp-amer-arlington-img-9507.jpg&w=3840&q=75',
      },
    // Add more data items as needed
  ];

  useEffect(() => {
    // Simulated data fetching; replace with your data fetching logic
    setDataList(dummyData);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={dataList}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Card data={item} />}
      />
    </View>
  );
};


const Drawer = createDrawerNavigator();
const ViewSurvey = () => {
  return (
      <Drawer.Navigator initialRouteName="Survey">
         <Drawer.Screen name="Profile" component={EditDetailsPage}/>
        <Drawer.Screen name="Survey" component={Survey}/>
        <Drawer.Screen name="File"component={ImageUploadScreen}/>
        {/* <Drawer.Screen name="Home" component={Home}/> */}
        {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
        <Drawer.Screen name="Form" component={Form} />
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
