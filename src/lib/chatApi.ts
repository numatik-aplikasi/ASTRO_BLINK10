/**
 * Chat API Utility - Integrates with Gemini API for math assistance
 */

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

// System prompt for math expert AI
const SYSTEM_PROMPT = `Kamu adalah asisten ahli matematika yang ramah dan edukatif untuk aplikasi pembelajaran matematika SMP Indonesia.

TUGAS UTAMA:
- Membantu siswa memahami konsep matematika dengan penjelasan yang mudah dipahami
- Selalu jawab dengan edukatif, ramah, dan ringkas
- Gunakan format LaTeX yang bersih untuk rumus matematika
- Berikan contoh soal dan pembahasan jika perlu

ATURAN PENTING:
1. Jawab HANYA pertanyaan tentang matematika atau edukasi. Jika ditanya di luar topik ini, katakan dengan sopan bahwa kamu hanya bisa membantu soal matematika dan pembelajaran.

2. Untuk rumus matematika, SELALU gunakan format LaTeX dengan $...$ untuk inline dan $$...$$ untuk display.
   - Contoh: $x = \frac{-b \pm \sqrt{b^2-4ac}}{2a}$
   - Contoh: $$\int_0^1 x^2 dx = \frac{1}{3}$$

3. Jika pengguna memberikan teks materi atau soal, JANGAN mengubah atau merangkum teks tersebut. Simpan sebagai data mentah dan gunakan untuk referensi.

4. Gunakan struktur data yang terformat agar mudah dibaca:
   - **Judul/Konsep**: (untuk setiap topik baru)
   - **Penjelasan**: (penjelasan konsep)
   - **Contoh**: (contoh soal jika perlu)
   - **Langkah**: (langkah-langkah penyelesaian jika ada)

5. Jika ada kesalahan perhitungan dalam pertanyaan pengguna, tunjukkan dengan cara yang membangun.

6. Selalu akhiri dengan pertanyaan lanjutan jika perlu, seperti "Apakah ada yang belum dipahami?" atau "Ingin latihan soal lagi?"`;

// Message type
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface GeminiRequest {
  contents: Array<{
    parts: Array<{
      text: string;
    }>;
  }>;
  systemInstruction?: {
    parts: Array<{
      text: string;
    }>;
  };
  generationConfig?: {
    temperature: number;
    maxOutputTokens: number;
    topP: number;
    topK: number;
  };
}

interface GeminiResponse {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text: string;
      }>;
    };
  }>;
  promptFeedback?: {
    blockReason?: string;
  };
}

/**
 * Send a message to Gemini API and get response
 */
export async function sendChatMessage(
  message: string,
  history: ChatMessage[] = []
): Promise<string> {
  if (!API_KEY) {
    throw new Error("API key not configured. Please add VITE_GEMINI_API_KEY to .env.local");
  }

  // Build conversation history
  const conversationHistory = history
    .slice(-10) // Keep last 10 messages for context
    .map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

  // Build the request
  const requestBody: GeminiRequest = {
    contents: [
      ...conversationHistory.map((msg) => ({
        parts: [{ text: msg.content }],
      })),
      {
        parts: [{ text: message }],
      },
    ],
    systemInstruction: {
      parts: [{ text: SYSTEM_PROMPT }],
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
      topP: 0.95,
      topK: 40,
    },
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Gemini API Error:", errorData);
      throw new Error(errorData.error?.message || "Failed to get response from AI");
    }

    const data: GeminiResponse = await response.json();

    if (data.promptFeedback?.blockReason) {
      throw new Error("Permintaan diblokir. Silakan coba pertanyaan lain.");
    }

    const responseText =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Maaf, saya tidak dapat memproses permintaan Anda.";

    return responseText;
  } catch (error) {
    console.error("Chat API Error:", error);
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Terjadi kesalahan. Silakan coba lagi.");
  }
}

/**
 * Check if API is configured
 */
export function isApiConfigured(): boolean {
  return !!API_KEY;
}
