import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import {CheckBox} from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FormFromJSON = () => {
  const { params } = useRoute();
  const { data } = params;
  // console.log(data);
//   const formData = [
//     {"choices": [], "id": 1, "type": "text", "value": "text"},
//     {"choices": ["a", "b", "c"], "id": 2, "newChoice": "", "type": "multipleChoice", "value": "MC"},
//     {"choices": ["op1", "op2", "op3"], "id": 3, "newChoice": "", "type": "checkbox", "value": "CB"}
//   ];



const handleSubmit = async () => {
  try {
    const token = await AsyncStorage.getItem('jwtToken')
    console.log(token)
    await fetch('https://390b-203-110-242-44.ngrok-free.app/survey/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        formResponses
      }),
    }).then(response => {
      if(!response.ok){
        throw new Error(`HTTP error status::${response.status}`);
      }
      return response.json();
    });
  } catch (error) {
    console.error('Error occurred during form submission:', error);
    alert('An error occurred during form submission. Please try again later.');
  }
};



const [formData, setformData] = useState([]);
useEffect(() => {
  const fetchData = async () => {
    try {
      console.log(data._id);
      const apiUrl = `https://44f0-203-110-242-33.ngrok-free.app/survey/${data._id}`;
      const token = await AsyncStorage.getItem('jwtToken');
      console.log(token);
      console.log(apiUrl);
      await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then(response => {
        // console.log(response.json());
        // console.log(response.status)
        return response.json();
      }).then((data)=>{
        console.log(data);
        setformData(data.questions);
        console.log(data);
      })
    }  
    catch(error){
       console.log(error);
    }
  } 
  fetchData();
 },[]);



  const [formResponses, setFormResponses] = useState({});

  const handleTextChange = (question, value) => {
    setFormResponses({ ...formResponses, [question]: value });
  };

//   const handleChoiceChange = (question, choice) => {
//     const selectedChoices = formResponses[question] || [];
//     const updatedChoices = selectedChoices.includes(choice)
//       ? selectedChoices.filter((c) => c !== choice)
//       : [...selectedChoices, choice];

//     setFormResponses({ ...formResponses, [question]: updatedChoices });
//     console.log("updated choice : ",updatedChoices)
//   };
    const [selectedChoice, setSelectedChoice] = useState({});
  const handleChoiceChange = (question, choice) => {
    setSelectedChoice((prevSelectedChoice) => ({
      ...prevSelectedChoice,
      [question]: choice,
    }));
    setFormResponses({ ...formResponses, [question]: selectedChoice });
    console.log("selec ch" , selectedChoice)
};

  const [checkedItems, setCheckedItems] = useState({});
  const handleCheckboxChange = (choice) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [choice]: !prevCheckedItems[option],
    }));
  };

  const renderForm = () => {

          console.log(formData);
    return formData.map((i) => {
        console.log("i value: ", i);
      if (i.type=="text") {
        // case "text":
          return (
            <View key={i._id} style={{ marginBottom: 20 }}>
              <Text>{i.questionString}</Text>
              <TextInput
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
                onChangeText={(text) => handleTextChange(i.value, text)}
                placeholder={`Enter ${i.type}`}
              />
            </View>
          ); 
      
      }
      if (i.type=="multipleChoice") {
        // case "multipleChoice":
          return (
            <View key={i._id} style={{ marginBottom: 20 }}>
              <Text>{i.questionString}</Text>
              {i.options.map((options, index) => (
                <TouchableOpacity key={index} onPress={() => handleChoiceChange(i.value, options)}>
                  <Text>{options}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
              }

    // console.log("i type : ", i.type)

    // if (i.type=="checkbox") {
    //     // case "checkbox":
    //       return (
    //         <View key={i.id} style={{ marginBottom: 20 }}>
    //           <Text>{i.value}</Text>
    //           {i.choices.map((choice, index) => (
    //             <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
    //               {/* <CheckBox
    //                 value={}
    //                 onValueChange={}
    //               /> */}
    //               <CheckBox
    //         title={choice}
    //         checked={checkedItems[choice] || false}
    //         onPress={() => handleCheckboxChange(choice)}
    //       />
    //             {/* <Text>Checked items: {JSON.stringify(checkedItems)}</Text> */}

    //               <Text>{choice}</Text>
    //             </View>
    //           ))}
    //         </View>
    //       );
    //           }
    //     // default:
    //       return null;
            
    })
}

  return (
    <View>
    <ScrollView style={{ padding: 20 }}>
      {renderForm()}
      <TouchableOpacity onPress={() => console.log('Form Responses:', formResponses)} style={{ marginTop: 20, padding: 10, backgroundColor: 'green', alignItems: 'center', borderRadius: 5 }}>
        <Text style={{ fontSize: 16, color: 'white' }}>Submit Form</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

export default FormFromJSON;
