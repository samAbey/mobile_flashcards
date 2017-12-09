import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Card from './card';
import { clearLocalNotification,setLocalNotification } from '../../utils/helpers';

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
    }
});