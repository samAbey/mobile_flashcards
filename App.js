import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import FCStatusBar  from './components/statusbar/statusbar';
import { TabNavigator } from 'react-navigation';
import AddDeck from './components/add-decks/add-decks';
import Decks from './components/decks/decks';
import cleanDecks from './components/clean-decks/clean-decks';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import thunk from 'redux-thunk';


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

const store = createStore(reducers, applyMiddleware(thunk))


export default class App extends React.Component {

  render() {
    
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <FCStatusBar/>
          <Tabs />
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
