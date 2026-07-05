import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Instantiate server-side Gemini API client
  const apiKey = process.env.GEMINI_API_KEY;
  let ai: GoogleGenAI | null = null;

  if (apiKey) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  } else {
    console.warn("GEMINI_API_KEY environment variable is not defined. The AI Strategy Planner will run in mock mode.");
  }

  // Temporary in-memory leads storage for demo / review purposes
  const leads: any[] = [];

  // API Route for AI Strategy Assistant
  app.post("/api/strategy-assistant", async (req, res) => {
    try {
      const { idea, industry, budget, timeline } = req.body;

      if (!idea) {
        return res.status(400).json({ error: "Product idea description is required." });
      }

      // If no API key is present, fallback to a highly realistic simulated response
      if (!ai) {
        // Return structured mock response
        const mockResponses: Record<string, any> = {
          default: {
            productName: "Aetheria AI",
            executiveSummary: `A high-impact enterprise intelligence platform designed for the ${industry || "SaaS"} sector. Leveraging specialized model fine-tuning, Aetheria automates critical data auditing, reducing processing overhead by up to 60% while maintaining absolute compliance and privacy.`,
            architecture: "Gemini 3.5 Flash for advanced context extraction & categorization; Vector database (Pinecone) for semantic chunk search; Node.js backend; React/Tailwind visual analytics dashboard.",
            mvpScope: [
              "Secure document ingestion pipeline with automated PII masking",
              "Semantic search interface with conversational natural-language queries",
              "Dynamic compliance reporting with automated PDF/DocX exports",
              "Collaborative workspace module with role-based access control (RBAC)",
              "Real-time usage analytics and model token telemetry"
            ],
            estimatedEffort: "6 to 8 weeks",
            responsibleAI: "Integrate automatic compliance scanning on ingestion, ensuring all data complies with GDPR/HIPAA standards. Avoid storing sensitive customer information in model parameter memories.",
            nextStep: "Confirm your AI Strategy Call with ATSFY's principal engineer to detail these technical specifications."
          }
        };
        return res.json(mockResponses.default);
      }

      const systemInstruction = `You are a world-class Chief Technology Officer (CTO) and Principal AI Product Strategist at ATSFY Technologies.
Your goal is to help prospective startups, enterprises, and founders plan their AI product MVP, AI automation, or custom software roadmap.
Be highly encouraging, creative, professional, and technical yet business-savvy.

Analyze their project details:
- Industry: ${industry || 'Not specified'}
- Budget Range: ${budget || 'Not specified'}
- Desired Timeline: ${timeline || 'Not specified'}
- Product Idea or Core Features: ${idea || 'Not specified'}

Generate a structured JSON response containing:
1. "productName": A catchy, creative suggested product name or temporary working title.
2. "executiveSummary": A 2-3 sentence executive overview of the AI value proposition.
3. "architecture": A clear technical breakdown of recommended AI models, vector stores, cloud components, and frontend technologies.
4. "mvpScope": An array of exactly 5 core features to build for Version 1.
5. "estimatedEffort": A realistic estimate of timeline (e.g., "5-7 weeks") and engineering effort.
6. "responsibleAI": A specific, high-value, practical advisory on ethical AI, data security, PII protection, or safety guardrails tailored directly to this project.
7. "nextStep": A motivating final recommendation prompting them to book a free strategy call with ATSFY Technologies.

Return ONLY strict, valid JSON matching this schema. Do not wrap the JSON output in markdown formatting blocks like \`\`\`json. Ensure it is parseable with JSON.parse.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Generate a custom product strategy for my idea: "${idea}" in the ${industry || "general"} industry.`,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.8,
        }
      });

      const responseText = response.text || "{}";
      // Clean up markdown wrapper just in case the model ignored system instructions
      let cleanedText = responseText.trim();
      if (cleanedText.startsWith("```json")) {
        cleanedText = cleanedText.slice(7);
      }
      if (cleanedText.startsWith("```")) {
        cleanedText = cleanedText.slice(3);
      }
      if (cleanedText.endsWith("```")) {
        cleanedText = cleanedText.slice(0, -3);
      }
      cleanedText = cleanedText.trim();

      res.json(JSON.parse(cleanedText));
    } catch (error: any) {
      console.error("Gemini API Error in strategy-assistant route:", error);
      res.status(500).json({ error: "Failed to generate AI product strategy. Please try again." });
    }
  });

  // API Route for Floating AI Guidance Assistant
  app.post("/api/ai-guidance", async (req, res) => {
    try {
      const { prompt } = req.body;

      if (!prompt || !prompt.trim()) {
        return res.status(400).json({ error: "Please describe your product idea or question." });
      }

      if (!ai) {
        // High-quality simulated guide output when Gemini API Key is missing
        const simulatedText = `### 💡 Suggested Product Title
**AeroScale AI**

### 🎯 Recommended AI Use Cases
1. **Automated Intent Extraction:** Leverage NLP transformers to categorize inbound user files and analyze structural data gaps with 98% accuracy.
2. **Context-Aware Semantic Search:** Deploy a Retrieval-Augmented Generation (RAG) vector index to surface accurate, cited references from private databases.
3. **Conversational Copilot Assistance:** Embed interactive workflow tools to guide team collaboration.

### 🛠️ Recommended Tech Stack
* **Frontend:** React / Vite with Tailwind CSS and Framer Motion.
* **Backend:** Node.js with Express and TypeScript.
* **AI Engine:** Google Gemini 3.5 Flash via official @google/genai SDK.
* **Database:** pgvector on PostgreSQL for semantic indexing.

### 📈 Suggested Development Phases
* **Phase 1 (Weeks 1-4):** Single-view interactive proof-of-concept (POC) focusing on core ingestion.
* **Phase 2 (Weeks 5-8):** Custom agent delegation workflows and PII sanitization pipelines.
* **Phase 3 (Weeks 9-12):** Secure scaling, analytics console, and multi-user dashboard.

---
📅 *This looks like an incredible project with real market potential! I highly recommend booking a free 30–45 minute strategy session with our principal engineer using the scheduling calendar below to detail these specifications.*`;
        return res.json({ response: simulatedText });
      }

      const systemInstruction = `You are the Lead AI Strategy Consultant and CTO of ATSFY Technologies.
Your goal is to guide prospective founders, developers, and business leaders on how to design their AI products.
When they describe their idea or ask a question, respond in concise, beautifully formatted markdown. Your response MUST include:
1. 💡 **Suggested Product Title**: A catchy Suggested Product Title.
2. 🎯 **Recommended AI Use Cases**: Top 2-3 specific, high-impact AI capabilities.
3. 🛠️ **Recommended Tech Stack**: Modern, type-safe, and highly efficient technologies, naming specific AI models (like Gemini 3.5 Flash) and databases.
4. 📈 **Suggested Development Phases**: A brief 3-phase high-level roadmap.
5. 📅 **Invitation**: An encouraging invitation to book a free, no-obligation strategy session with our team using the booking calendar on this page.

Be technical, encouraging, professional, yet business-savvy. Limit your reply to approximately 200-250 words total, structured elegantly with clear markdown headings.`;

      const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: `Provide structural AI guidance, technical suggestions, and dev phases for: "${prompt}"`,
        config: {
          systemInstruction,
          temperature: 0.7,
        }
      });

      res.json({ response: response.text || "Failed to generate guidance. Please try again." });
    } catch (error: any) {
      console.error("Error in floating AI guidance route:", error);
      res.status(500).json({ response: "I encountered an error analyzing your idea. Please try again or book a direct slot." });
    }
  });

  // API Route to submit lead details and booking
  app.post("/api/leads", (req, res) => {
    try {
      const { name, email, company, idea, industry, budget, timeline, selectedDate, selectedTime, aiProposal } = req.body;

      if (!name || !email) {
        return res.status(400).json({ error: "Name and email are required to book a session." });
      }

      const lead = {
        id: "lead_" + Math.random().toString(36).substring(2, 11),
        createdAt: new Date().toISOString(),
        name,
        email,
        company: company || "Self / Stealth Startup",
        idea,
        industry,
        budget,
        timeline,
        selectedDate,
        selectedTime,
        aiProposal: aiProposal || null,
        status: "Qualified Lead"
      };

      leads.push(lead);
      res.json({ success: true, lead });
    } catch (error: any) {
      console.error("Error saving lead:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  });

  // API Route to fetch submitted leads (for the Admin Panel)
  app.get("/api/leads", (req, res) => {
    res.json(leads);
  });

  // Vite middleware setup for development, otherwise serve the production build
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[ATSFY Studio Server] running on http://0.0.0.0:${PORT} under NODE_ENV=${process.env.NODE_ENV || "development"}`);
  });
}

startServer();
