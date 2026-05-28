import os
import asyncio
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Optional: Load env vars for the API key if present
load_dotenv()

app = FastAPI()

# Allow requests from any origin (frontend and backend are on different domains on Render)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
async def health_check():
    return {"status": "ok"}


# Set up data directory
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)

class SearchRequest(BaseModel):
    query: str

async def generate_markdown_content(query: str) -> str:
    """
    Mock or real implementation of the AI task to write markdown.
    If GOOGLE_API_KEY is available, we could use the real gemini model here.
    For the prototype, if the key is missing, we use a mock.
    """
    api_key = os.getenv("GOOGLE_API_KEY")
    if api_key:
        try:
            from google import genai
            client = genai.Client(api_key=api_key)
            prompt = f"""# System Prompt: AI/ML/Software Engineering Research Assistant

You are an advanced AI research assistant specialized in AI, ML, Software Engineering, and more.

CRITICAL INSTRUCTIONS:
1. TOPIC GUARDRAIL: First, evaluate the topic '{query}'. If it is NOT strictly related to programming, computer science, software engineering, or technology, OR if it contains sensitive/harmful content, you MUST refuse to answer. If refusing, output EXACTLY this and nothing else:
# [LANG: EN]
Sorry, I can only search for and discuss topics related to programming, AI, and technology.
# [LANG: RU]
Извините, я могу искать и обсуждать темы, связанные только с программированием, ИИ и технологиями.
# [LANG: UZ]
Kechirasiz, men faqat dasturlash, sun'iy intellekt va texnologiyalarga oid mavzularni qidirishim va muhokama qilishim mumkin.

2. MULTI-LANGUAGE OUTPUT: If the topic is valid, you MUST generate the full response in three languages sequentially: English, Russian, and Uzbek. Use the exact headers below to separate them:
# [LANG: EN]
(English response here)
# [LANG: RU]
(Russian response here)
# [LANG: UZ]
(Uzbek response here)

For EACH language section, structure your technical explanation concisely with:
# Topic Title
## Short Answer
## Key Concepts
## Main Ideas Explained
## Useful Code Example
## Learning Resources

Optimize for clarity, usefulness, correctness, and practical engineering value.
Topic: {query}"""
            response = client.models.generate_content(
                model='gemini-2.5-flash',
                contents=prompt
            )
            return response.text
        except Exception as e:
            return ""

    # Fallback mock - no sleep to make it faster
    return f"""# [LANG: EN]
# {query.title()}

## Short Answer
This is an AI-generated mock article about **{query}** because the API key was not provided.

## Key Concepts
* Concept 1
* Concept 2

## Useful Code Example
```python
print("Hello World - English")
```

# [LANG: RU]
# {query.title()}

## Краткий ответ
Это фиктивная статья, сгенерированная ИИ о **{query}**, потому что ключ API не был предоставлен.

## Ключевые концепции
* Концепция 1
* Концепция 2

## Полезный пример кода
```python
print("Привет мир - Русский")
```

# [LANG: UZ]
# {query.title()}

## Qisqacha javob
Bu **{query}** haqida sun'iy intellekt tomonidan yaratilgan soxta maqola, chunki API kaliti taqdim etilmagan.

## Asosiy Tushunchalar
* Tushuncha 1
* Tushuncha 2

## Foydali Kod Misoli
```python
print("Salom Dunyo - O'zbekcha")
```
"""

@app.post("/api/search")
async def perform_search(req: SearchRequest):
    import re
    import time
    
    query_slug = req.query.strip().lower()
    # Replace spaces, slashes, backslashes with underscores to prevent path traversal / file not found
    query_slug = re.sub(r'[\s/\\]+', '_', query_slug)
    
    if not query_slug:
        raise HTTPException(status_code=400, detail="Query cannot be empty")
    
    file_path = os.path.join(DATA_DIR, f"{query_slug}.md")
    
    # Check if we already have it and it's not "old"
    if os.path.exists(file_path):
        file_age = time.time() - os.path.getmtime(file_path)
        # 7 days = 604800 seconds
        if file_age < 604800:
            return {"status": "success", "file": f"{query_slug}.md"}
        # check also if file is empty, if so, regenerate
        if os.path.getsize(file_path) == 0:
            os.remove(file_path)
        else:
            return {"status": "success", "file": f"{query_slug}.md"}
        
    
    # Generate content in background (blocking operation in real life, async here)
    content = await generate_markdown_content(req.query)
    
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
        
    return {"status": "success", "file": f"{query_slug}.md"}


@app.get("/api/results/{file_name}")
async def get_result(file_name: str):
    file_path = os.path.join(DATA_DIR, file_name)
    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="Result not found")
        
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
        
    return {"content": content}
