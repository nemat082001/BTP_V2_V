import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { useNavigation } from '@react-navigation/native';
import ProfilePhoto from './Profile_Image';

const EditDetailsPage = () => {
  const navigation = useNavigation();
  const [editingMode, setEditingMode] = useState(false);
  const [name, setName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phoneNumber, setPhoneNumber] = useState('123-456-7890');
  const [address, setAddress] = useState('123 Main St');
  const [college, setCollege] = useState('XYZ College');
  const [projectName, setProjectName] = useState('Awesome Project');
  const [supervisorName, setSupervisorName] = useState('Dr. Smith');
  const [profilePhotoUri, setProfilePhotoUri] = useState('https://imgs.search.brave.com/KbBaRy8tZA5ORaDygj3xB33SIEqaCbrKi68POUAT-Is/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS1waG90by9w/b3J0cmFpdC1oaXNw/YW5pYy1jb2xsZWdl/LXN0dWRlbnQtY2Fy/cnlpbmctYmFja3Bh/Y2stc3RhbmRpbmct/c2Nob29sLWhhbGx3/YXlfNjYyMjUxLTEx/MDkuanBnP3NpemU9/NjI2JmV4dD1qcGc');

  const handleSave = () => {
    // Prepare the data to send to the backend
    const updatedProfile = { name, email, phoneNumber, address, college, projectName, supervisorName, profilePhotoUri };

    // Send a POST request to your backend API
    fetch('https://your-backend.com/api/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You might need to include authentication headers if required by your backend
      },
      body: JSON.stringify(updatedProfile),
    })
    .then(response => {
      if (response.ok) {
        console.log('Profile updated successfully!');
        // Handle any further actions after successful update
      } else {
        console.error('Failed to update profile:', response.statusText);
        // Handle errors
      }
    })
    .catch(error => {
      console.error('Error updating profile:', error);
      // Handle errors
    });

    setEditingMode(false);
  };

  const handleEdit = () => {
    setEditingMode(true);
  };

  const handleImageChange = (newImage) => {
    setProfilePhotoUri(newImage);
  };

  const handleEditPicture = () => {
    // Navigate to the ProfilePage
    navigation.navigate('ProfilePage');
  };

  const renderEditableField = (label, value, stateSetter) => {
    return (
      <View style={styles.section}>
        <Text style={styles.label}>{label}:</Text>
        {editingMode ? (
          <TextInput
            style={styles.input}
            value={value}
            onChangeText={(text) => stateSetter(text)}
          />
        ) : (
          <Text style={styles.value}>{value}</Text>
        )}
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Profile</Text>

      <ProfilePhoto photoUri={profilePhotoUri} onImageChange={handleImageChange} onEditPress={handleEditPicture} />

      {renderEditableField('Name', name, setName)}
      {renderEditableField('Email', email, setEmail)}
      {renderEditableField('Phone Number', phoneNumber, setPhoneNumber)}
      {renderEditableField('Address', address, setAddress)}
      {renderEditableField('College', college, setCollege)}
      {renderEditableField('Project Name', projectName, setProjectName)}
      {renderEditableField('Supervisor Name', supervisorName, setSupervisorName)}

      {editingMode && (
        <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
          <Text>Save</Text>
        </TouchableOpacity>
      )}
      {!editingMode && (
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <Text>Edit</Text>
        </TouchableOpacity>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    justifyContent: 'center',
    backgroundColor: '#a0d2eb',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
  },
  value: {
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  editButton: {
    backgroundColor: '#e0e0e0',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  saveButton: {
    backgroundColor: 'green',
    padding: 8,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 8,
  },
});

export default EditDetailsPage;
