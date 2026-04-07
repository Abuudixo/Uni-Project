import { C } from '../constants/theme';

export const ASSESSMENTS = {
  mentalHealth: {
    key: "mentalHealth",
    name: "Mental Health Assessment",
    full: "Somali Mental Health Comprehensive Screening",
    about: "Screening across 11 psychiatric categories",
    duration: "~10 min",
    icon: "🧠",
    color: C.sage,
    colorLight: C.mint,
    questions: [
      { q: "Miyay kugu dhacdaa inaad walwal dareento sabab la'aan?", category: "Anxiety", options: ["Maya", "Mararka qaar", "Badanaa", "Haa"] },
      { q: "Intee in le'eg ayaad dareentaa marnaansho gudaha ah?", category: "Borderline", options: ["Maya", "Wax yar", "Aad"] },
      { q: "Miyay jiraan codad aad maqasho adigoo kaligaa ah?", category: "Schizophrenia", options: ["Maya", "Mararka qaar", "Badanaa", "Haa"] },
      { q: "Muxuu yahay dareenkaaga ku saabsan rajada mustaqbalka?", category: "Depression", options: ["Rajo fiican", "Rajo yar", "Ma jirto rajo"] },
      { q: "Intee jeer ayuu xanaaqaagu kugu keenaa inaad wax jebiso?", category: "Disruptive", options: ["Maya", "Mararka qaar", "Badanaa"] },
      { q: "Miyay kugu adag tahay inaad hal meel ku nagaato?", category: "ADHD", options: ["Maya", "Mararka qaar", "Badanaa", "Haa"] },
      { q: "Xusuusta dhacdooyinkii hore miyay kugu soo laab-laabataa?", category: "PTSD", options: ["Maya", "Mararka qaar", "Badanaa", "Haa"] },
      { q: "Intee in le'eg ayay kugu adag tahay eegmada indhaha?", category: "Autism", options: ["Maya", "Wax yar", "Aad"] },
      { q: "Miyay dhacdaa inaad dareento firfircooni xad-dhaaf ah?", category: "Bipolar", options: ["Maya", "Mararka qaar", "Badanaa", "Haa"] },
      { q: "Sidee u aragtaa xawaaraha hadalkaaga iyo fahankaaga?", category: "Neurodevelopmental", options: ["Aad u gaabis ah", "Waa caadi", "Degdeg badan"] },
      { q: "Intee jeer ayaad been sheegtaa si aad dantaada u gaarto?", category: "Antisocial", options: ["Marnaba", "Mararka qaar", "Badanaa"] },
      { q: "Miyay kugu adag tahay inaad qolka ka baxdo murugo dartiis?", category: "Depression", options: ["Maya", "Mararka qaar", "Badanaa", "Haa"] },
      { q: "Intee in le'eg ayuu wadnuhu ku bood-boodaa markaad naxdo?", category: "Anxiety", options: ["Maya", "Wax yar", "Badanaa", "Aad"] },
      { q: "Sidee u aragtaa fikirka ah inay awoodo ku xukumayaan?", category: "Schizophrenia", options: ["Ma dareemo", "Mararka qaar", "Waan dareemaa"] },
      { q: "Miyay buuqa iyo iftiinka badan ku dhibaan?", category: "Autism", options: ["Maya", "Mararka qaar", "Badanaa", "Haa"] },
      { q: "Intee jeer ayuu dareenkaagu si degdeg ah isu beddelaa?", category: "Bipolar", options: ["Marnaba", "Mararka qaar", "Mar walba"] },
      { q: "Miyay kugu adag tahay inaad raacdo awaamiirta laguu siiyo?", category: "Disruptive", options: ["Maya", "Mararka qaar", "Badanaa", "Haa"] },
      { q: "Sidee ayay u lumaysaa diiraddaada markaad shaqaynayso?", category: "ADHD", options: ["Maya", "Aad uma lumayso", "Si fudud"] },
      { q: "Miyay ku dhibaysaa haddii aad qof kale dhib u geysato?", category: "Antisocial", options: ["Haa", "Mararka qaar", "Maya"] },
      { q: "Intee in le'eg ayaad ka naxdaa dhawaaqyada lama filaan ah?", category: "PTSD", options: ["Maya", "Wax yar", "Aad"] },
    ],
    maxScore: 60,
    thresholds: [
      { max: 15, label: "Minimal concern", color: C.success, bg: C.successLight },
      { max: 30, label: "Mild symptoms", color: C.amber, bg: C.amberLight },
      { max: 45, label: "Moderate symptoms", color: C.warn, bg: C.warnLight },
      { max: 60, label: "High priority", color: C.danger, bg: C.dangerLight }
    ]
  }
};

export function getSev(score, t) {
  return t.find(x => score <= x.max) || t[t.length - 1];
}
