import { C } from '../constants/theme';

export const ASSESSMENTS = {
  phq9: {
    key: "phq9", name: "PHQ-9", full: "Patient Health Questionnaire", about: "Depression screening", duration: "~5 min", icon: "🌧", color: C.blue, colorLight: C.blueLight,
    questions: ["Little interest or pleasure in doing things", "Feeling down, depressed, or hopeless", "Trouble falling or staying asleep, or sleeping too much", "Feeling tired or having little energy", "Poor appetite or overeating", "Feeling bad about yourself — or that you are a failure", "Trouble concentrating on things", "Moving or speaking slowly, or being fidgety/restless", "Thoughts that you would be better off dead, or of hurting yourself"],
    scale: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    maxScore: 27,
    thresholds: [{ max: 4, label: "Minimal", color: C.success, bg: C.successLight }, { max: 9, label: "Mild", color: C.amber, bg: C.amberLight }, { max: 14, label: "Moderate", color: C.warn, bg: C.warnLight }, { max: 19, label: "Mod. Severe", color: C.danger, bg: C.dangerLight }, { max: 27, label: "Severe", color: C.danger, bg: C.dangerLight }],
  },
  gad7: {
    key: "gad7", name: "GAD-7", full: "Generalized Anxiety Disorder Scale", about: "Anxiety screening", duration: "~3 min", icon: "⚡", color: C.warn, colorLight: C.warnLight,
    questions: ["Feeling nervous, anxious, or on edge", "Not being able to stop or control worrying", "Worrying too much about different things", "Trouble relaxing", "Being so restless that it's hard to sit still", "Becoming easily annoyed or irritable", "Feeling afraid as if something awful might happen"],
    scale: ["Not at all", "Several days", "More than half the days", "Nearly every day"],
    maxScore: 21,
    thresholds: [{ max: 4, label: "Minimal", color: C.success, bg: C.successLight }, { max: 9, label: "Mild", color: C.amber, bg: C.amberLight }, { max: 14, label: "Moderate", color: C.warn, bg: C.warnLight }, { max: 21, label: "Severe", color: C.danger, bg: C.dangerLight }],
  },
};

export function getSev(score, t) {
  return t.find(x => score <= x.max) || t[t.length - 1];
}
