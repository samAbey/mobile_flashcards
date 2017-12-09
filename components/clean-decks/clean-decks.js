import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    AsyncStorage,
    TouchableOpacity } from 'react-native';
import { DECK_KEY } from '../../utils/helpers';
import { getAllDecks } from '../../redux/actions/decks';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';

class CleanDecks extends React.Component {

    deleteAllDecks = () => {
        const {getAllDecks} = this.props;
        AsyncStorage.removeItem(DECK_KEY, () => {
            AsyncStorage.getItem(DECK_KEY).then(function (value) {
                getAllDecks({});
            }).done();
            this.props.navigation.dispatch(NavigationActions.back())
        }).done();
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

mapDispatchToProps = (dispatch) => {
    return {
        getAllDecks: items => dispatch(getAllDecks(items))
    }
}

export default connect(null, mapDispatchToProps) (CleanDecks);

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


