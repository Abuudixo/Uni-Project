import React, { useState, useContext } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { C } from '../constants/theme';
import FieldInput from '../components/FieldInput';
import Btn from '../components/Btn';
import { AppContext } from '../context/AppContext';
import { registerPatient } from '../api';

export default function RegistrationScreen({ navigation }) {
  const { loginUser } = useContext(AppContext);
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    firstName: "", lastName: "", dob: "", email: "", phone: "", pronouns: "",
    password: "", // ⬅️ NEW FIELD
    consentTreatment: false, consentData: false
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const toggleDx = d => set("diagnoses", form.diagnoses.includes(d) 
    ? form.diagnoses.filter(x => x !== d) 
    : [...form.diagnoses, d]);

  const dxOptions = ["Depression", "Anxiety", "PTSD", "OCD", "Bipolar", "ADHD", "Panic Disorder", "Social Anxiety", "Grief", "Other"];
  
  const canAdvanceList = [
    form.firstName && form.lastName && form.dob && form.email && form.password.length >= 6,
    form.consentTreatment && form.consentData
  ];
  const canAdvance = canAdvanceList[step];
  const stepTitles = ["Tell us about yourself", "Review & consent"];

  const handleDone = async () => {
    try {
      const payload = {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email.trim(),
        password: form.password,
        role: "patient",
      };
      
      const res = await registerPatient(payload);
      // Wait for local storage login save
      await loginUser(res.token, res);

      navigation.navigate('AssessmentList');
    } catch (err) {
      alert(`Registration failed: ${err.message}`);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1, backgroundColor: C.cream }}>
      <View style={styles.header}>
        <View style={styles.headerTopRow}>
           <TouchableOpacity onPress={() => step > 0 ? setStep(s => s - 1) : navigation.goBack()} style={styles.backBtnWrapper}>
             <Text style={styles.backBtnText}>‹</Text>
           </TouchableOpacity>
           <Text style={styles.headerSubtitle}>MINDBRIDGE</Text>
        </View>
        <Text style={styles.headerTitle}>{stepTitles[step]}</Text>
        <Text style={styles.headerStep}>Step {step + 1} of 2</Text>
        <View style={styles.progressContainer}>
          {[0, 1].map(i => (
            <View key={i} style={[styles.progressBar, { backgroundColor: i <= step ? "rgba(255,255,255,0.9)" : "rgba(255,255,255,0.25)" }]} />
          ))}
        </View>
      </View>

      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 18 }}>
        {step === 0 && (
          <View>
            <View style={styles.row}>
              <View style={{ flex: 1, marginRight: 8 }}>
                <FieldInput label="First Name *" placeholder="Jamie" value={form.firstName} onChangeText={t => set("firstName", t)} />
              </View>
              <View style={{ flex: 1, marginLeft: 8 }}>
                <FieldInput label="Last Name *" placeholder="Reyes" value={form.lastName} onChangeText={t => set("lastName", t)} />
              </View>
            </View>
            <FieldInput label="Date of Birth *" placeholder="YYYY-MM-DD" value={form.dob} onChangeText={t => set("dob", t)} />
            <FieldInput label="Email Address *" keyboardType="email-address" autoCapitalize="none" placeholder="you@email.com" value={form.email} onChangeText={t => set("email", t)} />
            <FieldInput label="Password *" secureTextEntry placeholder="Minimum 6 characters" value={form.password} onChangeText={t => set("password", t)} />
            <FieldInput label="Phone Number" keyboardType="phone-pad" placeholder="+1..." value={form.phone} onChangeText={t => set("phone", t)} />
            
            <View style={{ marginBottom: 14 }}>
              <Text style={styles.sectionTitle}>Pronouns</Text>
              <View style={styles.wrapContainer}>
                {["He/Him", "She/Her", "They/Them", "Prefer not to say"].map(p => {
                  const active = form.pronouns === p;
                  return (
                    <TouchableOpacity key={p} onPress={() => set("pronouns", p)} style={[styles.pill, active ? styles.pillActive : styles.pillInactive]}>
                      <Text style={active ? styles.pillTextActive : styles.pillTextInactive}>{p}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          </View>
        )}



        {step === 1 && (
          <View>
            <Text style={styles.helperText}>Please read and agree to the following before we begin.</Text>
            {[
              { key: "consentTreatment", icon: "📋", title: "Informed Consent for Therapy *", desc: "I understand I am entering a therapeutic relationship with a licensed mental health professional." },
              { key: "consentData", icon: "🔒", title: "Data Privacy & HIPAA *", desc: "I consent to my health data being stored in an encrypted, HIPAA-compliant system shared only with my care team." },
            ].map(item => {
              const checked = form[item.key];
              return (
                <TouchableOpacity key={item.key} onPress={() => set(item.key, !checked)} activeOpacity={0.8} style={[styles.consentBox, checked ? styles.consentBoxActive : undefined]}>
                  <View style={[styles.checkbox, checked ? styles.checkboxActive : undefined]}>
                    <Text style={{ color: '#fff', fontSize: 13, fontWeight: '700' }}>{checked ? "✓" : ""}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.consentTitle}>{item.icon}  {item.title}</Text>
                    <Text style={styles.consentDesc}>{item.desc}</Text>
                  </View>
                </TouchableOpacity>
              )
            })}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Btn onPress={() => step < 1 ? setStep(s => s + 1) : handleDone()} disabled={!canAdvance} style={{ width: "100%" }}>
          {step < 1 ? "Continue →" : "Complete Registration"}
        </Btn>
        {step > 0 && (
          <TouchableOpacity onPress={() => setStep(s => s - 1)} style={{ marginTop: 15, alignItems: 'center' }}>
            <Text style={{ color: C.muted, fontWeight: '600' }}>← Back</Text>
          </TouchableOpacity>
        )}
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: C.sage, 
    paddingTop: Platform.OS === 'ios' ? 60 : 30, paddingBottom: 24, paddingHorizontal: 20
  },
  headerTopRow: {
    flexDirection: 'row', alignItems: 'center', marginBottom: 12
  },
  backBtnWrapper: {
    width: 34, height: 34, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', marginRight: 12
  },
  backBtnText: {
    color: '#fff', fontSize: 24, marginTop: -4, fontWeight: '500'
  },
  headerSubtitle: {
    fontSize: 11, fontWeight: '600', opacity: 0.65, color: '#fff', letterSpacing: 1
  },
  headerTitle: {
    fontSize: 22, fontWeight: '800', color: '#fff',
  },
  headerStep: {
    fontSize: 13, opacity: 0.8, marginTop: 6, color: '#fff',
  },
  progressContainer: {
    flexDirection: 'row', gap: 6, marginTop: 14
  },
  progressBar: {
    flex: 1, height: 4, borderRadius: 99
  },
  row: {
    flexDirection: 'row', justifyContent: 'space-between'
  },
  sectionTitle: {
    fontSize: 12, fontWeight: '700', color: C.slate, marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase'
  },
  wrapContainer: {
    flexDirection: 'row', flexWrap: 'wrap', gap: 8, marginBottom: 18
  },
  pill: {
    paddingVertical: 7, paddingHorizontal: 13, borderRadius: 99, borderWidth: 1.5
  },
  pillActive: {
    borderColor: C.sage, backgroundColor: C.mint
  },
  pillInactive: {
    borderColor: C.border, backgroundColor: C.white
  },
  pillTextActive: {
    fontSize: 13, fontWeight: '600', color: C.sageDark
  },
  pillTextInactive: {
    fontSize: 13, fontWeight: '500', color: C.slate
  },
  helperText: {
    fontSize: 13, color: C.muted, marginBottom: 16, lineHeight: 20
  },
  consentBox: {
    backgroundColor: C.white, borderRadius: 14, padding: 14, marginBottom: 10, borderWidth: 1.5, borderColor: C.border, flexDirection: 'row', gap: 12
  },
  consentBoxActive: {
    backgroundColor: C.mint, borderColor: C.sage
  },
  checkbox: {
    width: 22, height: 22, borderRadius: 6, marginTop: 1, backgroundColor: C.white, borderWidth: 2, borderColor: C.border, alignItems: 'center', justifyContent: 'center'
  },
  checkboxActive: {
    backgroundColor: C.sage, borderColor: C.sage
  },
  consentTitle: {
    fontSize: 14, fontWeight: '700', color: C.charcoal, marginBottom: 4
  },
  consentDesc: {
    fontSize: 12, color: C.slate, lineHeight: 18
  },
  footer: {
    paddingTop: 12, paddingBottom: 32, paddingHorizontal: 18, borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.white
  }
});
