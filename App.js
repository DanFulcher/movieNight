import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  View,
  Text,
  StyleSheet
} from 'react-native';
import Game from './pages/Game';

const App = () => {
  return (
    <SafeAreaView>
      <StatusBar />
      <ScrollView contentContainerStyle={styles.scrollview} style={styles.cunt}>
        <View style={styles.body}>
          <Game />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollview: {
    flexGrow:1.
  },
  cunt: {
    height: '100%'
  },
  body: {
    flex:1,
  }
})

export default App;
