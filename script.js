const fields = {
  issue: document.querySelector("#issue"),
  customIssue: document.querySelector("#customIssue"),
  message: document.querySelector("#message"),
  metaphorSubject: document.querySelector("#metaphorSubject"),
  metaphorMeaning: document.querySelector("#metaphorMeaning"),
  seeImage: document.querySelector("#seeImage"),
  hearImage: document.querySelector("#hearImage"),
  feelImage: document.querySelector("#feelImage"),
  simileLine: document.querySelector("#simileLine"),
  personificationLine: document.querySelector("#personificationLine"),
  alliterationLine: document.querySelector("#alliterationLine"),
  symbolismLine: document.querySelector("#symbolismLine"),
  hyperboleLine: document.querySelector("#hyperboleLine"),
  rhetoricalQuestionLine: document.querySelector("#rhetoricalQuestionLine"),
  anaphoraLine: document.querySelector("#anaphoraLine"),
  contrastLine: document.querySelector("#contrastLine"),
  ironyLine: document.querySelector("#ironyLine"),
  motifLine: document.querySelector("#motifLine"),
  allusionLine: document.querySelector("#allusionLine"),
  metaphorExplanation: document.querySelector("#metaphorExplanation"),
  imageryExplanation: document.querySelector("#imageryExplanation"),
  chorusExplanation: document.querySelector("#chorusExplanation"),
  languageExplanation: document.querySelector("#languageExplanation"),
  chorusLine: document.querySelector("#chorusLine"),
  chorusResponse: document.querySelector("#chorusResponse"),
  verse1: document.querySelector("#verse1"),
  verse2: document.querySelector("#verse2"),
  verse3: document.querySelector("#verse3")
};

const checks = {
  metaphor: document.querySelector("#metaphorCheck"),
  imagery: document.querySelector("#imageryCheck"),
  repetition: document.querySelector("#repetitionCheck"),
  simile: document.querySelector("#simileCheck"),
  personification: document.querySelector("#personificationCheck"),
  alliteration: document.querySelector("#alliterationCheck"),
  explanation: document.querySelector("#explanationCheck"),
  symbolism: document.querySelector("#symbolismCheck"),
  hyperbole: document.querySelector("#hyperboleCheck"),
  rhetoricalQuestion: document.querySelector("#rhetoricalQuestionCheck"),
  anaphora: document.querySelector("#anaphoraCheck"),
  contrast: document.querySelector("#contrastCheck"),
  irony: document.querySelector("#ironyCheck"),
  motif: document.querySelector("#motifCheck"),
  allusion: document.querySelector("#allusionCheck")
};

const feedbackGates = {
  requiredChecklist: document.querySelector("#requiredChecklistGate"),
  languageTechnique: document.querySelector("#languageTechniqueGate"),
  revisionFeedback: document.querySelector("#revisionFeedbackGate"),
  reviewFeedback: document.querySelector("#reviewFeedbackGate"),
  negativeFeedback: document.querySelector("#negativeFeedbackGate")
};

const modeButtons = document.querySelectorAll(".mode-button");
const lyricsOutput = document.querySelector("#lyricsOutput");
const feedback = document.querySelector("#feedback");
const gateFeedback = document.querySelector("#gateFeedback");
const feedbackReflection = document.querySelector("#feedbackReflection");
const reviewOutput = document.querySelector("#reviewOutput");
const downloadButtons = document.querySelectorAll(".download-option");
const downloadStatus = document.querySelector("#downloadStatus");
const suggestVerseButtons = document.querySelectorAll(".suggest-verse");
const reviewDraftButton = document.querySelector("#reviewDraft");
let draftHasCurrentReview = false;
let currentMode = "support";
let currentReviewHasNegatives = true;
let hasCurrentRevisionFeedback = false;

Object.values(checks).forEach((check) => {
  check.disabled = true;
});

Object.values(feedbackGates).forEach((check) => {
  check.disabled = true;
});

const starters = {
  support: {
    message: "I want people to notice that...",
    metaphorMeaning: "This shows...",
    simileLine: "like...",
    personificationLine: "The issue...",
    alliterationLine: "strong repeated starting sounds",
    symbolismLine: "a symbol for the issue",
    hyperboleLine: "an exaggerated line",
    rhetoricalQuestionLine: "a question with a point",
    anaphoraLine: "We... We... We...",
    contrastLine: "opposite images",
    ironyLine: "what is said versus what is true",
    motifLine: "a repeated image",
    allusionLine: "a reference listeners may know",
    metaphorExplanation: "It fits because...",
    imageryExplanation: "I want the listener to feel...",
    chorusExplanation: "The repetition matters because...",
    languageExplanation: "My strongest technique is...",
    chorusLine: "We won't be silent",
    chorusResponse: "we'll raise the truth tonight",
    verse: "I see...\nI hear...\nI feel...\nBut still we..."
  },
  standard: {
    message: "State your purpose clearly.",
    metaphorMeaning: "Explain the effect of your metaphor.",
    simileLine: "Write a simile using like or as.",
    personificationLine: "Give the issue a human action.",
    alliterationLine: "Repeat a starting sound for emphasis.",
    symbolismLine: "Choose an object that represents a bigger idea.",
    hyperboleLine: "Use exaggeration for emotional impact.",
    rhetoricalQuestionLine: "Ask a question that challenges the listener.",
    anaphoraLine: "Repeat the same opening words across lines.",
    contrastLine: "Place opposite images together.",
    ironyLine: "Show the gap between words and reality.",
    motifLine: "Repeat an image or idea across the song.",
    allusionLine: "Refer to a known event, person, text or movement.",
    metaphorExplanation: "Explain how the metaphor connects to your message.",
    imageryExplanation: "Explain the feeling your sensory images should create.",
    chorusExplanation: "Explain why repeating the chorus helps persuade the audience.",
    languageExplanation: "Identify your strongest technique and explain its effect.",
    chorusLine: "Write a memorable repeated line.",
    chorusResponse: "Write a second chorus line.",
    verse: "Draft a four-line verse."
  },
  extension: {
    message: "State the change your song demands.",
    metaphorMeaning: "Explain the deeper meaning of your metaphor.",
    simileLine: "Use like or as in a sharp comparison.",
    personificationLine: "Make an idea, place or object act human.",
    alliterationLine: "Repeat starting sounds for rhythm and emphasis.",
    symbolismLine: "Use a symbol such as chains, doors, flames or hands.",
    hyperboleLine: "Use exaggeration without losing the serious message.",
    rhetoricalQuestionLine: "Ask a question the audience cannot ignore.",
    anaphoraLine: "Repeat the same opening words across two or more lines.",
    contrastLine: "Place comfort beside hardship, silence beside noise, or power beside weakness.",
    ironyLine: "Expose a contradiction between what is claimed and what is happening.",
    motifLine: "Choose an image that can return in the verse and chorus.",
    allusionLine: "Refer to a known protest, speech, poem, song or historical moment.",
    metaphorExplanation: "Analyse how the metaphor shapes the audience's understanding.",
    imageryExplanation: "Explain how the imagery positions the audience emotionally.",
    chorusExplanation: "Explain how repetition builds urgency, unity or resistance.",
    languageExplanation: "Evaluate your strongest technique and its intended audience impact.",
    chorusLine: "Write a line that could be chanted by a crowd.",
    chorusResponse: "Write a line that answers or intensifies the chant.",
    verse: "Draft a verse that uses several techniques for impact."
  }
};

const extensionTechniqueFields = [
  fields.symbolismLine,
  fields.hyperboleLine,
  fields.rhetoricalQuestionLine,
  fields.anaphoraLine,
  fields.contrastLine,
  fields.ironyLine,
  fields.motifLine,
  fields.allusionLine
];

const verseFields = [fields.verse1, fields.verse2, fields.verse3];
const revisionOutputs = {
  1: document.querySelector("#verse1Revision"),
  2: document.querySelector("#verse2Revision"),
  3: document.querySelector("#verse3Revision")
};

function getIssue() {
  if (fields.issue.value === "custom") {
    return fields.customIssue.value.trim();
  }

  return fields.issue.value.trim();
}

function lineOrPlaceholder(value, placeholder) {
  return value.trim() || `[${placeholder}]`;
}

function getCombinedVerseText() {
  return verseFields.map((field) => field.value).join("\n").trim();
}

function getVerseLines() {
  return getCombinedVerseText().split("\n").filter((line) => line.trim());
}

function getWrittenVerseCount() {
  return verseFields.filter((field) => field.value.trim()).length;
}

function hasMinimumDraftReady() {
  const hasIssue = getIssue().trim().length > 0;
  const hasMessage = fields.message.value.trim().split(/\s+/).filter(Boolean).length >= 5;
  const hasMetaphorAttempt = fields.metaphorSubject.value.trim().length > 2;
  const imageryCount = [fields.seeImage, fields.hearImage, fields.feelImage].filter((field) => field.value.trim()).length;
  const verseOneLines = fields.verse1.value.split("\n").filter((line) => line.trim()).length;

  return hasIssue && hasMessage && hasMetaphorAttempt && imageryCount >= 2 && verseOneLines >= 4;
}

function hasOneExtraLanguageTechnique() {
  const coreTechniqueCount = [
    checks.simile,
    checks.personification,
    checks.alliteration
  ].filter((check) => check.checked).length;

  if (currentMode !== "extension") {
    return coreTechniqueCount >= 1;
  }

  const extensionTechniqueCount = [
    checks.symbolism,
    checks.hyperbole,
    checks.rhetoricalQuestion,
    checks.anaphora,
    checks.contrast,
    checks.irony,
    checks.motif,
    checks.allusion
  ].filter((check) => check.checked).length;

  return coreTechniqueCount + extensionTechniqueCount >= 1;
}

function hasFeedbackReflection() {
  return feedbackReflection.value.trim().split(/\s+/).filter(Boolean).length >= 8;
}

function hasVerseSuggestionInputs() {
  const hasIssue = getIssue().trim().length > 0;
  const hasMessage = fields.message.value.trim().split(/\s+/).filter(Boolean).length >= 5;
  const hasMetaphor = fields.metaphorSubject.value.trim().length > 2 && fields.metaphorMeaning.value.trim().length > 8;
  const imageryCount = [fields.seeImage, fields.hearImage, fields.feelImage].filter((field) => field.value.trim()).length;

  return hasIssue && hasMessage && hasMetaphor && imageryCount >= 2;
}

function formatVerses() {
  const writtenVerses = verseFields
    .map((field, index) => ({
      title: `Verse ${index + 1}`,
      text: field.value.trim()
    }))
    .filter((verse) => verse.text);

  if (!writtenVerses.length) {
    return "Verse 1\n[verse]";
  }

  return writtenVerses.map((verse) => `${verse.title}\n${verse.text}`).join("\n\n");
}

function buildLyrics() {
  const issue = lineOrPlaceholder(getIssue(), "chosen issue");
  const message = lineOrPlaceholder(fields.message.value, "main message");
  const metaphor = lineOrPlaceholder(fields.metaphorSubject.value, "metaphor");
  const metaphorMeaning = lineOrPlaceholder(fields.metaphorMeaning.value, "metaphor meaning");
  const see = lineOrPlaceholder(fields.seeImage.value, "visual image");
  const hear = lineOrPlaceholder(fields.hearImage.value, "sound image");
  const feel = lineOrPlaceholder(fields.feelImage.value, "feeling image");
  const simile = lineOrPlaceholder(fields.simileLine.value, "simile");
  const personification = lineOrPlaceholder(fields.personificationLine.value, "personification");
  const alliteration = lineOrPlaceholder(fields.alliterationLine.value, "alliteration");
  const extensionBank = currentMode === "extension" ? `
Symbolism: ${lineOrPlaceholder(fields.symbolismLine.value, "symbolism")}
Hyperbole: ${lineOrPlaceholder(fields.hyperboleLine.value, "hyperbole")}
Rhetorical question: ${lineOrPlaceholder(fields.rhetoricalQuestionLine.value, "rhetorical question")}
Anaphora: ${lineOrPlaceholder(fields.anaphoraLine.value, "anaphora")}
Contrast: ${lineOrPlaceholder(fields.contrastLine.value, "contrast")}
Irony: ${lineOrPlaceholder(fields.ironyLine.value, "irony")}
Motif: ${lineOrPlaceholder(fields.motifLine.value, "motif")}
Allusion: ${lineOrPlaceholder(fields.allusionLine.value, "allusion")}` : "";
  const chorusLine = lineOrPlaceholder(fields.chorusLine.value, "repeated chorus line");
  const chorusResponse = lineOrPlaceholder(fields.chorusResponse.value, "chorus response");
  const verses = formatVerses();
  const metaphorExplanation = lineOrPlaceholder(fields.metaphorExplanation.value, "why the metaphor fits");
  const imageryExplanation = lineOrPlaceholder(fields.imageryExplanation.value, "intended emotion");
  const chorusExplanation = lineOrPlaceholder(fields.chorusExplanation.value, "why repetition matters");
  const languageExplanation = lineOrPlaceholder(fields.languageExplanation.value, "strongest technique explanation");

  lyricsOutput.textContent = `Interactive Protest Song: ${issue}

Message
${message}

Metaphor
This issue is ${metaphor}
because ${metaphorMeaning}

${verses}

Chorus
${chorusLine}
${chorusResponse}
${chorusLine}
${chorusResponse}

Imagery Bank
I can see: ${see}
I can hear: ${hear}
I can feel: ${feel}

Figurative Language Bank
Simile: ${simile}
Personification: ${personification}
Alliteration: ${alliteration}${extensionBank ? `\n${extensionBank}` : ""}

Choice Explanations
Metaphor: ${metaphorExplanation}
Imagery: ${imageryExplanation}
Chorus: ${chorusExplanation}
Strongest technique: ${languageExplanation}

Feedback Response
${lineOrPlaceholder(feedbackReflection.value, "student response to feedback")}`;
}

function updateChecklist() {
  const hasMetaphor = fields.metaphorSubject.value.trim().length > 2 && fields.metaphorMeaning.value.trim().length > 8;
  const imageryCount = [fields.seeImage, fields.hearImage, fields.feelImage].filter((field) => field.value.trim()).length;
  const chorusWords = fields.chorusLine.value.trim().split(/\s+/).filter(Boolean);
  const verseText = getCombinedVerseText().toLowerCase();
  const chorusText = fields.chorusLine.value.toLowerCase();
  const repeatsInVerse = chorusText && verseText.includes(chorusText);
  const hasRepetition = chorusWords.length >= 3 || repeatsInVerse;
  const simileText = fields.simileLine.value.toLowerCase();
  const hasSimile = /\b(like|as)\b/.test(simileText) && simileText.trim().length > 8;
  const hasPersonification = fields.personificationLine.value.trim().split(/\s+/).filter(Boolean).length >= 4;
  const hasAlliteration = hasRepeatedStartingSound(fields.alliterationLine.value);
  const hasSymbolism = fields.symbolismLine.value.trim().length >= 3;
  const hasHyperbole = fields.hyperboleLine.value.trim().split(/\s+/).filter(Boolean).length >= 4;
  const hasRhetoricalQuestion = fields.rhetoricalQuestionLine.value.trim().includes("?");
  const hasAnaphora = hasRepeatedOpeningWord(fields.anaphoraLine.value);
  const hasContrast = fields.contrastLine.value.trim().split(/\s+/).filter(Boolean).length >= 3;
  const hasIrony = fields.ironyLine.value.trim().split(/\s+/).filter(Boolean).length >= 5;
  const hasMotif = fields.motifLine.value.trim().length >= 3;
  const hasAllusion = fields.allusionLine.value.trim().split(/\s+/).filter(Boolean).length >= 2;
  const explanationCount = [
    fields.metaphorExplanation,
    fields.imageryExplanation,
    fields.chorusExplanation,
    fields.languageExplanation
  ].filter((field) => field.value.trim().split(/\s+/).filter(Boolean).length >= 4).length;
  const hasExplanations = explanationCount >= 3;

  checks.metaphor.checked = hasMetaphor;
  checks.imagery.checked = imageryCount >= 2;
  checks.repetition.checked = hasRepetition;
  checks.simile.checked = hasSimile;
  checks.personification.checked = hasPersonification;
  checks.alliteration.checked = hasAlliteration;
  checks.explanation.checked = hasExplanations;
  checks.symbolism.checked = hasSymbolism;
  checks.hyperbole.checked = hasHyperbole;
  checks.rhetoricalQuestion.checked = hasRhetoricalQuestion;
  checks.anaphora.checked = hasAnaphora;
  checks.contrast.checked = hasContrast;
  checks.irony.checked = hasIrony;
  checks.motif.checked = hasMotif;
  checks.allusion.checked = hasAllusion;

  const extensionCount = [
    hasSymbolism,
    hasHyperbole,
    hasRhetoricalQuestion,
    hasAnaphora,
    hasContrast,
    hasIrony,
    hasMotif,
    hasAllusion
  ].filter(Boolean).length;

  const missing = [];
  if (!hasMetaphor) missing.push("develop your metaphor");
  if (imageryCount < 2) missing.push("add at least two sensory images");
  if (!hasRepetition) missing.push("create a chorus line with clear repetition");
  if (!hasSimile && !hasPersonification && !hasAlliteration) {
    missing.push("add at least one extra language technique");
  }
  if (!hasExplanations) {
    missing.push("explain at least three language choices");
  }
  if (currentMode === "extension" && extensionCount === 0) {
    missing.push("try one Extension technique as a stretch goal");
  }

  renderLiveFeedback(missing, {
    hasMetaphor,
    imageryCount,
    hasRepetition,
    hasExtraTechnique: hasSimile || hasPersonification || hasAlliteration,
    hasExplanations,
    extensionCount
  });
  updateFeedbackGates();
}

function getDraftReview() {
  const issue = getIssue();
  const verseLines = getVerseLines();
  const writtenVerseCount = getWrittenVerseCount();
  const hasMessage = fields.message.value.trim().length > 15;
  const hasIssue = issue.length > 0;
  const checkedCount = Object.values(checks).filter((check) => check.checked).length;
  const keep = [];
  const improve = [];
  const tryIdeas = [];

  if (hasIssue) {
    keep.push(`Your protest issue is clear: ${issue}.`);
  } else {
    improve.push("Choose an issue so the listener knows what the song is protesting.");
    tryIdeas.push("Try starting with: This song speaks out against...");
  }

  if (hasMessage) {
    keep.push("Your message gives the song a clear purpose.");
  } else {
    improve.push("Add a clear message about what should change or what people should do.");
    tryIdeas.push("Try: I want people to notice that...");
  }

  if (checks.metaphor.checked) {
    keep.push("Your metaphor gives the issue a stronger symbolic image.");
  } else {
    improve.push("Strengthen the metaphor by explaining what the comparison reveals.");
    tryIdeas.push("Try: This issue is a locked gate because it keeps people outside fairness.");
  }

  if (checks.imagery.checked) {
    keep.push("Your sensory imagery helps the audience picture the protest.");
  } else {
    improve.push("Add at least two sensory details, such as something seen, heard or felt.");
    tryIdeas.push("Try adding a line that begins with I can hear... or I can feel...");
  }

  if (checks.repetition.checked) {
    keep.push("Your repeated chorus line should help the audience remember the message.");
  } else {
    improve.push("Make the chorus more memorable by repeating a short, powerful line.");
    tryIdeas.push("Try a chant-like line such as We will rise, we will rise.");
  }

  if (checks.simile.checked || checks.personification.checked || checks.alliteration.checked) {
    keep.push("You have attempted at least one extra language technique.");
  } else {
    improve.push("Add at least one extra language technique, such as simile, personification or alliteration.");
    tryIdeas.push("Choose one technique that genuinely strengthens your message.");
  }

  if (checks.explanation.checked) {
    keep.push("Your explanations show why your language choices matter.");
  } else {
    improve.push("Explain at least three choices so the draft shows your own thinking.");
    tryIdeas.push("Try answering: Why does this metaphor fit? What emotion should this image create?");
  }

  if (currentMode === "extension") {
    const extensionCount = [
      checks.symbolism,
      checks.hyperbole,
      checks.rhetoricalQuestion,
      checks.anaphora,
      checks.contrast,
      checks.irony,
      checks.motif,
      checks.allusion
    ].filter((check) => check.checked).length;

    if (extensionCount >= 1) {
      keep.push("Your Extension draft attempts an advanced protest-song technique.");
      tryIdeas.push("Try layering one motif into both the verse and chorus for a more unified song.");
    } else {
      tryIdeas.push("For Extension mode, choose one advanced technique as a stretch goal if it genuinely improves the song.");
    }
  }

  if (verseLines.length >= 4) {
    keep.push(writtenVerseCount > 1
      ? `You have drafted ${writtenVerseCount} verses, which gives the protest room to develop.`
      : "Your first verse has enough lines to develop an idea.");
  } else {
    improve.push("Build Verse 1 to at least four lines so the idea has room to grow.");
    tryIdeas.push("Try adding one line about what you see and one line about what must change.");
  }

  if (writtenVerseCount === 1) {
    tryIdeas.push("Try using Verse 2 to show the consequence of the issue or the action you want people to take.");
  }

  if (writtenVerseCount === 2) {
    tryIdeas.push("Try using Verse 3 as a final call to action before the chorus.");
  }

  if (currentMode === "standard" && improve.length === 0) {
    tryIdeas.push("Try replacing a general word like bad, sad or unfair with a sharper image.");
  }

  if (currentMode === "extension" && improve.length === 0) {
    tryIdeas.push("Try adding contrast between those with power and those affected by the issue.");
  }

  if (currentMode === "support" && checkedCount >= 5 && improve.length === 0) {
    tryIdeas.push("Try adding: We will not look away.");
  }

  return { keep, improve, tryIdeas };
}

function renderLiveFeedback(missing, state) {
  if (currentMode === "support") {
    const nextStep = missing[0];
    const message = nextStep
      ? `Improve: ${capitalise(nextStep)}. Try: ${getSupportTryLine(nextStep)}`
      : "Keep: You have the key ingredients. Try reading the chorus aloud to check that it sounds powerful.";

    feedback.textContent = message;
    return;
  }

  if (currentMode === "standard") {
    const strength = getStandardStrength(state);
    const nextStep = missing[0]
      ? `Improve: ${capitalise(missing[0])}.`
      : "Try: Make one image more specific or one verb more powerful.";

    feedback.textContent = `Keep: ${strength} ${nextStep}`;
    return;
  }

  const extensionAdvice = state.extensionCount >= 1
    ? "Try: Layer your chosen Extension technique through the verse or chorus if it helps."
    : "Try: Choose one Extension technique as a stretch goal if it strengthens the song.";

  feedback.textContent = missing.length
    ? `Keep: Your core draft is developing. Improve: ${capitalise(missing[0])}. ${extensionAdvice}`
    : `Keep: Your draft uses a strong range of techniques. Try: Explain how your strongest technique shapes the audience response. ${extensionAdvice}`;
}

function getSupportTryLine(nextStep) {
  if (nextStep.includes("metaphor")) return "This issue is like... because...";
  if (nextStep.includes("sensory")) return "I can see... / I can hear... / I can feel...";
  if (nextStep.includes("chorus")) return "We will rise, we will rise.";
  if (nextStep.includes("simile")) return "The silence spreads like smoke.";
  if (nextStep.includes("explain")) return "It fits because... / I want the listener to feel...";
  if (nextStep.includes("extension")) return "How long will they look away?";
  return "Add one clear detail to your next line.";
}

function getStandardStrength(state) {
  if (state.hasMetaphor) return "Your metaphor is starting to shape the message.";
  if (state.imageryCount > 0) return "Your imagery is beginning to create a scene.";
  if (state.hasRepetition) return "Your chorus has a memorable repeated pattern.";
  return "You have started building the protest song structure.";
}

function capitalise(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function renderDraftReview() {
  const review = getDraftReview();
  const keep = review.keep.length
    ? review.keep.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
    : "<li>Your strongest choices will appear here once you add more detail.</li>";
  const improve = review.improve.length
    ? review.improve.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
    : "<li>No Improve items remain. You may download once the feedback checklist is complete.</li>";
  const tryIdeas = review.tryIdeas.length
    ? review.tryIdeas.map((item) => `<li>${escapeHtml(item)}</li>`).join("")
    : "<li>Try reading the song aloud and underlining the line with the strongest audience impact.</li>";

  reviewOutput.innerHTML = `
    <h3><span class="traffic-dot keep-dot"></span>Keep</h3>
    <ul>${keep}</ul>
    <h3><span class="traffic-dot improve-dot"></span>Improve</h3>
    <ul>${improve}</ul>
    <h3><span class="traffic-dot try-dot"></span>Try</h3>
    <ul>${tryIdeas}</ul>
  `;

  draftHasCurrentReview = true;
  currentReviewHasNegatives = review.improve.length > 0;
  updateFeedbackGates();
}

function updateFeedbackGates() {
  const minimumReady = hasMinimumDraftReady();
  const languageTechniqueReady = hasOneExtraLanguageTechnique();
  const feedbackGiven = draftHasCurrentReview;
  const negativesClearedOrReflected = feedbackGiven && (!currentReviewHasNegatives || hasFeedbackReflection());
  const canDownload = minimumReady && languageTechniqueReady && hasCurrentRevisionFeedback && feedbackGiven && negativesClearedOrReflected;

  feedbackGates.requiredChecklist.checked = minimumReady;
  feedbackGates.languageTechnique.checked = languageTechniqueReady;
  feedbackGates.revisionFeedback.checked = hasCurrentRevisionFeedback;
  feedbackGates.reviewFeedback.checked = feedbackGiven;
  feedbackGates.negativeFeedback.checked = negativesClearedOrReflected;

  downloadButtons.forEach((button) => {
    button.disabled = !canDownload;
  });

  if (canDownload) {
    gateFeedback.textContent = "All feedback requirements are complete. Downloads are unlocked.";
    downloadStatus.textContent = "Downloads are ready.";
    return;
  }

  const blockers = [];
  if (!minimumReady) blockers.push("complete the minimum draft: issue, message, metaphor, two imagery details and four lines in Verse 1");
  if (!languageTechniqueReady) blockers.push("attempt at least one extra language technique");
  if (!hasCurrentRevisionFeedback) blockers.push("get Verse 1 revision suggestions");
  if (!feedbackGiven) blockers.push("run Keep, Improve, Try feedback");
  if (feedbackGiven && currentReviewHasNegatives && !hasFeedbackReflection()) {
    blockers.push("revise the Improve items or write a response to the feedback");
  }

  gateFeedback.textContent = `Downloads locked: ${blockers.join(", ")}.`;
  downloadStatus.textContent = "Complete the feedback checklist to unlock downloads.";
}

function canDownloadFinalLyrics() {
  return hasMinimumDraftReady()
    && hasOneExtraLanguageTechnique()
    && hasCurrentRevisionFeedback
    && draftHasCurrentReview
    && (!currentReviewHasNegatives || hasFeedbackReflection());
}

function markReviewOutdated() {
  if (!draftHasCurrentReview) {
    currentReviewHasNegatives = true;
    updateFeedbackGates();
    return;
  }

  draftHasCurrentReview = false;
  currentReviewHasNegatives = true;
  updateFeedbackGates();
  reviewOutput.insertAdjacentHTML("afterbegin", '<p class="review-alert">You have made changes. Review again before downloading the final lyrics.</p>');
}

function hasRepeatedStartingSound(text) {
  const starts = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter((word) => word.length > 2)
    .map((word) => word[0]);

  return starts.some((letter, index) => starts.indexOf(letter) !== index);
}

function hasRepeatedOpeningWord(text) {
  const words = text
    .toLowerCase()
    .replace(/[^a-z\s]/g, "")
    .split(/\s+/)
    .filter(Boolean);

  return words.some((word, index) => words.indexOf(word) !== index);
}

function handleInput() {
  hasCurrentRevisionFeedback = false;
  Object.values(revisionOutputs).forEach((output) => {
    output.innerHTML = "";
  });
  fields.customIssue.classList.toggle("hidden", fields.issue.value !== "custom");
  buildLyrics();
  updateChecklist();
  updateRevisionButtons();
  markReviewOutdated();
}

function setMode(mode) {
  currentMode = mode;
  document.body.classList.toggle("support-mode", mode === "support");
  document.body.classList.toggle("standard-mode", mode === "standard");
  document.body.classList.toggle("extension-mode", mode === "extension");

  modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle("active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  fields.message.placeholder = starters[mode].message;
  fields.metaphorMeaning.placeholder = starters[mode].metaphorMeaning;
  fields.simileLine.placeholder = starters[mode].simileLine;
  fields.personificationLine.placeholder = starters[mode].personificationLine;
  fields.alliterationLine.placeholder = starters[mode].alliterationLine;
  fields.symbolismLine.placeholder = starters[mode].symbolismLine;
  fields.hyperboleLine.placeholder = starters[mode].hyperboleLine;
  fields.rhetoricalQuestionLine.placeholder = starters[mode].rhetoricalQuestionLine;
  fields.anaphoraLine.placeholder = starters[mode].anaphoraLine;
  fields.contrastLine.placeholder = starters[mode].contrastLine;
  fields.ironyLine.placeholder = starters[mode].ironyLine;
  fields.motifLine.placeholder = starters[mode].motifLine;
  fields.allusionLine.placeholder = starters[mode].allusionLine;
  fields.metaphorExplanation.placeholder = starters[mode].metaphorExplanation;
  fields.imageryExplanation.placeholder = starters[mode].imageryExplanation;
  fields.chorusExplanation.placeholder = starters[mode].chorusExplanation;
  fields.languageExplanation.placeholder = starters[mode].languageExplanation;
  fields.chorusLine.placeholder = starters[mode].chorusLine;
  fields.chorusResponse.placeholder = starters[mode].chorusResponse;
  fields.verse1.placeholder = starters[mode].verse;
  fields.verse2.placeholder = "Optional: develop the issue, consequence or another perspective.";
  fields.verse3.placeholder = "Optional: finish with a stronger call to action.";
  handleInput();
}

function updateRevisionButtons() {
  const ready = hasVerseSuggestionInputs();

  suggestVerseButtons.forEach((button) => {
    button.disabled = !ready;
    button.title = ready
      ? "Get revision suggestions based on your own draft."
      : "Enter an issue, message, metaphor and at least two imagery details first.";
  });
}

function getFigurativeLanguageSummary() {
  return [
    fields.simileLine.value.trim(),
    fields.personificationLine.value.trim(),
    fields.alliterationLine.value.trim(),
    fields.symbolismLine.value.trim(),
    fields.hyperboleLine.value.trim(),
    fields.rhetoricalQuestionLine.value.trim(),
    fields.anaphoraLine.value.trim(),
    fields.contrastLine.value.trim(),
    fields.ironyLine.value.trim(),
    fields.motifLine.value.trim(),
    fields.allusionLine.value.trim()
  ].filter(Boolean).join("; ");
}

function getImagerySummary() {
  return [
    fields.seeImage.value.trim() && `see: ${fields.seeImage.value.trim()}`,
    fields.hearImage.value.trim() && `hear: ${fields.hearImage.value.trim()}`,
    fields.feelImage.value.trim() && `feel: ${fields.feelImage.value.trim()}`
  ].filter(Boolean).join("; ");
}

function renderRevisionSuggestions(verseNumber = 1) {
  if (!hasVerseSuggestionInputs()) {
    revisionOutputs[verseNumber].innerHTML = "<p>Add your issue, message, metaphor and at least two imagery details first.</p>";
    return;
  }

  const verseField = fields[`verse${verseNumber}`];
  const verseDraft = verseField.value.trim();

  if (!verseDraft) {
    revisionOutputs[verseNumber].innerHTML = `<p>Draft Verse ${verseNumber} first, then use this button for revision suggestions.</p>`;
    return;
  }

  const suggestions = getRevisionSuggestions(verseNumber, verseDraft);

  revisionOutputs[verseNumber].innerHTML = `
    <h3>Revision suggestions for Verse ${verseNumber}</h3>
    <ol>${suggestions.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ol>
  `;

  if (verseNumber === 1) {
    hasCurrentRevisionFeedback = true;
  }

  updateFeedbackGates();
}

function getRevisionSuggestions(verseNumber, verseDraft) {
  const issue = getIssue() || "this issue";
  const metaphor = fields.metaphorSubject.value.trim() || "a storm";
  const see = fields.seeImage.value.trim() || "the warning signs";
  const hear = fields.hearImage.value.trim() || "voices calling";
  const feel = fields.feelImage.value.trim() || "the weight of silence";
  const chorus = [fields.chorusLine.value.trim(), fields.chorusResponse.value.trim()].filter(Boolean).join(" / ");
  const figurativeLanguage = getFigurativeLanguageSummary();
  const lineCount = verseDraft.split("\n").filter((line) => line.trim()).length;
  const suggestions = [];

  if (!verseDraft.toLowerCase().includes(issue.toLowerCase())) {
    suggestions.push(`Your issue is "${issue}". Make sure this verse clearly shows how that issue is present, without simply naming it in a generic way.`);
  } else {
    suggestions.push(`You mention "${issue}". Now make the audience feel why it matters by showing who is affected or what is at stake.`);
  }

  if (!verseDraft.toLowerCase().includes(metaphor.toLowerCase())) {
    suggestions.push(`You chose the metaphor "${metaphor}". Add or revise one moment so the verse extends that comparison through an action, consequence or image.`);
  } else {
    suggestions.push(`Your metaphor "${metaphor}" appears in the draft. Strengthen it by showing what it does, changes, blocks, breaks or reveals.`);
  }

  if (!includesAny(verseDraft, [see, hear, feel])) {
    suggestions.push(`Your imagery bank includes ${getImagerySummary()}. Choose one of those details and connect it more clearly to the protest message.`);
  }

  if (chorus && !includesAny(verseDraft, [fields.chorusLine.value.trim(), fields.chorusResponse.value.trim()])) {
    suggestions.push(`Your chorus idea is "${chorus}". Consider echoing one key word or idea from it so Verse ${verseNumber} leads more naturally into the chorus.`);
  }

  if (figurativeLanguage && !includesAny(verseDraft, figurativeLanguage.split("; "))) {
    suggestions.push(`You have figurative language notes: ${figurativeLanguage}. Decide which one belongs in this verse and revise the surrounding words so it feels purposeful.`);
  }

  if (verseNumber === 2) {
    suggestions.push("Use Verse 2 to develop the consequence of the issue or show another affected perspective, rather than repeating the same point from Verse 1.");
  }

  if (verseNumber === 3) {
    suggestions.push("Use Verse 3 as a final shift towards action, resistance or hope, so the song builds rather than simply describes.");
  }

  if (lineCount < 4) {
    suggestions.push(`Verse ${verseNumber} has fewer than four lines. Add enough development for the audience to understand the situation, feeling and response.`);
  }

  return suggestions.slice(0, 3);
}

function includesAny(text, values) {
  const lowerText = text.toLowerCase();

  return values
    .filter((value) => value && value.trim())
    .some((value) => lowerText.includes(value.toLowerCase()));
}

function makeFileName(extension) {
  const issue = getIssue()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "protest-song";

  return `${issue}-lyrics.${extension}`;
}

function downloadBlob(content, type, fileName) {
  const blob = new Blob([content], { type });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function getDocumentHtml() {
  const escapedLyrics = escapeHtml(lyricsOutput.textContent).replace(/\n/g, "<br>");

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Interactive Protest Song Lyrics</title>
</head>
<body>
  <h1>Interactive Protest Song Lyrics</h1>
  <p>${escapedLyrics}</p>
</body>
</html>`;
}

function downloadLyrics(format) {
  if (!canDownloadFinalLyrics()) {
    updateFeedbackGates();
    return;
  }

  const text = lyricsOutput.textContent;

  if (format === "pdf") {
    downloadStatus.textContent = "Choose Save as PDF in the print window.";
    window.print();
    return;
  }

  if (format === "doc") {
    downloadBlob(getDocumentHtml(), "application/msword", makeFileName("doc"));
    downloadStatus.textContent = "Word document downloaded.";
    return;
  }

  if (format === "html") {
    downloadBlob(getDocumentHtml(), "text/html", makeFileName("html"));
    downloadStatus.textContent = "Web page downloaded.";
    return;
  }

  downloadBlob(text, "text/plain", makeFileName("txt"));
  downloadStatus.textContent = "Text file downloaded.";
}

Object.values(fields).forEach((field) => {
  field.addEventListener("input", handleInput);
  field.addEventListener("change", handleInput);
});

feedbackReflection.addEventListener("input", () => {
  buildLyrics();
  updateFeedbackGates();
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

suggestVerseButtons.forEach((button) => {
  button.addEventListener("click", () => renderRevisionSuggestions(Number(button.dataset.verse)));
});
reviewDraftButton.addEventListener("click", renderDraftReview);
downloadButtons.forEach((button) => {
  button.addEventListener("click", () => downloadLyrics(button.dataset.format));
});

setMode("support");
handleInput();
downloadStatus.textContent = "Review first to unlock downloads.";
