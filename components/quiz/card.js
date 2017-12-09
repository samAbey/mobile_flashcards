import React from 'react';
import { 
    View, 
    Text,
    TouchableOpacity,
    StyleSheet
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
        return (
            this.state.currentView==='question'?<View style={styles.container}>
                <Text style={styles.question}>{this.props.question.question}</Text>
                <View style={styles.containerControllers}>

                    <TouchableOpacity onPress={this.changeView}>
                        <Text style={styles.answerBtn}>Answer</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.props.nextQuestion(true)}} style={styles.correctBtn}>
                        <Text style={styles.correctBtnText}>Correct</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.props.nextQuestion(false)}} style={styles.incorrectBtn}>
                        <Text style={styles.incorrectBtnText}>Incorrect</Text>
                    </TouchableOpacity>
                </View>
            </View>:<View style={styles.containerAnswer}>
                <Text style={styles.answer}>{this.props.question.answer}</Text>
                <TouchableOpacity onPress={this.changeView}>
                    <Text style={styles.questionBtn}>Question</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

export default Card;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerControllers: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    containerAnswer:{
        justifyContent: 'center',
        alignItems: 'center'
    },
    question: {
        fontSize: 32,
        marginBottom: 20,
        textAlign: 'center'
    },
    answer: {
        fontSize: 32,
        marginBottom: 20,
        textAlign: 'center'
    },
    answerBtn: {
        color: 'blue',
        fontSize: 20,
        marginBottom: 40
    },
    questionBtn: {
        color: 'blue',
        fontSize: 20
    },
    correctBtn: {
        backgroundColor: '#45a058',
        paddingTop: 20,
        paddingRight: 50,
        paddingBottom: 20,
        paddingLeft: 50,
        marginTop: 10,
        marginBottom: 10
    },
    correctBtnText: {
        color: '#fff'
    },
    incorrectBtn: {
        backgroundColor: 'red',
        paddingTop: 20,
        paddingRight: 50,
        paddingBottom: 20,
        paddingLeft: 50,
        marginTop: 10,
        marginBottom: 10
    },
    incorrectBtnText: {
        color: '#fff'
    },

});