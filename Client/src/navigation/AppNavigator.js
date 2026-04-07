import React, { useContext } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppContext } from '../context/AppContext';

// Auth screens
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegistrationScreen from '../screens/RegistrationScreen';

// Patient screens
import AssessmentListScreen from '../screens/AssessmentListScreen';
import AssessmentQuizScreen from '../screens/AssessmentQuizScreen';

// Doctor screen (includes admin dashboard + patient review)
import DoctorReviewScreen from '../screens/DoctorReviewScreen';

const Stack = createNativeStackNavigator();
const NO_HEADER = { headerShown: false };

// ─── Auth Stack ───────────────────────────────────────────────────────────────
function AuthStack() {
  return (
    <Stack.Navigator screenOptions={NO_HEADER}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Registration" component={RegistrationScreen} />
    </Stack.Navigator>
  );
}

// ─── Patient Stack ────────────────────────────────────────────────────────────
function PatientStack() {
  return (
    <Stack.Navigator screenOptions={NO_HEADER}>
      <Stack.Screen name="AssessmentList" component={AssessmentListScreen} />
      <Stack.Screen name="AssessmentQuiz" component={AssessmentQuizScreen} />
    </Stack.Navigator>
  );
}

// ─── Doctor Stack (doctor = admin + doctor combined) ─────────────────────────
function DoctorStack() {
  return (
    <Stack.Navigator screenOptions={NO_HEADER}>
      <Stack.Screen name="DoctorHome" component={DoctorReviewScreen} />
    </Stack.Navigator>
  );
}

// ─── Root Navigator ───────────────────────────────────────────────────────────
export default function AppNavigator() {
  const { user } = useContext(AppContext);

  if (!user) return <AuthStack />;

  switch (user.role) {
    case 'doctor':
    case 'admin':  return <DoctorStack />;
    case 'patient':
    default:       return <PatientStack />;
  }
}
