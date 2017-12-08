import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    TouchableOpacity,
    TextInput,
    AsyncStorage
} from 'react-native';

import { DECK_KEY } from '../../utils/helpers';

import { connect } from 'react-redux';
import { getAllDecks } from '../../redux/actions/decks';
import { NavigationActions } from 'react-navigation';

class AddCard extends React.Component {

    state = {
        questionText: '',
        answerText: ''
    }

    handleQuestionChange = (text) => {
        this.setState ({
            questionText: text
        });
    }

    handleAnswerChange = (text) => {
        this.setState ({
            answerText: text
        });
    }

    addCard = () => {
        let questions = this.props.navigation.state.params.deck.questions;

        questions.push({
            question: this.state.questionText,
            answer: this.state.answerText
        });

        AsyncStorage.mergeItem(DECK_KEY, JSON.stringify({
            [this.props.navigation.state.params.deckName]: {
                questions
            }
        })).then(() => {
            this.props.navigation.dispatch(NavigationActions.back())
        }).done();

        AsyncStorage.getItem(DECK_KEY).then((value) => {
            this.props.getAllDecks(JSON.parse(value))
        }).done()
    }
    
    render () {
        const { deck, deckName } = this.props.navigation.state.params;
        return (
            <View style={styles.container}>
                <Text>Question</Text>
                <TextInput style={styles.inputBox} onChangeText={this.handleQuestionChange} value={this.state.questionText}/>

                <Text>Answer</Text>
                <TextInput style={styles.inputBox} onChangeText={this.handleAnswerChange} value={this.state.answerText}/>

                <TouchableOpacity style={styles.addCardbutton} onPress={this.addCard}>
                    <Text>Add Card</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const mapStateToProps = ({decks}) => {
    return {
        decks 
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDecks: (value) => {dispatch(getAllDecks(value))}
    }
}

export default connect (mapStateToProps, mapDispatchToProps) (AddCard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    inputBox: {
        width: 300,
        height: 40,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        marginBottom: 40,
        marginTop: 10,
        padding: 3
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
});