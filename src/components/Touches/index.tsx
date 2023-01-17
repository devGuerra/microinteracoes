import { View, Pressable } from "react-native";
import Animated, { interpolateColor, useAnimatedStyle, useSharedValue, withSpring, withTiming } from "react-native-reanimated";
import { Gesture, GestureDetector } from 'react-native-gesture-handler'

import { styles } from "./styles";


export function Touches() {
  const position = useSharedValue(100);
  const doubleTapActive = useSharedValue(0);

  function onPressIn() {
    position.value = withSpring(150);
  }

  function onPressOut() {
    position.value = withSpring(100);
  }

  const animatedStyle = useAnimatedStyle(() => ({
    height: position.value,
    width: position.value,
    backgroundColor: interpolateColor(
      doubleTapActive.value,
      [0, 1],
      ['#8527e5', '#bf5a07']
    )
  }))

  const onGesture = Gesture.Tap().numberOfTaps(2).onStart(() => {
    doubleTapActive.value = withTiming(doubleTapActive.value === 0 ? 1 : 0, {
      duration: 500
    })
  })

  return (
    <View style={styles.container}>
      <GestureDetector gesture={onGesture} >
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut} >
          <Animated.View style={[styles.box, animatedStyle]} />
        </Pressable>
      </GestureDetector>
    </View>
  )
}