import React from 'react';
import { View, Text } from 'react-native';

class Card extends React.Component {

    render () {
        return (
            <View>
                <Text>I am a card: {this.props.navigation.state.params.id}</Text>
            </View>
        )
    }
}

export default Card;
