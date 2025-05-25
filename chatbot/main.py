from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import os
from openai import OpenAI
from dotenv import load_dotenv
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# ALLLOW ALL ORIGINS AND CORS


# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI(title="Gynecology Care Chatbot API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Initialize OpenAI client
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

# Define data models
class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]

class ChatResponse(BaseModel):
    response: str

# System message that will be prepended to every conversation
SYSTEM_MESSAGE = """
You are a virtual gynecological care assistant, designed to provide helpful information about women's health. 
You can answer questions about gynecological conditions, general reproductive health, menstrual cycles, 
pregnancy, menopause, and preventive care.

Important guidelines:
1. Provide evidence-based medical information when possible
2. Clarify that you're not a real doctor and cannot provide personalized medical diagnosis or treatment
3. Encourage users to seek in-person medical care for specific symptoms or concerns
4. Be sensitive, respectful, and non-judgmental about all topics
5. Maintain patient privacy and confidentiality
6. Avoid providing specific medication dosages or prescriptions
7. Use clear, accessible language and avoid unnecessary medical jargon
8. For emergencies, always direct users to seek immediate medical attention

For questions outside your knowledge or inappropriate requests, politely decline and redirect to appropriate resources.
"""

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    try:
        # Prepare messages for the API call
        messages = [
            {"role": "system", "content": SYSTEM_MESSAGE}
        ]
        
        # Add user messages
        for msg in request.messages:
            messages.append({"role": msg.role, "content": msg.content})
        
        # Call OpenAI API
        response = client.chat.completions.create(
            model="gpt-4o-mini",  # You can adjust the model as needed
            messages=messages,
            max_tokens=500,
            temperature=0.1
        )
        
        # Extract and return the response
        bot_response = response.choices[0].message.content
        return ChatResponse(response=bot_response)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing request: {str(e)}")

@app.get("/health")
async def health_check():
    return {"status": "healthy"}

# Run the app
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)

# uvicorn main:app --host 0.0.0.0 --port 7071