import React from 'react';
import {Animated, Text, StyleSheet} from 'react-native';
import {SCREEN_WIDTH} from '../../../helpers/screenDimensions'

const SwipeText = ({position}) => {
  const likeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [0, 0, 1],
    extrapolate: 'clamp'
  })

  const nopeOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 0],
    extrapolate: 'clamp'
  })
  return (
    <>
      <Animated.View
        style={[{opacity: likeOpacity}, styles.yes]}
      >
        <Text
          style={[{
            borderColor: "green",
            color: "green",
          },
          styles.swipeText]}
        >
          Yes!
        </Text>
      </Animated.View>
      <Animated.View
        style={[styles.nope, {opacity: nopeOpacity}]}
      >
        <Text
          style={[{
            borderColor: "red",
            color: "red",
          }, 
          styles.swipeText]}
        >
          NO!
        </Text>
      </Animated.View>
    </>
  );
}

const styles = StyleSheet.create({
  yes: {
    transform: [{ rotate: "-30deg" }],
    position: "absolute",
    top: 50,
    left: 40,
    zIndex: 1000
  },
  nope: {
    transform: [{ rotate: "30deg" }],
    position: "absolute",
    top: 50,
    right: 40,
    zIndex: 1000
  },
  swipeText: {
    borderWidth: 3,
    fontSize: 32,
    fontWeight: "bold",
    padding: 10
  }
})

export default SwipeText;
