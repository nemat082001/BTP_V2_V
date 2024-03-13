import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const ProfilePhoto = ({ photoUri }) => {
	return (
		<View style={styles.container}>
			<Image source={{ uri: photoUri }} style={styles.profilePhoto} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		marginBottom: 16,
	},
	profilePhoto: {
		width: 150,
		height: 150,
		borderRadius: 75,
	},
});

export default ProfilePhoto;