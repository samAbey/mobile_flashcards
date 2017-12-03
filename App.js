import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import FCStatusBar  from './components/statusbar/statusbar';
import { TabNavigator, StackNavigator } from 'react-navigation';
import AddDeck from './components/add-decks/add-decks';
import Decks from './components/decks/decks';
import CleanDecks from './components/clean-decks/clean-decks';

import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import reducers from './redux/reducers';
import thunk from 'redux-thunk';
import Card from './components/card/card';


import { DECK_KEY, setUpAsyncStorage } from './utils/helpers';



const Tabs = TabNavigator ({
  Decks: {
    screen: Decks
  },
  AddDeck: {
    screen: AddDeck
  },
  CleanDecks: {
    screen: CleanDecks
  }
});

const MainNavigator = StackNavigator ({
  Tabs: {
    screen: Tabs,
    navigationOptions: ({ navigation }) => ({
      header: null,
    }),
  },
  Card: {
    screen: Card
  }

})

const store = createStore(reducers, applyMiddleware(thunk))


export default class App extends React.Component {

  render() {
    
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <FCStatusBar/>
          <MainNavigator />
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
