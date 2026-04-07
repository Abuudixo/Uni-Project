import React, { useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { C } from '../constants/theme';
import { ASSESSMENTS } from '../data/assessments';
import { AppContext } from '../context/AppContext';
import Card from '../components/Card';
import Badge from '../components/Badge';
import Btn from '../components/Btn';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

export default function AssessmentListScreen({ navigation }) {
  const { completedKeys, user, logout } = useContext(AppContext);
  const list = [ASSESSMENTS.mentalHealth];
  const allDone = list.every(a => completedKeys.includes(a.key));

  const handleDownload = async () => {
    try {
      const html = `
        <html>
          <body style="font-family: sans-serif; padding: 40px; color: #333;">
            <div style="text-align: center; border-bottom: 2px solid #2D5A27; padding-bottom: 20px; margin-bottom: 30px;">
              <h1 style="color: #2D5A27; margin: 0;">MindBridge Assessment Report</h1>
              <p style="color: #666; margin-top: 5px;">${new Date().toLocaleDateString()}</p>
            </div>
            
            <div style="margin-bottom: 30px;">
              <h2 style="color: #444;">Patient Information</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; font-weight: bold; width: 150px;">Name:</td><td>${user?.firstName} ${user?.lastName}</td></tr>
                <tr><td style="padding: 8px 0; font-weight: bold;">Email:</td><td>${user?.email}</td></tr>
              </table>
            </div>

            <div style="background: #f8faf8; padding: 25px; border-radius: 15px; border: 1px solid #e2e8e2; margin-bottom: 30px;">
              <h2 style="margin-top: 0; color: #2D5A27;">Mental Health Assessment Summary</h2>
              <p style="font-size: 18px; margin-bottom: 10px;">Status: <strong>Completed</strong></p>
              <p style="font-size: 14px; color: #666; line-height: 1.5;">This assessment was screening for multiple categories including Anxiety, Depression, and Mood variations. The results are being reviewed by your healthcare provider.</p>
            </div>

            <div style="text-align: center; margin-top: 50px; font-size: 12px; color: #999; border-top: 1px solid #eee; pt: 20px;">
              <p>MindBridge Clinical Platform - HIPAA Compliant Report Generation</p>
              <p>This report is for information purposes only and should be discussed with a licensed clinical therapist.</p>
            </div>
          </body>
        </html>
      `;
      
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
    } catch (err) {
      console.error(err);
      alert("Failed to generate PDF");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
           <Text style={styles.preSession}>PRE-SESSION</Text>
           <TouchableOpacity onPress={logout} style={styles.logoutBtn}>
             <Text style={styles.logoutText}>Logout</Text>
           </TouchableOpacity>
        </View>
        <Text style={styles.title}>Your Assessments</Text>
        <Text style={styles.subtitle}>Complete these before meeting your therapist so they can be fully prepared.</Text>
        <View style={styles.progressContainer}>
           <View style={[styles.progressSegment, { flex: completedKeys.length, backgroundColor: "rgba(255,255,255,0.9)", minWidth: completedKeys.length === 0 ? 0 : undefined }]} />
           <View style={[styles.progressSegment, { flex: list.length - completedKeys.length, backgroundColor: "rgba(255,255,255,0.25)" }]} />
        </View>
        <Text style={styles.progressText}>{completedKeys.length} of {list.length} complete</Text>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 20 }}>
        {allDone && (
          <View style={styles.doneBox}>
            <Text style={{ fontSize: 22, marginRight: 10 }}>✅</Text>
            <View style={{ flex: 1 }}>
              <Text style={styles.doneTitle}>Completed!</Text>
              <Text style={styles.doneSubtitle}>You have already completed your only assessment. Your therapist is reviewing your results.</Text>
            </View>
          </View>
        )}
        {list.map(a => {
          const done = completedKeys.includes(a.key);
          return (
            <Card key={a.key} style={{ borderLeftWidth: 4, borderLeftColor: done ? a.color : C.border, marginBottom: 12 }}>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                <View style={[styles.iconBox, { backgroundColor: done ? a.colorLight : C.sand }]}>
                  <Text style={{ fontSize: 22, color: done ? a.color : C.charcoal }}>{done ? "✓" : a.icon}</Text>
                </View>
                <View style={{ flex: 1, marginLeft: 12 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 2 }}>
                    <Text style={styles.cardTitle}>{a.name}</Text>
                    {done && <View style={{ marginLeft: 8 }}><Badge label="Complete" color={C.success} bg={C.successLight} /></View>}
                  </View>
                  <Text style={styles.cardFull}>{a.full}</Text>
                  <View style={{ flexDirection: 'row', gap: 12, marginTop: 5 }}>
                    <Text style={styles.cardStat}>🕐 {a.duration}</Text>
                    <Text style={styles.cardStat}>📊 {a.questions.length} questions</Text>
                  </View>
                </View>
              </View>
              <View style={{ marginTop: 12 }}>
                <Btn 
                   onPress={() => !done && navigation.navigate('AssessmentQuiz', { assessmentKey: a.key })} 
                   variant={done ? "ghost" : "primary"} 
                   style={{ width: "100%", paddingVertical: 10 }}
                   disabled={done}
                 >
                   <Text style={{ fontSize: 13, fontWeight: '600' }}>{done ? "You already did your assessment" : `Start ${a.name} →`}</Text>
                 </Btn>
              </View>
            </Card>
          );
        })}

        {!allDone && (
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              💡 <Text style={{ fontWeight: 'bold' }}>Why does this matter?</Text> Your answers help your therapist understand what you're going through right now — so your first session focuses on what matters most to you.
            </Text>
          </View>
        )}

        {allDone && (
          <View style={{ marginTop: 20 }}>
            <Btn onPress={handleDownload} variant="primary" style={{ width: "100%", paddingVertical: 14 }}>
              📥 Download My Results (PDF)
            </Btn>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.cream },
  header: { backgroundColor: C.sage, paddingTop: 60, paddingBottom: 24, paddingHorizontal: 20 },
  headerTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 },
  preSession: { fontSize: 11, fontWeight: '600', opacity: 0.65, color: '#fff', letterSpacing: 1 },
  logoutBtn: { paddingHorizontal: 12, paddingVertical: 6, backgroundColor: 'rgba(255,255,255,0.2)', borderRadius: 8 },
  logoutText: { color: '#fff', fontSize: 12, fontWeight: '700' },
  completedNote: { backgroundColor: '#EFF6FF', borderRadius: 14, padding: 14, marginTop: 4, borderWidth: 1, borderColor: '#BFDBFE' },
  completedNoteText: { fontSize: 13, color: '#1D4ED8', lineHeight: 20 },
  title: { fontSize: 22, fontWeight: '800', color: '#fff' },
  subtitle: { fontSize: 13, opacity: 0.8, marginTop: 6, lineHeight: 20, color: '#fff' },
  progressContainer: { flexDirection: 'row', gap: 6, marginTop: 14 },
  progressSegment: { height: 4, borderRadius: 99 },
  progressText: { fontSize: 12, opacity: 0.8, marginTop: 6, color: '#fff' },
  doneBox: { backgroundColor: C.successLight, borderRadius: 14, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: `${C.success}44`, flexDirection: 'row', alignItems: 'center' },
  doneTitle: { fontSize: 14, fontWeight: '700', color: C.success },
  doneSubtitle: { fontSize: 12, color: C.slate, marginTop: 2, lineHeight: 16 },
  iconBox: { width: 46, height: 46, borderRadius: 13, alignItems: 'center', justifyContent: 'center' },
  cardTitle: { fontSize: 15, fontWeight: '700', color: C.charcoal },
  cardFull: { fontSize: 12, color: C.muted },
  cardStat: { fontSize: 12, color: C.slate },
  infoBox: { backgroundColor: C.sand, borderRadius: 14, padding: 14, marginTop: 4, borderWidth: 1, borderColor: C.border },
  infoText: { fontSize: 12, color: C.muted, lineHeight: 18 },
  doneIconContainer: { width: 100, height: 100, borderRadius: 50, backgroundColor: C.successLight, alignItems: 'center', justifyContent: 'center', marginBottom: 30 },
  doneIcon: { fontSize: 50 },
  doneBigTitle: { fontSize: 24, fontWeight: '800', color: C.charcoal, marginBottom: 12, textAlign: 'center' },
  doneBigSubtitle: { fontSize: 15, color: C.slate, textAlign: 'center', lineHeight: 24, marginBottom: 30 },
  doneNote: { fontSize: 13, color: C.muted, marginTop: 40, textAlign: 'center', fontStyle: 'italic' }
});
