// Request types
export interface ChatRequest {
  message: string;
  context?: string;
  patientInfo?: {
    age?: number;
    weight?: number;
    allergies?: string[];
    currentMedications?: string[];
  };
}

// Response types
export interface ChatResponse {
  response: string;
  disclaimer?: string;
  references?: string[];
}
