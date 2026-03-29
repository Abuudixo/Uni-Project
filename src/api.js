const API = "/api";

export async function registerPatient(formData) {
  const res = await fetch(`${API}/patients`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

export async function getPatients() {
  const res = await fetch(`${API}/patients`);
  if (!res.ok) throw new Error("Failed to fetch patients");
  return res.json();
}

export async function getPatient(id) {
  const res = await fetch(`${API}/patients/${id}`);
  if (!res.ok) throw new Error("Failed to fetch patient");
  return res.json();
}

export async function submitAssessment(patientId, key, score) {
  const res = await fetch(`${API}/assessments/${patientId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ key, score }),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

export async function login(email, password) {
  const res = await fetch(`${API}/patients/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error((await res.json()).error);
  return res.json();
}

export async function updatePatient(id, data) {
  const res = await fetch(`${API}/patients/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Update failed");
  return res.json();
}
