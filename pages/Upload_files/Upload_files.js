import React, { useState } from 'react';
import { View, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

export default function ImageUploadScreen() {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");
  const [imageSelected, setImageSelected] = useState(false); // Track if an image is selected

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.uri);
      setImageSelected(true); // Set imageSelected to true when an image is selected
    }
  };

  const submit = async () => {
    const formData = new FormData();
    formData.append("image", {
      uri: image,
      type: 'image/jpeg',
      name: 'image.jpg',
    });
    formData.append("description", description);

    try {
      const response = await axios.post('http://your-api-endpoint/api/images', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data.imageName);
      // Handle response accordingly
    } catch (error) {
      console.error(error);
      // Handle error accordingly
    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      <Button title="Pick an image from gallery" onPress={pickImage} />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        style={{ borderWidth: 1, borderColor: 'gray', margin: 10, padding: 5, width: 200 }}
      />
      {/* Conditionally render button with different color based on imageSelected */}
      <Button
        title="Submit"
        onPress={submit}
        color={imageSelected ? 'green' : undefined} // Set color to green when imageSelected is true
      />
    </View>
  );
}
