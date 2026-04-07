import React, { useState, useContext } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  KeyboardAvoidingView, Platform, Alert,
} from 'react-native';
import { C } from '../constants/theme';
import FieldInput from '../components/FieldInput';
import Btn from '../components/Btn';
import { AppContext } from '../context/AppContext';
import { login as apiLogin } from '../api';

export default function LoginScreen({ navigation }) {
  const { loginUser } = useContext(AppContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    setError('');
    if (!email.trim() || !password.trim()) {
      setError('Please enter your email and password.');
      return;
    }

    setLoading(true);

    try {
      const res = await apiLogin(email.trim(), password);
      // Our API returns the user object directly along with the token
      await loginUser(res.token, res);
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Welcome Back</Text>
        <Text style={styles.subtitle}>Log in to continue your health journey.</Text>
      </View>

      <View style={styles.form}>
        {!!error && (
          <View style={styles.errorBox}>
            <Text style={styles.errorText}>⚠ {error}</Text>
          </View>
        )}

        <FieldInput
          label="Email Address"
          placeholder="email@example.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <FieldInput
          label="Password"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <Btn onPress={handleLogin} style={styles.loginBtn}>
          {loading ? 'Logging in…' : 'Log In'}
        </Btn>

        <TouchableOpacity style={styles.forgotBtn}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.cream },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 30,
    backgroundColor: C.sage,
  },
  backBtn: {
    width: 40, height: 40, borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center', justifyContent: 'center',
    marginBottom: 20,
  },
  backIcon: { fontSize: 30, color: '#fff', marginTop: -4 },
  title: { fontSize: 28, fontWeight: '800', color: '#fff' },
  subtitle: { fontSize: 15, color: 'rgba(255,255,255,0.8)', marginTop: 8 },
  form: {
    flex: 1, padding: 24, marginTop: -20,
    backgroundColor: C.cream,
    borderTopLeftRadius: 24, borderTopRightRadius: 24,
  },
  errorBox: {
    backgroundColor: '#FEE2E2', borderRadius: 10,
    padding: 12, marginBottom: 16,
  },
  errorText: { color: '#DC2626', fontSize: 14, fontWeight: '600' },
  loginBtn: { marginTop: 10 },
  forgotBtn: { marginTop: 20, alignItems: 'center' },
  forgotText: { color: C.muted, fontSize: 14, fontWeight: '600' },
  hintBox: {
    marginTop: 32, padding: 16,
    backgroundColor: 'rgba(0,0,0,0.04)',
    borderRadius: 12, borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.06)',
  },
  hintTitle: { fontSize: 11, fontWeight: '700', color: C.muted, marginBottom: 8, letterSpacing: 0.5 },
  hint: { fontSize: 12, color: C.slate, marginBottom: 4, lineHeight: 18 },
});
