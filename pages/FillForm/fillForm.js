import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import { useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
const FormFromJSON = ({ navigation }) => {
	const { params } = useRoute();
	const { data } = params;
	const [formData, setformData] = useState([]);
	const [formResponses, setFormResponses] = useState({});
	const [selectedChoice, setSelectedChoice] = useState({});
	const [checkedItems, setCheckedItems] = useState({});
	const [submitted, setSubmitted] = useState(false);
	const handleSubmit = async (formResponses) => {
		try {
			let answers = []
			for (const val in formResponses) {
				if (formResponses[val] instanceof Array) {
					answers.push({
						questionId: val,
						answerArray: formResponses[val]
					})
				}
				else {
					answers.push({
						questionId: val,
						answerString: formResponses[val]
					})
				}
			}
			const token = await AsyncStorage.getItem('jwtToken')
			await fetch(`http://65.2.70.232/api/survey/response/${data._id}`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
				body: JSON.stringify({
					answers
				}),
			}).then(response => {
				if (!response.ok) {
					throw new Error(`HTTP error status::${response.status}`);
				}
				alert('Form submitted successfully');
				console.log("Submitted Response: ", response)
				setFormResponses({});
				setCheckedItems({});
				setSelectedChoice({});
				navigation.navigate("Survey")
				return response.json();
			});
		} catch (error) {
			console.error('Error occurred during form submission:', error);
			alert('An error occurred during form submission. Please try again later.');
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const apiUrl = `http://65.2.70.232/api/survey/${data._id}`;
				const token = await AsyncStorage.getItem('jwtToken');
				await fetch(apiUrl, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
						'Authorization': `Bearer ${token}`
					},
				}).then(response => {
					return response.json();
				}).then((data) => {
					setformData(data.questions);
				})
			}
			catch (error) {
				console.log(error);
			}
		}
		fetchData();
	}, []);

	const handleTextChange = (question, value) => {
		formResponses[question._id] = value;
		setFormResponses({ ...formResponses });
	};
	const handleChoiceChange = (question, choice) => {
		selectedChoice[question._id] = choice;
		formResponses[question._id] = choice;
		setFormResponses({ ...formResponses });
	};

	const handleCheckboxChange = (i, choice) => {
		const selectedChoices = formResponses[i._id] || [];
		if (formResponses[i._id] && formResponses[i._id].includes(choice)) {
			formResponses[i._id] = formResponses[i._id].filter((c) => c !== choice);
		}
		else {
			formResponses[i._id] = [...selectedChoices, choice];
		}
		setCheckedItems(formResponses[i._id] || []);
		setFormResponses(formResponses);
	};

	const renderForm = () => {
		return formData.map((i) => {
			if (i.type == "text") {
				return (
					<View key={i._id} style={{ marginBottom: 20 }}>
						<Text style={styles.questionText}>{i.questionString}</Text>
						<TextInput
							style={{ borderWidth: 0.5, padding: 8, marginBottom: 10, borderRadius: 5 }}
							onChangeText={(text) => handleTextChange(i, text)}
							placeholder={`Enter ${i.type}`}
						/>
					</View>
				);

			}
			if (i.type == "multipleChoice") {
				return (
					<View key={i._id} style={{ marginBottom: 20 }}>
						<Text style={styles.questionText}>{i.questionString}</Text>
						{i.options.map((options, index) => (
							<TouchableOpacity key={index} onPress={() => handleChoiceChange(i, options)}>
								<View style={styles.choiceContainer}>
									<View style={[{ borderColor: selectedChoice[i._id] === options ? 'green' : 'gray' }, styles.multipleChoice]}>
										{selectedChoice[i._id] === options && <View style={styles.multipleChoiceDot} />}
									</View>
									<Text
										style={[{
											color: selectedChoice[i._id] === options ? 'green' : 'black',
											marginLeft: 10,
										}, styles.optionText]}>{options}</Text>
								</View>
							</TouchableOpacity>
						))}
					</View>
				);
			}

			if (i.type == "checkbox") {
				return (
					<View key={i._id} style={{ marginBottom: 20 }}>
						<Text style={styles.questionText}>{i.questionString}</Text>
						{i.options.map((choice, index) => (
							<View key={index} style={styles.choiceContainer}>
								<TouchableOpacity
									onPress={() => handleCheckboxChange(i, choice)}>
									<View style={styles.choiceContainer}>
										<View style={[{ borderColor: formResponses[i._id] && formResponses[i._id].includes(choice) ? 'green' : 'gray', }, styles.checkBox]}>
											{formResponses[i._id] && formResponses[i._id].includes(choice) && <View style={styles.checkBoxDots} />}
										</View>
										<Text style={[{
											color: formResponses[i._id] && formResponses[i._id].includes(choice) ? 'green' : 'black',
											marginLeft: 10,
										}, styles.optionText]}>{choice}</Text>
									</View>
								</TouchableOpacity>
							</View>
						))}
					</View>
				);
			}
			return null;
		})
	}
	const handleDelete = async (data) => {
		console.log("Deleted Survey: ", data)
		try {
			const apiUrl = `http://65.2.70.232/api/survey/${data._id}`;
			const token = await AsyncStorage.getItem('jwtToken');
			await fetch(apiUrl, {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${token}`
				},
			}).then(response => {
				return response.json();
			}).then((res) => {
				alert('Survey deleted');
				navigation.navigate("Survey")
			})
		}
		catch (error) {
			console.log(error);
		}
	}
	return (
		<View>
			<ScrollView style={{ padding: 20 }}>
				<TouchableOpacity onPress={() => handleDelete(data)}>
					<Text style={{ color: 'red', marginBottom: 10 }}>Delete Survey</Text>
				</TouchableOpacity>
				{renderForm()}
				<TouchableOpacity TouchableOpacity onPress={() => handleSubmit(formResponses)} style={{ marginTop: 20, padding: 10, backgroundColor: 'green', alignItems: 'center', borderRadius: 5 }}>
					<Text style={{ fontSize: 16, color: 'white' }}>Submit Form</Text>
				</TouchableOpacity>
			</ScrollView>
		</View >
	);
};

const styles = {
	questionText: {
		fontSize: 20,
		marginBottom: 10,
	},
	optionText: {
		fontSize: 16,
	},
	choiceContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 5
	},
	multipleChoice: {
		width: 16,
		height: 16,
		borderRadius: 8,
		borderWidth: 0.5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	multipleChoiceDot: {
		width: 8,
		height: 8,
		backgroundColor: 'green',
		borderRadius: 6
	},
	checkBox: {
		width: 16,
		height: 16,
		borderRadius: 2,
		borderWidth: 0.5,
		justifyContent: 'center',
		alignItems: 'center'
	},
	checkBoxDots: {
		width: 8,
		height: 8,
		backgroundColor: 'green',
		borderRadius: 2
	},
};
export default FormFromJSON;
