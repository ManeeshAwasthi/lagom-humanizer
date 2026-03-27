export interface DetectionResult {
  score: number;
  label: "Likely Human" | "Mixed" | "Likely AI" | "Almost Certainly AI";
}

const AI_FILLER_PHRASES = [
  "it is important to note",
  "it is worth noting",
  "in conclusion",
  "furthermore",
  "it is worth mentioning",
  "as an AI language model",
  "delve into",
  "in today's world",
  "it is crucial",
  "in summary",
  "this essay will",
  "it should be noted",
  "needless to say",
  "it goes without saying",
  "in the realm of",
  "in the field of",
  "plays a crucial role",
  "plays a vital role",
  "it is essential",
  "at the end of the day",
  "when it comes to",
  "in terms of",
  "as previously mentioned",
  "as mentioned above",
  "it is worth noting that",
  "one must consider",
  "it can be argued",
  "it is undeniable",
  "it is clear that",
  "it is evident that",
  "in light of",
  "taking into account",
  "it is imperative",
  "in order to",
  "with regards to",
  "in this day and age",
];

const AI_STARTER_WORDS = ["the", "this", "it", "however", "moreover", "additionally", "furthermore", "therefore", "consequently", "in"];

function getSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 10);
}

function getWords(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^a-z\s]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

function avgSentenceLengthScore(sentences: string[]): number {
  if (sentences.length === 0) return 0;
  const lengths = sentences.map((s) => s.split(/\s+/).length);
  const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  // AI tends to write sentences of 20-30 words uniformly
  // Humans average 15-20 with high variance
  if (avg < 12) return 10;
  if (avg < 18) return 25;
  if (avg < 24) return 50;
  if (avg < 30) return 70;
  return 85;
}

function burstiScore(sentences: string[]): number {
  if (sentences.length < 3) return 50;
  const lengths = sentences.map((s) => s.split(/\s+/).length);
  const avg = lengths.reduce((a, b) => a + b, 0) / lengths.length;
  const variance =
    lengths.reduce((sum, l) => sum + Math.pow(l - avg, 2), 0) / lengths.length;
  const stdDev = Math.sqrt(variance);
  // High std dev = human (bursty). Low std dev = AI (uniform)
  // Humans: stdDev often > 8. AI: stdDev often < 5
  if (stdDev > 12) return 5;
  if (stdDev > 8) return 20;
  if (stdDev > 5) return 45;
  if (stdDev > 3) return 65;
  return 85;
}

function vocabularyDiversityScore(words: string[]): number {
  if (words.length === 0) return 50;
  const unique = new Set(words).size;
  const ttr = unique / words.length;
  // High TTR = diverse = more human
  // AI often repeats vocabulary: TTR around 0.4-0.55
  // Humans in longer texts: TTR 0.45-0.7 but varies more
  if (ttr > 0.7) return 10;
  if (ttr > 0.6) return 25;
  if (ttr > 0.5) return 45;
  if (ttr > 0.4) return 65;
  return 80;
}

function fillerPhraseScore(text: string): number {
  const lower = text.toLowerCase();
  const wordCount = text.split(/\s+/).length;
  let hits = 0;
  for (const phrase of AI_FILLER_PHRASES) {
    let idx = 0;
    while ((idx = lower.indexOf(phrase, idx)) !== -1) {
      hits++;
      idx += phrase.length;
    }
  }
  // Normalise: hits per 100 words
  const rate = (hits / Math.max(wordCount, 1)) * 100;
  if (rate === 0) return 10;
  if (rate < 0.5) return 30;
  if (rate < 1) return 55;
  if (rate < 2) return 75;
  return 90;
}

function sentenceStarterScore(sentences: string[]): number {
  if (sentences.length === 0) return 50;
  const starters = sentences.map((s) =>
    s.split(/\s+/)[0].toLowerCase().replace(/[^a-z]/g, "")
  );
  const aiStarters = starters.filter((w) => AI_STARTER_WORDS.includes(w));
  const ratio = aiStarters.length / starters.length;
  if (ratio < 0.2) return 10;
  if (ratio < 0.35) return 30;
  if (ratio < 0.5) return 55;
  if (ratio < 0.65) return 72;
  return 88;
}

function getLabel(score: number): DetectionResult["label"] {
  if (score <= 30) return "Likely Human";
  if (score <= 60) return "Mixed";
  if (score <= 80) return "Likely AI";
  return "Almost Certainly AI";
}

export function detectAI(text: string): DetectionResult {
  if (!text || text.trim().length === 0) {
    return { score: 0, label: "Likely Human" };
  }

  const sentences = getSentences(text);
  const words = getWords(text);

  // Weighted combination of sub-scores
  const avgLen = avgSentenceLengthScore(sentences);    // weight 0.20
  const burst = burstiScore(sentences);                // weight 0.30
  const vocabDiv = vocabularyDiversityScore(words);    // weight 0.15
  const filler = fillerPhraseScore(text);              // weight 0.20
  const starters = sentenceStarterScore(sentences);   // weight 0.15

  const raw =
    avgLen * 0.2 +
    burst * 0.3 +
    vocabDiv * 0.15 +
    filler * 0.2 +
    starters * 0.15;

  const score = Math.round(Math.min(100, Math.max(0, raw)));
  return { score, label: getLabel(score) };
}
