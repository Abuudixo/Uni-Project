import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { C } from '../constants/theme';

export default function Btn({ children, onPress, variant = 'primary', style, disabled }) {
  const isGhost = variant === 'ghost';
  return (
    <TouchableOpacity 
      onPress={onPress} 
      disabled={disabled}
      activeOpacity={0.7}
      style={[
        styles.btn, 
        isGhost ? styles.ghost : styles.primary, 
        disabled && styles.disabled,
        style
      ]}
    >
      {typeof children === 'string' ? (
        <Text style={[styles.text, isGhost && styles.ghostText]}>{children}</Text>
      ) : children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  primary: { backgroundColor: C.sage },
  ghost: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: C.border },
  disabled: { opacity: 0.5 },
  text: { color: '#fff', fontSize: 15, fontWeight: '700' },
  ghostText: { color: C.slate },
});
