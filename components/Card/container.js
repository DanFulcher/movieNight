import React, {useState, useEffect} from 'react'
import {Animated, PanResponder, Dimensions, StyleSheet} from 'react-native';
import SwipeText from './SwipeText';
import Card from './index';
import {SCREEN_WIDTH, SCREEN_HEIGHT} from '../../helpers/screenDimensions'

const CardContainer = ({movies}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  console.log(currentIndex)

  const styles = StyleSheet.create({
    card: {
      maxWidth: SCREEN_WIDTH - 40,
      height: SCREEN_HEIGHT - 60,
      width: '100%',
      backgroundColor: '#fff',
      borderRadius: 10,
      position: 'absolute',
    },
  })

  useEffect(() => {
    // sets translate position back to default
    // when next card is selected
    position.setValue({ x: 0, y: 0 })
  }, [currentIndex]);

  const position = new Animated.ValueXY();

  const rotate = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: ['-10deg', '0deg', '10deg'],
    extrapolate: 'clamp'
  });
  const rotateAndTranslate = {
    transform: [{
      rotate: rotate
    },
    ...position.getTranslateTransform()
    ]
  }
  const nextCardOpacity = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0, 1],
    extrapolate: 'clamp'
  })
  const nextCardScale = position.x.interpolate({
    inputRange: [-SCREEN_WIDTH / 2, 0, SCREEN_WIDTH / 2],
    outputRange: [1, 0.8, 1],
    extrapolate: 'clamp'
  })

  const PanResp = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onPanResponderMove: (evt, gestureState) => {
      position.setValue({
        x: gestureState.dx,
        y: gestureState.dy
      });
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx > 120) {
        //Swiped Right
        Animated.spring(position, {
          toValue: { x: SCREEN_WIDTH + 100, y: gestureState.dy },
          speed: 1000,
          useNativeDriver: true,
        }).start(() => {
          setCurrentIndex(currentIndex + 1)
        })
      } else if (gestureState.dx < -120) {
        //SwipedLeft
        Animated.spring(position, {
          toValue: { x: -SCREEN_WIDTH - 100, y: gestureState.dy },
          speed: 1000,
          useNativeDriver: true,
        }).start(() => {
          setCurrentIndex(currentIndex + 1)
        })
      }
      else {
        Animated.spring(position, {
          toValue: { x: 0, y: 0 },
          friction: 3,
          useNativeDriver: true,
        }).start()
      }
    }
  });

  return movies.map((movie, i) => {
    if (i < currentIndex) {
      return null;
    } if (i == currentIndex) {
      return (
        <Animated.View
          {...PanResp.panHandlers}
          key={i}
          style={[rotateAndTranslate, styles.card]}
        >
          <SwipeText position={position} />
          <Card movie={movie} />
        </Animated.View>
      );
    } else {
      return (
        <Animated.View
          key={i}
          style={[{
            opacity: nextCardOpacity,
            transform: [
              { scale: nextCardScale }
            ],
          }, styles.card]}
        >
          <Card movie={movie} />
        </Animated.View>
      )
    }
  }).reverse();
}

export default CardContainer;