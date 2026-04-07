import React, { useState, useContext, useMemo } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { C } from '../constants/theme';
import { ASSESSMENTS, getSev } from '../data/assessments';
import { submitAssessment } from '../api';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import NavBar from '../components/NavBar';
import ProgressBar from '../components/ProgressBar';
import Btn from '../components/Btn';

export default function AssessmentQuizScreen({ route, navigation }) {
  const { assessmentKey } = route.params;
  const a = ASSESSMENTS[assessmentKey];
  const { completeAssessmentLocal } = useContext(AppContext);
  
  // Randomize questions once on mount
  const shuffledQuestions = useMemo(() => {
    return [...a.questions].sort(() => Math.random() - 0.5);
  }, [assessmentKey]);

  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [finished, setFinished] = useState(false);

  const currentQuestion = shuffledQuestions[idx];

  const calculateScore = () => {
    return Object.values(answers).reduce((s, v) => s + v, 0);
  };

  const calculateBreakdown = () => {
    const breakdown = {};
    shuffledQuestions.forEach((q, i) => {
      const val = answers[i] ?? 0;
      if (!breakdown[q.category]) breakdown[q.category] = { score: 0, count: 0 };
      breakdown[q.category].score += val;
      breakdown[q.category].count += 1;
    });
    return breakdown;
  };

  const score = calculateScore();
  const sev = getSev(score, a.thresholds);

  const pick = val => {
    const next = { ...answers, [idx]: val };
    setAnswers(next);
    
    if (idx < shuffledQuestions.length - 1) {
      setTimeout(() => setIdx(i => i + 1), 260);
    } else {
      setTimeout(async () => {
        const finalBreakdown = calculateBreakdown();
        // 1. Calculate Score & Sev
        const finalScore = Object.values(next).reduce((s, v) => s + v, 0);
        const finalSev = getSev(finalScore, a.thresholds);

        try {
          // 2. Submit to backend API
          await submitAssessment({
            assessmentType: assessmentKey,
            totalScore: finalScore,
            breakdown: finalBreakdown,
            severity: finalSev
          });

          // 3. Update local UI state
          completeAssessmentLocal(assessmentKey, finalScore, finalBreakdown);
          setFinished(true);
        } catch (err) {
          alert(`Failed to save assessment: ${err.message}`);
        }
      }, 280);
    }
  };

  const handleDownload = async () => {
    try {
      const html = `
        <html>
          <body style="font-family: sans-serif; padding: 40px; color: #333;">
            <div style="text-align: center; border-bottom: 2px dotted #2D5A27; padding-bottom: 20px; margin-bottom: 30px;">
              <h1 style="color: #2D5A27; margin: 0;">MindBridge Results</h1>
              <p style="color: #666; margin-top: 5px;">Generated on ${new Date().toLocaleDateString()}</p>
            </div>
            <div style="background: #fdfdfa; padding: 25px; border-radius: 15px; border: 1px solid #eee; margin-bottom: 30px;">
              <h2 style="margin-top: 0; color: #2D5A27; font-size: 20px;">Assessment: ${a.name}</h2>
              <div style="font-size: 32px; font-weight: bold; color: ${sev.color}; margin: 10px 0;">Score: ${score}</div>
              <div style="font-size: 18px; font-weight: 700; color: ${sev.color};">${sev.label}</div>
              <p style="font-size: 14px; color: #666; line-height: 1.6; margin-top: 15px;">Your therapist has received these results and will review them before your next session.</p>
            </div>
          </body>
        </html>
      `;
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (err) {
      alert("Download failed");
    }
  };

  const handleDone = () => {
    navigation.goBack();
  };

  if (finished) {
    return (
      <View style={styles.container}>
        <NavBar title={`${a.name} Results`} sub={a.full} onBack={handleDone} />
        
        <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 24 }}>
          <View style={[styles.resultBox, { backgroundColor: sev.bg, borderColor: `${sev.color}33` }]}>
            <Text style={{ fontSize: 48, marginBottom: 10 }}>
               {score <= 15 ? "🌱" : score <= 30 ? "🌤" : score <= 45 ? "⛅" : "🌧"}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center' }}>
              <Text style={{ fontSize: 38, fontWeight: '800', color: sev.color }}>{score}</Text>
              <Text style={{ fontSize: 18, fontWeight: '400', color: C.muted, marginBottom: 5 }}>/{a.maxScore}</Text>
            </View>
            <Text style={{ fontSize: 15, fontWeight: '700', color: sev.color, marginTop: 4 }}>{sev.label}</Text>
            <Text style={{ fontSize: 13, color: C.slate, marginTop: 8, lineHeight: 20, textAlign: 'center' }}>
              Your results have been securely submitted — your therapist will review these ahead of your session.
            </Text>
          </View>

          <Text style={styles.sectionHeader}>BREAKDOWN</Text>
          {shuffledQuestions.map((q, i) => {
            const val = answers[i] ?? 0;
            const max = q.options.length - 1;
            const high = val >= max / 2;
            return (
              <View key={i} style={styles.questionBreakdown}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
                  <Text style={{ fontSize: 13, color: C.slate, flex: 1, lineHeight: 18, paddingRight: 10 }}>{q.q}</Text>
                  <View style={[styles.scorePill, { backgroundColor: high ? a.colorLight : C.sand }]}>
                    <Text style={{ color: high ? a.color : C.muted, fontWeight: '700', fontSize: 14 }}>{val}</Text>
                  </View>
                </View>
                <ProgressBar val={val} max={max} color={high ? a.color : C.border} h={3} />
              </View>
            );
          })}
        </ScrollView>
        
        <View style={styles.footer}>
          <Btn onPress={handleDownload} variant="secondary" style={{ width: "100%", marginBottom: 10 }}>📥 Download Report (PDF)</Btn>
          <Btn onPress={handleDone} style={{ width: "100%" }}>Finish & Close</Btn>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <NavBar title={a.name} sub={`${a.about} · ${a.duration}`} onBack={() => navigation.goBack()} />
      
      <View style={styles.progressHeader}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 6 }}>
          <Text style={{ fontSize: 12, color: C.muted }}>{idx + 1} of {shuffledQuestions.length}</Text>
          <Text style={{ fontSize: 12, color: C.muted, fontWeight: '600' }}>{Math.round((idx / shuffledQuestions.length) * 100)}%</Text>
        </View>
        <ProgressBar val={idx} max={shuffledQuestions.length} color={a.color} />
      </View>

      <View style={{ flex: 1, padding: 20 }}>
        <View style={[styles.questionBox, { backgroundColor: a.colorLight, borderColor: `${a.color}33` }]}>
          <Text style={[styles.timeframe, { color: a.color }]}>FADLAN KA JAWAAB…</Text>
          <Text style={styles.questionText}>{currentQuestion.q}</Text>
        </View>

        <View style={{ flex: 1, marginTop: 16 }}>
          {currentQuestion.options.map((opt, i) => {
            const active = answers[idx] === i;
            return (
              <TouchableOpacity
                key={i}
                onPress={() => pick(i)}
                activeOpacity={0.7}
                style={[
                  styles.optionBtn,
                  { 
                    backgroundColor: active ? a.colorLight : C.white,
                    borderColor: active ? a.color : C.border
                  }
                ]}
              >
                <View style={[styles.optionIndexBox, { backgroundColor: active ? a.color : C.sand }]}>
                   <Text style={{ color: active ? '#fff' : C.muted, fontWeight: '700', fontSize: 13 }}>{i}</Text>
                </View>
                <Text style={{ fontSize: 14, fontWeight: '500', color: C.charcoal }}>{opt}</Text>
              </TouchableOpacity>
            )
          })}
        </View>

        {idx > 0 && (
          <TouchableOpacity onPress={() => setIdx(i => i - 1)} style={{ paddingVertical: 15, alignItems: 'center' }}>
            <Text style={{ color: C.muted, fontWeight: '600' }}>← Previous</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.cream },
  resultBox: { borderRadius: 20, padding: 20, borderWidth: 1, marginBottom: 20, alignItems: "center" },
  sectionHeader: { fontSize: 11, fontWeight: '700', color: C.muted, letterSpacing: 0.5, marginBottom: 10 },
  questionBreakdown: { backgroundColor: C.white, borderRadius: 12, paddingVertical: 10, paddingHorizontal: 13, borderWidth: 1, borderColor: C.border, marginBottom: 8 },
  scorePill: { minWidth: 28, height: 28, borderRadius: 8, alignItems: 'center', justifyContent: 'center' },
  footer: { paddingTop: 12, paddingBottom: 32, paddingHorizontal: 18, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.white },
  progressHeader: { paddingVertical: 12, paddingHorizontal: 18, backgroundColor: C.white, borderBottomWidth: 1, borderBottomColor: C.border },
  questionBox: { borderRadius: 18, padding: 18, borderWidth: 1 },
  timeframe: { fontSize: 11, fontWeight: '700', letterSpacing: 0.5, marginBottom: 8 },
  questionText: { fontSize: 18, fontWeight: '700', color: C.charcoal, lineHeight: 28 },
  optionBtn: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderRadius: 13, paddingVertical: 13, paddingHorizontal: 15, marginBottom: 9 },
  optionIndexBox: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginRight: 13 }
});
