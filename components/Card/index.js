import React from 'react';
import {Image, View, Text, StyleSheet} from 'react-native';

const Card = ({movie}) => {
  
  return (
    <>
      <Image style={styles.image} source={{ uri: movie.thumbnail}} />
      <View style={styles.cardBody}>
        <Text style={styles.title}>{movie.title}</Text>
        <Text style={styles.description}>{`${movie.summary.substring(0, 75)}...`}</Text>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  cardBody: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: "#f7f7f7",
    borderWidth: 1,
    backgroundColor: 'rgba(255,255,255,.8)',
    padding: 20,
    position: 'absolute',
    bottom: 0,
    width: '100%'
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "cover",
    borderRadius: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  description: {
    fontSize: 16,
  },
  
})

export default Card;