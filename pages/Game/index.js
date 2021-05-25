import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import movies from '../../movies.json';

import CardContainer from '../../components/Card/container'

const Game = () => {
  return (
    <View style={styles.cardContatiner}>
      <CardContainer movies={movies} />
    </View>
  )
}

const styles = StyleSheet.create({
  cardContatiner: {
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
  }
})

export default Game;