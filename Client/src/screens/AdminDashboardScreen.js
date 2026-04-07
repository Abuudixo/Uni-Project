import React, { useContext } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, StatusBar,
} from 'react-native';
import { C } from '../constants/theme';
import { AppContext } from '../context/AppContext';

const STATS = [
  { icon: '👥', label: 'Total Patients', value: '24', color: '#4F7FFF', bg: '#EEF2FF' },
  { icon: '🩺', label: 'Doctors', value: '3', color: '#10B981', bg: '#D1FAE5' },
  { icon: '📋', label: 'Assessments', value: '87', color: '#F59E0B', bg: '#FEF3C7' },
  { icon: '📅', label: 'Today', value: '5', color: '#8B5CF6', bg: '#EDE9FE' },
];

const QUICK_ACTIONS = [
  { icon: '➕', label: 'Add Doctor' },
  { icon: '📊', label: 'Reports' },
  { icon: '⚙️', label: 'Settings' },
  { icon: '🔔', label: 'Alerts' },
];

const RECENT_ACTIVITY = [
  { time: '10:32 AM', text: 'Patient Amina Hassan completed assessment', type: 'assessment' },
  { time: '09:15 AM', text: 'Dr. Farah joined the platform', type: 'user' },
  { time: 'Yesterday', text: '12 new assessments submitted', type: 'assessment' },
  { time: 'Yesterday', text: 'System backup completed', type: 'system' },
];

export default function AdminDashboardScreen() {
  const { user, logout } = useContext(AppContext);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor="#1E293B" />

      {/* ── Header ── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Admin Portal</Text>
          <Text style={styles.adminName}>
            👑 {user?.firstName} {user?.lastName}
          </Text>
        </View>
        <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>

        {/* ── Stats Grid ── */}
        <Text style={styles.sectionLabel}>OVERVIEW</Text>
        <View style={styles.statsGrid}>
          {STATS.map((s, i) => (
            <View key={i} style={[styles.statCard, { backgroundColor: s.bg }]}>
              <Text style={styles.statIcon}>{s.icon}</Text>
              <Text style={[styles.statValue, { color: s.color }]}>{s.value}</Text>
              <Text style={styles.statLabel}>{s.label}</Text>
            </View>
          ))}
        </View>

        {/* ── Quick Actions ── */}
        <Text style={styles.sectionLabel}>QUICK ACTIONS</Text>
        <View style={styles.actionsRow}>
          {QUICK_ACTIONS.map((a, i) => (
            <TouchableOpacity key={i} style={styles.actionBtn} activeOpacity={0.7}>
              <Text style={styles.actionIcon}>{a.icon}</Text>
              <Text style={styles.actionLabel}>{a.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ── Recent Activity ── */}
        <Text style={styles.sectionLabel}>RECENT ACTIVITY</Text>
        <View style={styles.activityCard}>
          {RECENT_ACTIVITY.map((item, i) => (
            <View key={i} style={[styles.activityRow, i < RECENT_ACTIVITY.length - 1 && styles.activityBorder]}>
              <View style={[styles.activityDot, {
                backgroundColor:
                  item.type === 'assessment' ? '#4F7FFF'
                  : item.type === 'user' ? '#10B981'
                  : '#94A3B8'
              }]} />
              <View style={{ flex: 1 }}>
                <Text style={styles.activityText}>{item.text}</Text>
                <Text style={styles.activityTime}>{item.time}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* ── Role Info ── */}
        <View style={styles.roleNote}>
          <Text style={styles.roleNoteText}>
            🔒 You are logged in as <Text style={{ fontWeight: '800' }}>Admin</Text>. 
            Patient and Doctor screens are not accessible from this account.
          </Text>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: '#1E293B' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 16,
    paddingBottom: 20,
    backgroundColor: '#1E293B',
  },
  greeting: { fontSize: 12, color: '#94A3B8', fontWeight: '600', letterSpacing: 1, marginBottom: 4 },
  adminName: { fontSize: 22, fontWeight: '800', color: '#fff' },
  logoutBtn: {
    paddingHorizontal: 16, paddingVertical: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
  },
  logoutText: { color: '#fff', fontSize: 13, fontWeight: '600' },

  scroll: { flex: 1, backgroundColor: '#F8FAFC', borderTopLeftRadius: 24, borderTopRightRadius: 24 },

  sectionLabel: {
    fontSize: 11, fontWeight: '700', color: '#94A3B8',
    letterSpacing: 1, marginTop: 24, marginBottom: 12,
    paddingHorizontal: 20,
  },

  // Stats
  statsGrid: {
    flexDirection: 'row', flexWrap: 'wrap',
    paddingHorizontal: 14, gap: 10,
  },
  statCard: {
    width: '47%', borderRadius: 16, padding: 18,
    alignItems: 'flex-start',
  },
  statIcon: { fontSize: 24, marginBottom: 10 },
  statValue: { fontSize: 28, fontWeight: '800', marginBottom: 2 },
  statLabel: { fontSize: 12, color: '#64748B', fontWeight: '500' },

  // Quick Actions
  actionsRow: {
    flexDirection: 'row', justifyContent: 'space-between',
    paddingHorizontal: 20, gap: 10,
  },
  actionBtn: {
    flex: 1, backgroundColor: '#fff', borderRadius: 14,
    paddingVertical: 16, alignItems: 'center',
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 8, elevation: 2,
  },
  actionIcon: { fontSize: 22, marginBottom: 6 },
  actionLabel: { fontSize: 11, color: '#475569', fontWeight: '600' },

  // Activity
  activityCard: {
    marginHorizontal: 20, backgroundColor: '#fff',
    borderRadius: 16, overflow: 'hidden',
    shadowColor: '#000', shadowOpacity: 0.05,
    shadowRadius: 8, elevation: 2,
  },
  activityRow: {
    flexDirection: 'row', alignItems: 'flex-start',
    padding: 16, gap: 12,
  },
  activityBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  activityDot: { width: 8, height: 8, borderRadius: 4, marginTop: 5 },
  activityText: { fontSize: 13, color: '#334155', fontWeight: '500', lineHeight: 18 },
  activityTime: { fontSize: 11, color: '#94A3B8', marginTop: 2 },

  // Role note
  roleNote: {
    margin: 20, padding: 16,
    backgroundColor: '#EFF6FF', borderRadius: 12,
    borderWidth: 1, borderColor: '#BFDBFE',
  },
  roleNoteText: { fontSize: 13, color: '#1D4ED8', lineHeight: 20 },
});
