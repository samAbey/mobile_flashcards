import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Card from './card';
import { clearLocalNotification,setLocalNotification } from '../../utils/helpers';
import { NavigationActions } from 'react-navigation';

class Quiz extends React.Component {

    constructor (props) {
        super (props);

        this.state = {
            questions: props.navigation.state.params.deck.questions,
            currentQuestion: props.navigation.state.params.deck.questions[0],
            currentQuestionIndex: 0,
            score: 0,
            showScore: false
        }
    }

    static navigationOptions = ({navigation}) => ({
        title: 'Quiz'
    });

    nextQuestion = (answer) => {
        if (this.state.currentQuestionIndex < this.state.questions.length-1) {
            this.setState((state) => ({
                currentQuestion: state.questions[state.currentQuestionIndex+1],
                currentQuestionIndex:  state.currentQuestionIndex + 1
            }));
        } else {
            this.setState({
                showScore: true
            });
            clearLocalNotification ().then(setLocalNotification());
        }
        if (answer) {
            this.setState(state=>({
                score: state.score + 1
            }))
        }

    }

    startOver = () => {
        this.setState({
            questions: this.props.navigation.state.params.deck.questions,
            currentQuestion: this.props.navigation.state.params.deck.questions[0],
            currentQuestionIndex: 0,
            score: 0,
            showScore: false
        })
    }

    render () {

        const {deck} = this.props.navigation.state.params;
        
        return (
            !this.state.showScore?<View style={styles.container}>

                <Text style={styles.numberOfCards}>Card {this.state.currentQuestionIndex+1} of {this.state.questions.length}</Text>
                <Card nextQuestion={this.nextQuestion} question={this.state.currentQuestion}></Card>
            </View>:<View style={styles.container}>
                <Text style={styles.scoreText}>Score</Text>
                <Text>{this.state.score} / {this.state.questions.length} corect answers</Text>
                <Text>Score: {(this.state.score / this.state.questions.length)*100}%</Text>

                <TouchableOpacity style={styles.btn} onPress={this.startOver}>
                    <Text>Quiz me back</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btn} onPress={() => {
                        this.props.navigation.dispatch(NavigationActions.back())
                }}>
                    <Text>Go to the deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default Quiz;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    scoreText: {
        fontSize: 32,
        marginBottom: 20
    },
    numberOfCards: {
       marginTop: 20 
    },
    btn: {
        backgroundColor: '#DDDDDD',
        paddingTop: 20,
        paddingRight: 50,
        paddingBottom: 20,
        paddingLeft: 50,
        marginBottom: 20,
        marginTop: 20
    },
});