import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
// import DocumentPicker from 'react-native-document-picker';

const Files = () => {
	const [selectedFile, setSelectedFile] = useState(null);
	const pickFile = async () => {
		try {
			const res = await DocumentPicker.pick({
				type: [DocumentPicker.types.allFiles],
			});

			console.log(
				'URI : ' + res.uri,
				'Type : ' + res.type,
				'File Name : ' + res.name,
				'File Size : ' + res.size
			);
			setSelectedFile(res);
		} catch (err) {
			if (DocumentPicker.isCancel(err)) {
				console.log('User cancelled the picker');
			} else {
				console.log('Error occurred:', err);
			}
		}
	};

	return (
		<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Button title="Pick a file" onPress={pickFile} />
			{selectedFile && (
				<View style={{ marginTop: 20 }}>
					<Text>Selected File:</Text>
					<Text>URI: {selectedFile.uri}</Text>
					<Text>Type: {selectedFile.type}</Text>
					<Text>Name: {selectedFile.name}</Text>
					<Text>Size: {selectedFile.size} bytes</Text>
				</View>
			)}
		</View>
	);
};

export default Files;
