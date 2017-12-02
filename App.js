import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import FCStatusBar  from './components/statusbar/statusbar';
import { TabNavigator } from 'react-navigation';

class Decks extends React.Component {

  render () {
    return (
      <View>
        <Text>Decks</Text>
      </View>
    )
  }
}

class AddDeck extends React.Component {

  render () {
    return (
      <View>
        <Text>Add Dec</Text>
      </View>
    )
  }
}

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
