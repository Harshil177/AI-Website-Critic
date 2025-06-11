# 🌐 AI-Powered Website Critique & Rebuilder

An intelligent system that critiques websites for:
- UI/UX issues
- Performance problems
- SEO flaws

And optionally **auto-generates a better version** using LLM + Agents.

## 🧠 How it Works

1. Enter any website URL.
2. The backend scrapes and analyzes the page.
3. GPT-based agents critique the design, SEO, and performance.
4. Results and fixes are shown on a React UI.
5. (Optional) Click "One-Click Improve" to get a downloadable fixed version.

---

## 🧱 Stack

- ⚙️ Backend: FastAPI + Playwright + OpenAI (LLM)
- 🖥 Frontend: React
- 🤖 Agentic: LangChain or Custom GPT Agents

---

## 🏃 Getting Started

### 🔧 Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # For Windows: venv\Scripts\activate
pip install -r requirements.txt
playwright install
uvicorn main:app --reload
