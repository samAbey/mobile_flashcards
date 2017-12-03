import React from 'react';
import { 
    View, 
    Text, 
    AsyncStorage,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native';

import { StackNavigator } from 'react-navigation';

import { connect } from 'react-redux';
import { getAllDecks } from '../../redux/actions/decks';

import { Entypo } from '@expo/vector-icons';
import { DECK_KEY } from '../../utils/helpers';
import Card from '../card/card';

const Cards = StackNavigator ({
    Card: {
        screen: Card
    }
})

class Decks extends React.Component {

    state = {
        decks: null
    }

    showCards = () => {
        console.log('cards')
    }

    componentDidMount () {
        AsyncStorage.getItem(DECK_KEY).then((value) => {
            value? this.props.getAllDecks(JSON.parse(value)):null;
        }).done();
    }

    
    render () {

        const {decks} = this.props.decks;

        
        return (
            <View style={styles.container}>
                { 
                Object.keys(decks).length?

                    Object.keys(decks).map((value, index) => {
                        return (
                            <View key={index}>
                                <TouchableOpacity onPress={this.showCards}>
                                    <View>
                                        <Text>{value}</Text>
                                    </View>
                                    <View>
                                        <Text>
                                            {decks[value].questions.map((question, index) => {
                                                return <Text>{question}</Text>
                                            })}
                                        </Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    })
                    
                :
                    <View style={styles.noDecks}>
                        <Entypo name="emoji-sad" size={32}/>
                        <Text>No Decks Availables</Text>
                    </View>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { decks } = state;

    return {
        decks: state
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAllDecks: (value) => {dispatch(getAllDecks(value))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Decks);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    noDecks: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
    