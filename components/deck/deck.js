import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

class Deck extends React.Component {

    

    render () {

        const { deck, deckName } = this.props.navigation.state.params;

        return (
            <View style={styles.container}>
                <Text>{deckName}</Text>
                <Text>{deck.questions.length} Cards</Text>
                <TouchableOpacity>
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text>Start Quiz</Text>
                </TouchableOpacity>
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
