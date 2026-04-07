import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../constants/theme';

export default function Badge({ label, color, bg }) {
  return (
    <View style={[styles.badge, bg && { backgroundColor: bg }]}>
      <Text style={[styles.text, color && { color: color }]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
    backgroundColor: C.mint,
  },
  text: {
    fontSize: 10,
    fontWeight: '800',
    color: C.sage,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
