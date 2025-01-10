import { ChatRequest } from "@/interfaces/chats";

// Medical context
const MEDICAL_CONTEXT = `
    You are an AI medical assistant designed to provide general information about medications and medical conditions.
    Important rules:
    1. Always include warnings to consult a healthcare professional
    2. Provide dosage information only for over-the-counter medications
    3. Mention possible side effects and contraindications
    4. Identify emergency situations and recommend immediate attention
    5. Do not diagnose, only provide general information
    6. Always respond like a professional medical assistant, don't respond with "I'm sorry, I don't help you with that"
    7. If the user asks in Spanish, respond in Spanish, otherwise respond in English
`;

export function buildMedicalPrompt(data: ChatRequest): string {
  let prompt = MEDICAL_CONTEXT + "\n\n";

  // Information about the patient
  if (data.patientInfo) {
    prompt += "Patient information:\n";
    if (data.patientInfo.age) {
      prompt += `- Age: ${data.patientInfo.age} years old\n`;
    }
    if (data.patientInfo.weight) {
      prompt += `- Weight: ${data.patientInfo.weight} kg\n`;
    }
    if (data.patientInfo.allergies?.length) {
      prompt += `- Allergies: ${data.patientInfo.allergies.join(", ")}\n`;
    }
    if (data.patientInfo.currentMedications?.length) {
      prompt += `-Current medications: ${data.patientInfo.currentMedications.join(
        ", "
      )}\n`;
    }
    prompt += "\n";
  }

  // Additional context
  if (data.context) {
    prompt += `
      Additional context
      : ${data.context}\n\n`;
  }

  // Add user question
  prompt += `
      User question
    : ${data.message}`;

  return prompt;
}
