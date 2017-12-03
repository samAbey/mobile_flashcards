import React from 'react';
import { 
    View, 
    Text, 
    AsyncStorage,
    Button,
    StyleSheet
} from 'react-native';

import { Entypo } from '@expo/vector-icons';

import { DECK_KEY } from '../../utils/helpers';

class Decks extends React.Component {

    state = {
        decks: null
    }

    componentDidMount () {

        AsyncStorage.getItem(DECK_KEY, (value) => {
            if (value) {
                this.setState({
                    decks: value
                })
            } else {
                this.setState({
                    decks: null
                })
            }
        }).done();
    }

    
    render () {

        const {decks} = this.state
        return (
            <View style={styles.container}>
                { 
                decks?
                    <View>
                        <Text>Decks available</Text>
                    </View>
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

export default Decks;

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
    