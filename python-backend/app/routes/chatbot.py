import os
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from fireworks.client import Fireworks
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# API Router
router = APIRouter()

# Fireworks API Key
API_KEY = os.getenv("FIREWORKS_API_KEY")

if not API_KEY:
    raise ValueError("FIREWORKS_API_KEY is not configured in the environment variables")

# Initialize Fireworks client
client = Fireworks(api_key=API_KEY)

# Request model
class ChatbotRequest(BaseModel):
    topic: str
    difficulty: str

@router.post("/ask/")
async def ask_chatbot(request: ChatbotRequest):
    # Create prompt based on user input
    prompt = f"Suggest a {request.difficulty} project idea on {request.topic}.In the form of title,features description in which you will say what should it contain"
    
    try:
        # Generate response using Fireworks API
        response = client.chat.completions.create(
            model="accounts/fireworks/models/llama-v3-8b-instruct",
            messages=[
                {
                    "role": "user",
                    "content": prompt,
                }
            ],
        )
        
        # Extract the generated message
        suggestion = response.choices[0].message.content
        return {"suggestion": suggestion}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error with Fireworks API: {str(e)}")
