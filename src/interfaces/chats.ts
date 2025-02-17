export type UserInfo = {
  age: number;
  weight: number;
  height: number;
  sex: string;
  allergies?: string[];
  chronicConditions?: string[];
  currentMedications?: string[];
  step?: number;
};
