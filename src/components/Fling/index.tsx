import { View, Dimensions } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { Gesture, GestureDetector, Directions } from 'react-native-gesture-handler'

import { styles } from "./styles";

const START = 24;
const LIMIT = Dimensions.get('window').width - 124;

export function Fling() {
  const position = useSharedValue(START)

  const directionRight = Gesture.Fling().direction(Directions.RIGHT).onStart(e => {
    position.value = withTiming(LIMIT, { duration: 500 })
  })

  const directionLeft = Gesture.Fling().direction(Directions.LEFT).onStart(e => {
    position.value = withTiming(START, { duration: 500 })
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: position.value }]
  }))

  return (
    <View style={styles.container}>
      <GestureDetector gesture={Gesture.Exclusive(directionRight, directionLeft)} >
        <Animated.View style={[styles.box, animatedStyle]} />
      </GestureDetector>
    </View>
  )
}