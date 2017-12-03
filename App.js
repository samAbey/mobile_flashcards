import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import FCStatusBar  from './components/statusbar/statusbar';
import { TabNavigator } from 'react-navigation';
import AddDeck from './components/add-decks/add-decks';
import Decks from './components/decks/decks';
import cleanDecks from './components/clean-decks/clean-decks'; 


import { DECK_KEY, setUpAsyncStorage } from './utils/helpers';



const Tabs = TabNavigator ({
  Decks: {
    screen: Decks
  },
  AddDeck: {
    screen: AddDeck
  },
  cleanDecks: {
    screen: cleanDecks
  }
});



export default class App extends React.Component {

  componentDidMount () {
    
  }

  render() {


    
    return (
      <View style={styles.container}>
        <FCStatusBar/>
        <Tabs />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
