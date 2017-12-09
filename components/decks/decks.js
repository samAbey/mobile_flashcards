import React from 'react';
import { 
    View, 
    Text, 
    AsyncStorage,
    Button,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    Animated
} from 'react-native';import { connect } from 'react-redux';
import { getAllDecks } from '../../redux/actions/decks';
import { Entypo, FontAwesome } from '@expo/vector-icons';
import { DECK_KEY } from '../../utils/helpers';


class Decks extends React.Component {

    state = {
        decks: null,
        bounceValue: new Animated.Value(0),
        showAnimatedText: false
    }

    componentDidMount () {

        const {bounceValue} = this.state;

        AsyncStorage.getItem(DECK_KEY).then((value) => {
            value? this.props.getAllDecks(JSON.parse(value)):null;
        }).done();

        Animated.sequence([
            Animated.timing(bounceValue, {duration: 200, toValue: 1.05}),
            Animated.spring(bounceValue, {toValue: 1, friction: 2})
        ]).start()
    }

    handleDeckPress = (deckName, deck) => {

        const { bounceValue } = this.state;
        
        this.setState({
            showAnimatedText: true
        });

        Animated.sequence([
            Animated.timing(bounceValue, {duration: 200, toValue: 1.05}),
            Animated.spring(bounceValue, {toValue: 1, friction: 5})
        ]).start(() => {
            this.props.navigation.navigate (
                'Deck',
                { deckName, deck }
            )
            this.setState({
                showAnimatedText: false
            });
        });
        
    }
    
    render () {

        const {decks} = this.props.decks;
        const { bounceValue } = this.state;


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
                questions = decks[value].questions,
                deck = this.props.decks[value];
            return <View>
                <TouchableOpacity onPress={() => {this.handleDeckPress(value, decks[value])}}>
                    <View style={styles.deckPanel}>
                        <Animated.Text style={[styles.deckTitle]}>{value}</Animated.Text>
                        <Text>{questions.length} Cards</Text>
                    </View>
                </TouchableOpacity>
            </View>
        }

        return (
            <View style={styles.container}>
                {this.state.showAnimatedText
                    ?<View style={styles.getStarted}>
                        <FontAwesome name="smile-o" size={32} />
                        <Animated.Text style={[styles.getStartedText, {transform: [{scale: bounceValue}]}]}>Let's Get Started</Animated.Text>
                    </View>:null}
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
    getStarted: {
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center'
    },
    deckTitle: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    getStartedText: {
        fontSize: 32,
        fontWeight: 'bold'
    }
})
    