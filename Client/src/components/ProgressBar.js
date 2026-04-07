import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import { C } from '../constants/theme';

export default function ProgressBar({ val, max, color = C.sage, h = 8 }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(progress, {
      toValue: max > 0 ? (val / max) : 0,
      useNativeDriver: false,
      friction: 8,
      tension: 40
    }).start();
  }, [val, max]);

  const width = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={[styles.track, { height: h }]}>
      <Animated.View style={[styles.fill, { width, height: h, backgroundColor: color }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 99,
    overflow: 'hidden',
    width: '100%'
  },
  fill: {
    borderRadius: 99
  }
});
