import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Buffer } from 'buffer';
import FileList from './FileList';
import Button from '../Components/Button';
const Files = () => {
	const postUserFiles = async (res, key) => {
		const postUserFileData = {
			fileName: res.assets[0]['name'],
			key: key,
			contentType: res.assets[0]['mimeType'],
			fileDescription: 'user file upload',
			fileCategory: ['general'],
			fileTags: ['general']
		}
		console.log("PostUserData", postUserFileData);
		try {
			const jwtToken = await AsyncStorage.getItem('jwtToken');
			const response = await fetch("http://65.2.70.232/api/upload/postUserFile", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${jwtToken}`,
				},
				body: JSON.stringify(postUserFileData),
			});
			if (response.ok) {
				const data = await response.json();
				console.log(data);
			} else {
				const data = await response.json();
				alert(`Get user files failed: ${data.message}`);
			}
		} catch (e) {
			console.log(e);
		}
	}
	const uploadFile = async (uploadUrl, result, buffer, key) => {
		// console.log(uploadUrl, result);
		const res = await fetch(uploadUrl, {
			method: 'PUT',
			headers: {
				'Content-Type': result.assets[0]['mimeType'],
			},
			body: buffer,
		});
		if (res.ok) {
			console.log(res.json());
			await postUserFiles(result, key);
		} else {
			alert('Post user upload files failed after successful upload of file.');
		}
	}
	const pickFile = async () => {
		let result = await DocumentPicker.getDocumentAsync({
			type: '*/*',
			copyToCacheDirectory: true,
		});
		if (result.canceled) {
			return;
		}
		console.log(result);
		if (result.type === 'success') {
			setFile(result);
		}
		console.log(result.assets[0]);
		const fileEncoded = await FileSystem.readAsStringAsync(result.assets[0].uri, {
			encoding: FileSystem.EncodingType.Base64,
		});

		const buffer = Buffer.from(fileEncoded, 'base64');
		const fileData = {
			contentType: result.assets[0]['mimeType'],
			fileName: result.assets[0]['name'],
		};
		console.log(fileData);
		try {
			const jwtToken = await AsyncStorage.getItem('jwtToken');
			const response = await fetch("http://65.2.70.232/api/upload/s3Url", {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					'Authorization': `Bearer ${jwtToken}`,
				},
				body: JSON.stringify(fileData),
			});

			if (response.ok) {
				const data = await response.json();
				const uploadUrl = data.uploadURL;
				const getKey = data.key;
				// console.log(data);
				await uploadFile(uploadUrl, result, buffer, getKey);
			} else {
				const data = await response.json();
				alert(`File upload failed: ${data.message}`);
			}
		} catch (error) {
			console.error('Error occurred while uploading file:', error);
			alert('An error occurred while uploading file. Please try again later.');
		}
	};
	return (
		<>
			<View style={{
				alignItems: 'flex-end',
				marginRight: 20,
				marginTop: 20,
			}}>
				{/* <Button title="Upload File" onPress={pickFile} /> */}
				<Button
					onPress={pickFile}
					textStyle={styles.buttonText}
					buttonStyle={styles.button}
				>
					<Text>Upload File</Text>
				</Button>
			</View>
			<FileList />
		</>
	);
}

const styles = StyleSheet.create({
	button: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 5,
		backgroundColor: 'rgb(80, 99, 301)',
		paddingTop: 10,
		paddingBottom: 10,
		paddingLeft: 20,
		paddingRight: 20,
	},
	buttonText: {
		color: '#fff',
		fontSize: 16,
		textAlign: 'center'
	},
});
export default Files;
