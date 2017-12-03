import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity } from 'react-native';
import { DECK_KEY } from '../../utils/helpers';

class CleanDecks extends React.Component {

    deleteAllDecks = () => {
        AsyncStorage.removeItem(DECK_KEY, () => {
            AsyncStorage.getItem(DECK_KEY).then(function (value) {
                console.log (value)
            }) 
        });
    }

    render () {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.deleteButton} onPress={this.deleteAllDecks}>
                    <Text style={styles.btnTextColor}>Delete All Decks</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CleanDecks;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteButton: {
        backgroundColor: 'tomato',
        paddingTop: 20,
        paddingRight: 50,
        paddingBottom: 20,
        paddingLeft: 50
    },
    btnTextColor: {
        color: '#fff'
    }
});

