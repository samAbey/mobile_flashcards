import React from 'react';
import { StatusBar, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create({
    statusBar: {
        height: Constants.statusBarHeight,
        backgroundColor: '#f77660'
    }
});

const FCStatusBar = () =>  <View style={styles.statusBar}>
      <StatusBar translucent />
    </View>

export default FCStatusBar;

