import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { C } from '../constants/theme';

export default function NavBar({ title, sub, onBack, rightAction }) {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        {/* Left — back button */}
        {onBack ? (
          <TouchableOpacity onPress={onBack} style={styles.backBtn}>
            <Text style={styles.backIcon}>‹</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        {/* Centre — title */}
        <View style={{ flex: 1 }}>
          <Text style={styles.title} numberOfLines={1}>{title}</Text>
          {sub && <Text style={styles.sub} numberOfLines={1}>{sub}</Text>}
        </View>

        {/* Right — optional action (e.g. Logout) */}
        {rightAction ? (
          <TouchableOpacity onPress={rightAction.onPress} style={styles.rightBtn}>
            <Text style={styles.rightBtnText}>{rightAction.label}</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
    backgroundColor: C.white,
    borderBottomWidth: 1,
    borderBottomColor: C.border,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backBtn: {
    width: 34, height: 34, borderRadius: 12,
    backgroundColor: C.mint,
    alignItems: 'center', justifyContent: 'center',
    marginRight: 12,
  },
  backIcon: { fontSize: 28, color: C.sage, marginTop: -4 },
  placeholder: { width: 34, marginRight: 12 },
  title: {
    fontSize: 16, fontWeight: '800',
    color: C.charcoal, textAlign: 'center',
  },
  sub: {
    fontSize: 12, color: C.muted,
    textAlign: 'center', marginTop: 2,
  },
  rightBtn: {
    paddingHorizontal: 12, paddingVertical: 6,
    backgroundColor: '#FEE2E2', borderRadius: 8,
    marginLeft: 12,
  },
  rightBtnText: { color: '#DC2626', fontSize: 12, fontWeight: '700' },
});
