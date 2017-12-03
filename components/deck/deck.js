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
                <Text style={styles.deckTitle}>{deckName}</Text>
                <Text>{deck.questions.length} Cards</Text>
                <TouchableOpacity 
                    style={styles.addCardbutton}
                    onPress={() => this.props.navigation.navigate(
                        'AddCard',
                        {deck, deckName}
                    )}
                >
                    <Text>Add Card</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.startbutton}>
                    <Text style={styles.startButtonText}>Start Quiz</Text>
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
    },
    addCardbutton: {
        backgroundColor: '#DDDDDD',
        paddingTop: 20,
        paddingRight: 50,
        paddingBottom: 20,
        paddingLeft: 50,
        marginTop: 40,
        marginBottom: 10
    },
    startbutton: {
        backgroundColor: '#1c262f',
        paddingTop: 20,
        paddingRight: 50,
        paddingBottom: 20,
        paddingLeft: 50,
        marginTop: 10,
        marginBottom: 10
    },
    startButtonText: {
        color: '#fff'
    },
    deckTitle: {
        fontSize: 32,
        fontWeight: 'bold'
    }
})
