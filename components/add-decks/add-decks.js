import React from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    i, 
    StyleSheet,
    TouchableOpacity,
    AsyncStorage
} from 'react-native';

import { DECK_KEY } from '../../utils/helpers'

class AddDecks extends React.Component {

    state = {
        deckName: "",
        deckAlreadyExsists: false
    }

    onChange = (text) => {
        this.setState({
            deckName: text,
            deckAlreadyExsists: false
        })
    }

    addDeck = () => {

        const {deckName} = this.state;


        if (deckName) {


            AsyncStorage.getItem(DECK_KEY).then((value) => {
                
                if (value && JSON.parse(value) && !JSON.parse(value)[deckName]) {
                    
                    AsyncStorage.mergeItem(DECK_KEY, JSON.stringify({
                        [this.state.deckName]: {}
                    }), () => {
                        AsyncStorage.getItem(DECK_KEY).then((value) => {
                            console.log(value);
                        }).done();
                        this.setState({deckAlreadyExsists: false});
                    })
                } else if (value == null) {
                    AsyncStorage.setItem(DECK_KEY, JSON.stringify({
                        [this.state.deckName]: {}
                    }), () => {
                        AsyncStorage.getItem(DECK_KEY).then((value) => {
                            console.log('Item added,', value);
                        }).done();
                        this.setState({deckAlreadyExsists: false});
                    });
                } else {
                    this.setState({deckAlreadyExsists: true})
                }
            }).done();
            
        }
    }

    render () {
        console.log(this.state.deckAlreadyExsists)
        return (
            <View style={styles.container}>
                <Text>What is the title of your new Deck</Text>
                <TextInput style={styles.inputBox} onChangeText={this.onChange}/>
                <TouchableOpacity style={styles.addDeskButton} onPress={this.addDeck}>
                    <Text>Add Deck</Text>
                </TouchableOpacity>
                {this.state.deckAlreadyExsists?<View>
                    <Text>Deck Already Exsists!</Text>
                </View>:null}
            </View>
        )
    }
}

export default AddDecks;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    addDeskButton: {
        backgroundColor: '#DDDDDD',
        paddingTop: 20,
        paddingRight: 50,
        paddingBottom: 20,
        paddingLeft: 50
    },
    inputBox: {
        width: 300,
        height: 40,
        borderColor: '#DDDDDD',
        borderWidth: 1,
        marginBottom: 10,
        marginTop: 10,
        padding: 3
    }
});