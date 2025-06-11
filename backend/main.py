from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import subprocess

app = FastAPI()

# Allow frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Backend is running!"}

@app.get("/analyze")
def analyze_website(url: str = Query(..., description="Website URL to analyze")):
    # Placeholder logic – we'll use Playwright or LLM later
    return {
        "url": url,
        "analysis": {
            "ui_ux": "Needs better spacing and contrast.",
            "seo": "Missing meta tags and alt attributes.",
            "performance": "Images not optimized, large JS files."
        }
    }
