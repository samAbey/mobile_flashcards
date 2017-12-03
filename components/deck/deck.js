import React from 'react';
import { 
    View, 
    Text,
    StyleSheet
} from 'react-native';

class Deck extends React.Component {

    render () {
        return (
            <View style={styles.container}>
                <Text>I am a card: {this.props.navigation.state.params.id}</Text>
            </View>
        )
    }
}

export default Deck;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
