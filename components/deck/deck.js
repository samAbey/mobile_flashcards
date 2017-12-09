import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { connect } from 'react-redux';

class Deck extends React.Component {

    static navigationOptions = ({navigation}) => ({
        title: navigation.state.params.deckName
    });

    render () {

        const { deckName, deck } = this.props.navigation.state.params;

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
                {deck.questions.length===0
                    ?
                        <Text>No questions available in deck</Text>
                    :
                    <TouchableOpacity style={styles.startbutton} onPress={() => this.props.navigation.navigate(
                        'Quiz',
                        {deck}
                    )}>
                        <Text style={styles.startButtonText}>Start Quiz</Text>
                    </TouchableOpacity>}
            </View>
        )
    }
}

export default connect (({decks})=>({decks}), null)(Deck);

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
