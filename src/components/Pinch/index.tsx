import { View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import { styles } from "./styles";

export function Pinch() {
  const scale = useSharedValue(1)

  const rotationGesture = Gesture.Pinch().onUpdate(e => {
    console.log(e)
    scale.value = e.scale
  })

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }))

  return (
    <View style={styles.container}>
      <GestureDetector gesture={rotationGesture} >
        <Animated.View style={[styles.box, animatedStyle]} />
      </GestureDetector>
    </View>
  )
}