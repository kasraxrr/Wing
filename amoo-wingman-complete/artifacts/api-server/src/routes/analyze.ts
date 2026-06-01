import { Router, type IRouter } from "express";
import multer from "multer";
import { GoogleGenerativeAI } from "@google/generative-ai";

const router: IRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  },
});

const SYSTEM_INSTRUCTION = `Act as a professional Wingman and relationship expert. 
Analyze this chat screenshot. Detect the language and vibe of the conversation. 
Then, provide 3 creative reply options: 
1) Witty & Playful, 
2) Genuine & Deep, 
3) Bold (to move towards a date). 
Explain 'why' for each reply.

Respond ONLY with valid JSON in this exact format:
{
  "detectedLanguage": "string",
  "vibe": "string (1-2 sentences describing the conversation vibe)",
  "replies": [
    { "type": "Witty & Playful", "reply": "string", "why": "string" },
    { "type": "Genuine & Deep", "reply": "string", "why": "string" },
    { "type": "Bold", "reply": "string", "why": "string" }
  ]
}`;

// ۱۰۰٪ معتبر و به‌روز شده برای تغییرات ساختاری جدید گوگل
const MODEL_CHAIN = ["gemini-1.5-flash", "gemini-1.5-pro"];

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function classifyError(message: string): { userError: string; retryable: boolean } {
  if (message.includes("API_KEY") || message.includes("API key") || message.includes("401")) {
    return { userError: "Invalid API key — check your GEMINI_API_KEY.", retryable: false };
  }
  if (message.includes("quota") || message.includes("429") || message.includes("RESOURCE_EXHAUSTED")) {
    return { userError: "Rate limit hit — retrying automatically…", retryable: true };
  }
  if (message.includes("404") || message.includes("not found")) {
    return { userError: "Gemini model unavailable — trying fallback…", retryable: true };
  }
  if (message.includes("fetch") || message.includes("ENOTFOUND") || message.includes("network")) {
    return { userError: "Network error — could not reach Gemini API.", retryable: false };
  }
  return { userError: "AI analysis failed. Please try again.", retryable: false };
}

router.post("/analyze", upload.single("image"), async (req, res) => {
  if (!req.file) {
    res.status(400).json({ error: "No image file uploaded" });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: "GEMINI_API_KEY is not configured on the server." });
    return;
  }

  const base64Image = req.file.buffer.toString("base64");
  const mimeType = req.file.mimetype as "image/jpeg" | "image/png" | "image/webp" | "image/gif";
  const genAI = new GoogleGenerativeAI(apiKey);

  // تغییر مهم اول: دستورات سیستم از پارت‌ها حذف شدند تا ساختار تصویر خراب نشود
  const parts = [
    { inlineData: { data: base64Image, mimeType } },
  ];

  let lastError = "";

  for (const modelName of MODEL_CHAIN) {
    const MAX_ATTEMPTS = 2;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      try {
        req.log.info({ modelName, attempt, mimeType, size: req.file.size }, "Calling Gemini");

        // تغییر مهم دوم: فرستادن سیستم اینستراکشن به عنوان آپشن استاندارد ساخت مدل
        const model = genAI.getGenerativeModel({ 
          model: modelName,
          systemInstruction: SYSTEM_INSTRUCTION 
        });
        
        const result = await model.generateContent(parts);
        const text = result.response.text();

        req.log.info({ modelName, attempt, responseLength: text.length }, "Gemini success");

        const jsonMatch = text.match(/\{[\s\S]*\}/);
        if (!jsonMatch) {
          req.log.error({ text }, "No JSON in Gemini response");
          res.status(500).json({ error: "AI returned an unexpected format. Please try again." });
          return;
        }

        const parsed = JSON.parse(jsonMatch[0]);
        res.json({ ...parsed, _model: modelName });
        return;

      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : String(err);
        lastError = message;
        const { retryable } = classifyError(message);

        req.log.warn({ modelName, attempt, err }, "Gemini attempt failed");

        if (retryable && attempt < MAX_ATTEMPTS) {
          await sleep(3000);
          continue;
        }
        break;
      }
    }
  }

  req.log.error({ lastError }, "All Gemini models failed");
  const { userError } = classifyError(lastError);
  const isFinalQuota = lastError.includes("quota") || lastError.includes("429") || lastError.includes("RESOURCE_EXHAUSTED");
  res.status(500).json({
    error: isFinalQuota
      ? "Daily API quota exhausted. Please add a fresh Gemini API key, or wait until tomorrow for the quota to reset."
      : userError,
    detail: lastError,
  });
});

export default router;
