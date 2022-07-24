import React, { useEffect, useImperativeHandle } from 'react';
import {
  Dimensions,
  Easing,
  Image,
  ImageSourcePropType,
  StyleSheet,
  View,
} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import { snapPoint } from 'react-native-redash';

export interface CardData {
  source: ImageSourcePropType;
}

export interface CardProps extends CardData {
  index: number;
  shouldReverse: Animated.SharedValue<boolean>;
}

const { width: wWidth, height: wHeight } = Dimensions.get('window');

const ORIGINAL_WIDTH = 429;
const ORIGINAL_HEIGHT = 742;
const aspectRatio = ORIGINAL_HEIGHT / ORIGINAL_WIDTH;
const borderRadiusRatio = 26 / ORIGINAL_WIDTH;
const CARD_WIDTH = wWidth - EStyleSheet.value('80rem');
const CARD_HEIGHT = CARD_WIDTH * aspectRatio;
const CARD_BORDER_RADIUS = CARD_WIDTH * borderRadiusRatio;
const SNAP_POINTS = [-wWidth, 0, wWidth];

const Card: React.FC<CardProps> = ({ source, index, shouldReverse }) => {
  const theta = -10 + Math.random() * 10;
  const offset = useSharedValue({ x: 0, y: 0 });
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(-wHeight);
  const rotateX = useSharedValue(20);
  const rotateZ = useSharedValue(0);
  const scale = useSharedValue(1);
  const gesture = Gesture.Pan()
    .onBegin(() => {
      offset.value.x = translateX.value;
      offset.value.y = translateY.value;
      rotateX.value = withTiming(0);
      rotateZ.value = withTiming(0);
      scale.value = withTiming(1.1);
    })
    .onUpdate(({ translationX, translationY }) => {
      translateX.value = offset.value.x + translationX;
      translateY.value = offset.value.y + translationY;
    })
    .onEnd(({ velocityX, velocityY }) => {
      const dest = snapPoint(translateX.value, velocityX, SNAP_POINTS);
      translateX.value = withSpring(dest, {
        velocity: velocityX,
        mass: 0.75,
      });
      translateY.value = withSpring(0, { velocity: velocityY, mass: 0.75 });
      rotateX.value = withTiming(20);
      scale.value = withTiming(1, {}, () => {
        if (index === 0 && dest !== 0) {
          shouldReverse.value = true;
        }
      });
    });
  const style = useAnimatedStyle(() => ({
    transform: [
      { perspective: 1500 },
      { rotateX: `${rotateX.value}deg` },
      { translateX: translateX.value },
      { translateY: translateY.value },
      { rotateY: `${rotateZ.value / 10}deg` },
      { rotateZ: `${rotateZ.value}deg` },
      { scale: scale.value },
    ],
  }));

  useAnimatedReaction(
    () => shouldReverse.value,
    v => {
      if (v) {
        translateX.value = withDelay(
          index * 150,
          withSpring(0, {}, () => {
            if (index === 0) {
              shouldReverse.value = false;
            }
          }),
        );
        rotateZ.value = withDelay(index * 150, withSpring(theta));
      }
    },
  );

  useEffect(() => {
    translateY.value = withDelay(index * 150, withTiming(0));
    rotateZ.value = withDelay(index * 150, withSpring(theta));
  }, [translateY, index, theta, rotateZ]);

  return (
    <View style={styles.container} pointerEvents='box-none'>
      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.card, style]}>
          <Image source={source} style={styles.image} resizeMode='contain' />
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = EStyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_BORDER_RADIUS,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 5,
  },
  image: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: CARD_BORDER_RADIUS,
  },
});

export default Card;
