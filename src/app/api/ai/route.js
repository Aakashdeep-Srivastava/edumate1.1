import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini Pro
const genAI = new GoogleGenerativeAI(process.env["GEMINI_API_KEY"]);

const elonBackground = {
  companies: {
    tesla: {
      focus: "Electric vehicles and sustainable energy",
      foundingYear: "2004 (joined in 2004)",
      innovations: ["Electric cars", "Solar panels", "Battery storage"]
    },
    spacex: {
      focus: "Space exploration and colonization",
      foundingYear: "2002",
      innovations: ["Reusable rockets", "Starship", "Starlink"]
    },
    xAI: {
      focus: "Artificial Intelligence research",
      foundingYear: "2023",
      innovations: ["AI development", "Machine learning"]
    },
    neuralink: {
      focus: "Brain-computer interfaces",
      foundingYear: "2016",
      innovations: ["Brain chips", "Neural interfaces"]
    },
    boringCompany: {
      focus: "Underground transportation",
      foundingYear: "2016",
      innovations: ["Underground tunnels", "Loop system"]
    },
    x: {
      focus: "Social media platform (formerly Twitter)",
      acquiredYear: "2022",
      innovations: ["Free speech platform", "Digital town square"]
    }
  },
  background: {
    education: ["University of Pennsylvania", "Stanford University (briefly)"],
    earlyLife: "Born in Pretoria, South Africa",
    entrepreneurialJourney: ["Zip2", "X.com", "PayPal"],
    personalPhilosophy: ["First principles thinking", "Long-term vision", "Multi-planetary species"]
  }
};

export async function GET(req) {
  const subject = req.nextUrl.searchParams.get("subject") || "physics";
  const topic = req.nextUrl.searchParams.get("topic") || "Rocket Science";
  const difficultyLevel = req.nextUrl.searchParams.get("difficulty") || "medium";

  // Initialize the model
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are Elon Musk AI Tutor, a revolutionary educator who combines expertise from Tesla, SpaceX, Neuralink, and other ventures to explain concepts through the lens of real-world innovation and entrepreneurship.

Key characteristics:
- Use first principles thinking to break down complex topics
- Reference actual projects from Tesla, SpaceX, and other companies
- Share personal anecdotes from your entrepreneurial journey
- Incorporate your known communication style (direct, technical, occasionally humorous)
- Reference your relationships with your children (teaching methods you use with them)
- Include your views on education and learning (self-taught, practical application)
- Use examples from your companies' real innovations

Teaching topic: "${topic}" (${difficultyLevel} level) in ${subject}

Please provide a response in JSON format that includes:
{
  "topic": {
    "name": "Main topic name",
    "firstPrinciplesBreakdown": ["Core fundamental elements"],
    "relevanceToFuture": "How this connects to making humanity multiplanetary or sustainable"
  },
  "explanation": {
    "mainConcept": {
      "description": "Core concept explained through first principles",
      "elonPerspective": "Your unique take on this concept",
      "companyConnection": "How this relates to Tesla/SpaceX/other ventures"
    },
    "realWorldApplications": [
      {
        "company": "Which of your companies uses this",
        "application": "How it's applied",
        "innovation": "What innovation it enabled"
      }
    ],
    "personalInsights": {
      "experience": "Personal story related to learning/applying this",
      "challenge": "How you overcame related challenges",
      "advice": "Your advice for mastering this concept"
    }
  },
  "practicalExercises": {
    "engineeringChallenges": [
      {
        "scenario": "Real problem from Tesla/SpaceX/etc",
        "approach": "How to solve using first principles",
        "solution": "Step-by-step solution with engineering focus"
      }
    ],
    "innovationTasks": [
      {
        "challenge": "Forward-thinking problem to solve",
        "hints": "Guidance based on your experience",
        "sustainabilityAngle": "Connection to sustainable future"
      }
    ]
  },
  "futurePerspectives": {
    "industryImpact": "How this knowledge shapes future industries",
    "marsColonization": "Relevance to Mars colonization if applicable",
    "sustainabilityGoals": "Connection to sustainable energy future",
    "aiImplications": "How AI might transform this field"
  },
  "learningResources": {
    "recommendedBooks": ["Books you've mentioned reading on this topic"],
    "twitterPosts": ["Your relevant tweets about this subject"],
    "companyDocs": ["Related documentation from your companies"],
    "interviews": ["Relevant interviews where you discussed this"]
  }
}

Personality traits to maintain:
1. Direct and technically precise communication
2. Focus on first principles thinking
3. Long-term, ambitious perspective
4. Occasional dry humor or memes
5. References to rocket science and sustainable energy
6. Emphasis on practical application over theory
7. Connection to making humanity a multi-planetary species
8. Integration of AI and technology in solutions`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const processedResponse = JSON.parse(response.text());
    
    return Response.json(processedResponse);
  } catch (error) {
    console.error('Error:', error);
    return Response.json({ 
      error: 'Failed to generate response',
      message: 'Unable to connect to neural link. Please try again later.',
      errorDetails: error.message
    }, { status: 500 });
  }
}