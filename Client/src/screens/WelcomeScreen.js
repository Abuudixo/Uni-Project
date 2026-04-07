import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, useWindowDimensions, StatusBar } from 'react-native';
import { C } from '../constants/theme';
import Btn from '../components/Btn';

export default function WelcomeScreen({ navigation }) {
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor={C.sageDark} />
      
      <View style={[styles.content, isTablet && styles.contentTablet]}>
        <View style={styles.heroSection}>
          <View style={styles.logoBadge}>
            <Text style={styles.logoIcon}>🧠</Text>
          </View>
          <Text style={styles.brand}>MINDBRIDGE</Text>
          <Text style={styles.title}>Your health journey starts here.</Text>
          <Text style={styles.subtitle}>
            Secure, private clinical assessments to help your care team support you better before your first session even begins.
          </Text>
        </View>

        <View style={styles.features}>
          {[
            { icon: "🔒", title: "100% Private", desc: "HIPAA-compliant and encrypted" },
            { icon: "⏱", title: "Fast", desc: "Takes less than 10 minutes" },
            { icon: "🩺", title: "Clinical", desc: "Standardized medical assessments" }
          ].map((f, i) => (
            <View key={i} style={styles.featureItem}>
              <View style={styles.featureIconBox}>
                <Text style={styles.featureIcon}>{f.icon}</Text>
              </View>
              <View>
                <Text style={styles.featureTitle}>{f.title}</Text>
                <Text style={styles.featureDesc}>{f.desc}</Text>
              </View>
            </View>
          ))}
        </View>

      </View>

      <View style={[styles.footer, isTablet && styles.footerTablet]}>
        <Btn 
          onPress={() => navigation.navigate('Registration')} 
          style={styles.actionBtn}
        >
          <Text style={styles.btnText}>Get Started →</Text>
        </Btn>
        <Btn 
          onPress={() => navigation.navigate('Login')} 
          variant="ghost"
          style={styles.loginBtn}
        >
          <Text style={styles.loginBtnText}>I already have an account</Text>
        </Btn>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: C.sageDark,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 60,
  },
  contentTablet: {
    paddingHorizontal: 60,
    paddingTop: 100,
  },
  heroSection: {
    marginBottom: 40,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: 20,
    backgroundColor: C.sageLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)'
  },
  logoIcon: {
    fontSize: 32,
  },
  brand: {
    fontSize: 13,
    fontWeight: '700',
    color: C.mint,
    letterSpacing: 2,
    marginBottom: 12,
  },
  title: {
    fontSize: 36,
    fontWeight: '800',
    color: '#fff',
    lineHeight: 42,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: C.mintDark,
    lineHeight: 24,
  },
  features: {
    marginTop: 20,
    gap: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  featureIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  featureIcon: {
    fontSize: 20,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 13,
    color: C.mintDark,
  },
  footer: {
    padding: 24,
    paddingBottom: 40,
    backgroundColor: C.sageDark,
  },
  footerTablet: {
    paddingHorizontal: 60,
    paddingBottom: 60,
  },
  actionBtn: {
    width: '100%',
    backgroundColor: '#fff',
    paddingVertical: 18,
    borderRadius: 16,
  },
  btnText: {
    color: C.sageDark,
    fontSize: 16,
    fontWeight: '700',
  },
  loginBtn: {
    width: '100%',
    marginTop: 12,
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.3)',
    paddingVertical: 18,
    borderRadius: 16,
  },
  loginBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  }
});
