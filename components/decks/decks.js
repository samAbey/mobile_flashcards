import React from 'react';
import { 
    View, 
    Text, 
    AsyncStorage,
    Button,
    StyleSheet,
    TouchableOpacity,
    FlatList
} from 'react-native';import { connect } from 'react-redux';
import { getAllDecks } from '../../redux/actions/decks';
import { Entypo } from '@expo/vector-icons';
import { DECK_KEY } from '../../utils/helpers';


class Decks extends React.Component {

    state = {
        decks: null
    }

    componentDidMount () {
        AsyncStorage.getItem(DECK_KEY).then((value) => {
            value? this.props.getAllDecks(JSON.parse(value)):null;
        }).done();
    }
    
    render () {

        const {decks} = this.props.decks;


        const deckItems = []
        
        Object.keys(decks).forEach((item, index)=> {
            deckItems.push({
                key: item,
                value: item
            })
        });

        const renderItems = ({item}) => {

            const 
                value = item.key,
                questions = decks[value].questions;
                deck = this.props.decks[value];
            return <View>
                <TouchableOpacity onPress={() => this.props.navigation.navigate (
                    'Deck',
                    { deckName: value, deck: decks[value] }
                )}>
                    <View style={styles.deckPanel}>
                        <Text style={styles.deckTitle}>{value}</Text>
                        <Text>{questions.length} Cards</Text>
                    </View>
                </TouchableOpacity>
            </View>
        }

        return (
            <View style={styles.container}>
                { 
                    Object.keys(decks).length
                        ?<FlatList data={deckItems} renderItem={renderItems}/>
                        :<View style={styles.noDecks}>
                            <Entypo name="emoji-sad" size={32}/>
                            <Text style={styles.deckTitle}>No Decks Availables</Text>
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
        alignItems: 'center'
    },
    deckPanel: {
        height: 300, 
        alignItems: 'center', 
        justifyContent: 'center', 
        borderBottomWidth: 1, 
        borderBottomColor: '#b7b7b7'
    },
    deckTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    }
})
    