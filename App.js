import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FCStatusBar  from './components/statusbar/statusbar';
import { TabNavigator } from 'react-navigation';
import AddDeck from './components/add-decks/add-decks';
import Decks from './components/decks/decks'



const Tabs = TabNavigator ({
  Decks: {
    screen: Decks
  },
  AddDeck: {
    screen: AddDeck
  }
})

export default class App extends React.Component {
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
