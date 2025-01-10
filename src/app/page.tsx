"use client";

import { useState, useEffect } from "react";

interface MedicalResponse {
  response: string;
  error?: string;
}

export default function Home() {
  const [response, setResponse] = useState<MedicalResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicalAdvice = async () => {
      try {
        const response = await fetch("/api/assistant", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message:
              "Que me recomiendas para el dolor de brazo teniendo en cuanto mis alergias?",
            patientInfo: {
              age: 35,
              weight: 70,
              allergies: ["AINE"],
              currentMedications: ["paracetamol"],
            },
            context: "El paciente presenta dolor de brazo",
          }),
        });

        const data = await response.json();
        setResponse(data);
      } catch {
        setResponse({ response: "", error: "Error al procesar la solicitud" });
      } finally {
        setLoading(false);
      }
    };

    fetchMedicalAdvice();
  }, []);

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-bold">Medical Assistant</h1>

        {loading ? (
          <p>Loading...</p>
        ) : response?.error ? (
          <p className="text-red-500">Error: {response.error}</p>
        ) : (
          <p>{response?.response}</p>
        )}
      </main>
    </div>
  );
}
