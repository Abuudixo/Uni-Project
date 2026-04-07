import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// In Expo, 10.0.2.2 points to localhost on the host machine for Android Emulators.
// For physical devices, you must use your computer's actual WiFi IP address (e.g., 192.168.1.5)
const LOCAL_IP = "192.168.100.39"; // ⚠️ Replace this with your computer's IPv4 address!
const PORT = "5001";

// Automatically choose URL based on environment
const BASE_URL = Platform.OS === 'android' && __DEV__ 
  ? `http://10.0.2.2:${PORT}/api`
  : `http://${LOCAL_IP}:${PORT}/api`;

// Helper to get auth headers
const getHeaders = async () => {
  const token = await AsyncStorage.getItem('userToken');
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };
};

export async function registerPatient(formData) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Registration failed');
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Login failed');
  return res.json();
}

export async function getMe() {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    headers: await getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to get user profile");
  return res.json();
}

export async function getPatients() {
  const res = await fetch(`${BASE_URL}/users`, {
    headers: await getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}

export async function getPatient(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    headers: await getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch patient");
  return res.json();
}

export async function submitAssessment(assessmentData) {
  // assessmentData: { patient: userId, assessmentType: 'mentalHealth', score: 25, breakdown: {} }
  const res = await fetch(`${BASE_URL}/assessments`, {
    method: "POST",
    headers: await getHeaders(),
    body: JSON.stringify(assessmentData),
  });
  if (!res.ok) throw new Error((await res.json()).message || 'Failed to submit assessment');
  return res.json();
}

export async function getAssessments() {
  // Allows Doctor to view all assessments
  const res = await fetch(`${BASE_URL}/assessments`, {
    headers: await getHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch assessments");
  return res.json();
}

export async function deletePatient(id) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: "DELETE",
    headers: await getHeaders(),
  });
  if (!res.ok) throw new Error((await res.json()).message || "Failed to delete patient");
  return res.json();
}


