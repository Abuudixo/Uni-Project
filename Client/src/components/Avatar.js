import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { C } from '../constants/theme';

export default function Avatar({ name, size = 48, fs = 18 }) {
  const initials = name
    ? name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    : '??';

  return (
    <View style={[styles.avatar, { width: size, height: size, borderRadius: size / 2 }]}>
      <Text style={[styles.text, { fontSize: fs }]}>{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    backgroundColor: C.sage,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: '800',
  },
});
