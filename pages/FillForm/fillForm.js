import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
// import Checkbox from '@react-native-community/checkbox';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { check } from 'react-native-permissions';

const FormFromJSON = () => {
  const { params } = useRoute();
  const { data } = params;
  // console.log("data from form fill", data); ;
//   const formData = [
//     {"choices": [], "id": 1, "type": "text", "value": "text"},
//     {"choices": ["a", "b", "c"], "id": 2, "newChoice": "", "type": "multipleChoice", "value": "MC"},
//     {"choices": ["op1", "op2", "op3"], "id": 3, "newChoice": "", "type": "checkbox", "value": "CB"}
//   ];



const handleSubmit = async (formResponses) => {
  try {
    let answers =  []
    for (const val in formResponses){
      console.log("SUbmitting Value", val)
      answers.push({
        questionId: val,
        answerString: formResponses[val]
      })
    }
    const token = await AsyncStorage.getItem('jwtToken')
    console.log(token)
    await fetch('http://65.2.70.232/api/survey/', {
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
      const apiUrl = `http://65.2.70.232/api/survey/${data._id}`;
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
        console.log(formData);
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
    formResponses[question._id] = value;
    setFormResponses({ ...formResponses });
    console.log("text change: ", formResponses);
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
	// const handleChoiceChange = (question, choice) => {
	// 	setSelectedChoice((prevSelectedChoice) => ({
	// 	...prevSelectedChoice,
	// 	[question]: choice,
	// 	}));
	// 	setFormResponses({ ...formResponses, [question]: selectedChoice });
	// 	console.log("selec ch" , selectedChoice)
	// };

	const [checkedItems, setCheckedItems] = useState({});
	// const handleCheckboxChange = (choice) => {
	// 	setCheckedItems((prevCheckedItems) => ({
	// 	...prevCheckedItems,
	// 	[choice]: !prevCheckedItems[choice],
	// 	}));
	// };

  const handleChoiceChange = (question, choice) => {
    // console.log(selectedChoice,question,choice)
    selectedChoice[question._id] = choice;
    formResponses[question._id] = choice;
    setFormResponses({ ...formResponses });
    console.log("choiceChnage: ", formResponses);
    // console.log("choiceChnage: ", formResponses);
};

  const handleCheckboxChange = (i, choice) => {
    const selectedChoices = formResponses[i._id] || [];
    if (formResponses[i._id] && formResponses[i._id].includes(choice)) {
      formResponses[i._id] = formResponses[i._id].filter((c) => c !== choice);
    }
    else{
      formResponses[i._id] = [...selectedChoices, choice];
    }
    console.log("selectedChoices: ", formResponses);
    setCheckedItems(formResponses[i._id] || []);
    // console.log("checkedItems: ", checkedItems);
    setFormResponses(formResponses);
    // console.log("response: ", formResponses);
  };

  const renderForm = () => {
    return formData.map((i) => {
      // console.log("i value: ", i);
      if (i.type=="text") {
        // case "text":
          return (
            <View key={i._id} style={{ marginBottom: 20 }}>
              <Text>{i.questionString}</Text>
              <TextInput
                style={{ borderWidth: 1, padding: 8, marginBottom: 10 }}
                onChangeText={(text) => handleTextChange(i, text)}
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
                <TouchableOpacity key={index} onPress={() => handleChoiceChange(i, options)}
                >
                  <Text style={{ color: selectedChoice[i._id] === options ? 'green' : 'black' }}>{options}</Text>
                </TouchableOpacity>
              ))}
            </View>
          );
              }

    if (i.type=="checkbox") {
        // case "checkbox":
          return (
            <View key={i._id} style={{ marginBottom: 20 }}>
              <Text>{i.questionString}</Text>
              {i.options.map((choice, index) => (
                <View key={index} style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
                  <TouchableOpacity
                    onPress={()=>handleCheckboxChange(i, choice)}>
                    <Text style={{
                      color: formResponses[i._id] && formResponses[i._id].includes(choice) ? 'green' : 'black',
                    
                    }}>{choice}</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          );
          }
          return null; 
    })
}

  return (
    <View>
    <ScrollView style={{ padding: 20 }}>
      {renderForm()}
      <TouchableOpacity onPress={() => handleSubmit(formResponses)} style={{ marginTop: 20, padding: 10, backgroundColor: 'green', alignItems: 'center', borderRadius: 5 }}>
        <Text style={{ fontSize: 16, color: 'white' }}>Submit Form</Text>
      </TouchableOpacity>
    </ScrollView>
    </View>
  );
};

export default FormFromJSON;
