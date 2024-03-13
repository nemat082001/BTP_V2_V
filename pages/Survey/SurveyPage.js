import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as FileSystem from 'expo-file-system';


const SurveyPage = () => {
  const [surveyData, setSurveyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [fileUri, setFileUri] = useState(null);

  useEffect(() => {
    fetchSurveyData();
  }, []);

  const fetchSurveyData = async () => {
    const response = await fetch('https://example.com/api/surveys/123');
    const data = await response.json();
    setSurveyData(data);
    setLoading(false);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex(currentQuestionIndex + 1);
  };

  const handleFileUpload = async () => {
    const file = await FileSystem.pickDocumentAsync();
    setFileUri(file.uri);
  };

  const renderQuestion = () => {
    if (loading) {
      return <Text>Loading...</Text>;
    }

    const currentQuestion = surveyData.questions[currentQuestionIndex];

    switch (currentQuestion.type) {
      case 'multipleChoice':
        return (
          <View>
            <Text>{currentQuestion.question}</Text>
            {currentQuestion.options.map((option, index) => (
              <Button key={index} title={option} onPress={() => {}} />
            ))}
          </View>
        );
      case 'singleChoice':
        return (
          <View>
            <Text>{currentQuestion.question}</Text>
            {currentQuestion.options.map((option, index) => (
              <Button key={index} title={option} onPress={() => {}} />
            ))}
          </View>
        );
      case 'textInput':
        return (
          <View>
            <Text>{currentQuestion.question}</Text>
            <TextInput />
          </View>
        );
      case 'fileUpload':
        return (
          <View>
            <Text>{currentQuestion.question}</Text>
            <Button title="Upload File" onPress={handleFileUpload} />
            {fileUri && <Text>File uploaded: {fileUri}</Text>}
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {renderQuestion()}
      <Button title="Next" onPress={handleNextQuestion} />
    </View>
  );
};

export default SurveyPage;
