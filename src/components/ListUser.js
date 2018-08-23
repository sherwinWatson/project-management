import React from 'react';
import { View } from 'react-native';
import { List, Thumbnail } from 'native-base';

const getThumbnail = (data) => {
	return data.imageUrl
		? { uri: data.imageUrl }
		: require('./../img/no_avatar.png')
}

const renderSelectedListItem = (data) => {
	const { contentStyle, thumbnailStyle } = data;

	return (
		<View style={contentStyle}>
			<Thumbnail style={thumbnailStyle} source={getThumbnail(data)} />
			<Text style={thumbnailStyle}>{data.name}</Text>
		</View>
	)
} 

const ListUser = (data) => {
	const { containerStyle } = styles;
	console.log('list user component');
	console.log(data);

	return (
		<View style={containerStyle}>
			<List
				horizontal={true}
				dataArray={data.users.data}
				renderRow={renderSelectedListItem}
			/>
		</View>
	)
}

const styles = {
	containerStyle: {
		flexDirection: 'row',
		marginRight: margin.s4
	},
	contentStyle: {
		margin: margin.s12, 
		alignItems: 'center'
	},
	thumbnailStyle: {
		width: 50,
		height: 50
	}, 
	textStyle: {
		marginTop: margin.s4
	}
}

export default ListUser;