import React from 'react';
import { View, Text } from 'react-native';
import Card from './card';

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

    nextQuestion = (answer) => {
        if (this.state.currentQuestionIndex < this.state.questions.length-1) {
            this.setState((state) => ({
                currentQuestion: state.questions[state.currentQuestionIndex+1],
                currentQuestionIndex:  state.currentQuestionIndex + 1
            }))
        } else {
            this.setState({
                showScore: true
            });
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
            !this.state.showScore?<View>
                <Card nextQuestion={this.nextQuestion} question={this.state.currentQuestion}></Card>
            </View>:<View>
                <Text>{this.state.score} of {this.state.questions.length}</Text>
            </View>
        );
    }
}

export default Quiz;