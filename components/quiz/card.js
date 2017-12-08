import React from 'react';
import { 
    View, 
    Text,
    TouchableOpacity
} from 'react-native';

class Card extends React.Component {

    state = {
        currentView: 'question'
    }

    changeView = () => {
        if (this.state.currentView === 'answer') {
            this.setState({
                currentView: 'question'
            });
        } else {
            this.setState({
                currentView: 'answer'
            });
        }
    }

    render () {
        console.log(this.props.question)
        return (
            this.state.currentView==='question'?<View>
                <Text>{this.props.question.question}</Text>
                <View>

                    <TouchableOpacity onPress={this.changeView}>
                        <Text>Answer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.props.nextQuestion(true)}}>
                        <Text>Correct</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.props.nextQuestion(false)}}>
                        <Text>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>:<View>
                <Text>{this.props.question.answer}</Text>
                <TouchableOpacity onPress={this.changeView}>
                    <Text>Question</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Card;