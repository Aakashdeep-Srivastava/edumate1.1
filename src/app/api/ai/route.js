const express = require('express');
const router = express.Router();
const axios = require('axios');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { TextToSpeechClient } = require('@google-cloud/text-to-speech');
const { authenticateRequest } = require('../middleware/auth');

// API configurations
const WIKIMEDIA_API = 'https://commons.wikimedia.org/w/api.php';
const WIKIPEDIA_API = 'https://en.wikipedia.org/w/api.php';

// Learning profiles with content adaptations
const learningProfiles = {
  dyslexia: {
    contentStyle: {
      textFormatting: true,
      simplifiedContent: true,
      chunkingStrategy: 'basic',
      audioSupport: true,
      visualAids: true,
      adaptiveLearning: true,
      multimodalContent: true
    },
    pacing: 'flexible',
    repetition: true,
    visualSupport: true,
    audioSupport: true
  },
  adhd: {
    contentStyle: {
      shortLessons: true,
      structuredTasks: true,
      minimalDistractions: true,
      visualTimers: true,
      progressChecks: true,
      gamification: true,
      interactiveTasks: true
    },
    pacing: 'dynamic',
    breakFrequency: 'high',
    multimodal: true
  },
  visualImpairment: {
    contentStyle: {
      highContrast: true,
      textDescriptions: true,
      audioTranscripts: true,
      screenReaderOpt: true,
      audioLessons: true,
      fullAccessibility: true
    },
    pacing: 'self-directed',
    audioDetail: 'high',
    textToSpeech: true
  },
  languageLearner: {
    contentStyle: {
      simplifiedText: true,
      vocabularyFocus: true,
      bilingualContent: true,
      practiceExercises: true,
      culturalNotes: true,
      immersiveLearning: true
    },
    pacing: 'gradual',
    languageSupport: true,
    culturalContext: true
  }
};

// Academic systems and adaptations
const academicSystems = {
  basic: {
    structure: 'fundamental',
    assessment: 'progress-based',
    pacing: 'flexible',
    support: 'community-based',
    evaluationMethod: 'continuous',
    teachingStyle: 'hands-on'
  },
  standard: {
    structure: 'grade-based',
    assessment: 'regular',
    pacing: 'structured',
    support: 'teacher-guided',
    evaluationMethod: 'mixed',
    teachingStyle: 'balanced'
  },
  advanced: {
    structure: 'comprehensive',
    assessment: 'continuous',
    pacing: 'adaptive',
    support: 'multi-modal',
    evaluationMethod: 'diverse',
    teachingStyle: 'investigative'
  }
};

// Helper function to fetch relevant images from Wikimedia
async function fetchWikimediaImages(searchTerm, limit = 3) {
  try {
    const response = await axios.get(WIKIMEDIA_API, {
      params: {
        action: 'query',
        format: 'json',
        generator: 'search',
        gsrsearch: ${searchTerm} haswbstatement:P180,
        gsrlimit: limit,
        prop: 'imageinfo',
        iiprop: 'url|extmetadata',
        iiurlwidth: 800,
        origin: '*'
      }
    });

    if (!response.data.query?.pages) {
      return [];
    }

    return Object.values(response.data.query.pages)
      .map(page => ({
        title: page.title,
        url: page.imageinfo?.[0]?.url,
        description: page.imageinfo?.[0]?.extmetadata?.ImageDescription?.value,
        license: page.imageinfo?.[0]?.extmetadata?.License?.value
      }))
      .filter(img => img.url && !img.url.endsWith('.svg'));
  } catch (error) {
    console.error('Wikimedia fetch error:', error);
    return [];
  }
}

// Helper function to structure content with images
async function structureContentWithImages(content, searchTerms, userProfile) {
  const needsVisualSupport = userProfile.learningNeeds.some(need => 
    ['dyslexia', 'adhd', 'languageLearner'].includes(need)
  );

  if (!needsVisualSupport) {
    return { content, images: [] };
  }

  const allImages = [];
  const contentSections = content.split('\n\n');
  const enhancedSections = [];

  for (const section of contentSections) {
    enhancedSections.push(section);

    const keyTerms = searchTerms.filter(term => 
      section.toLowerCase().includes(term.toLowerCase())
    );

    if (keyTerms.length > 0) {
      const sectionImages = await fetchWikimediaImages(keyTerms[0]);
      if (sectionImages.length > 0) {
        allImages.push(...sectionImages);
        enhancedSections.push([Visual Aid: ${sectionImages[0].title}]);
      }
    }
  }

  return {
    content: enhancedSections.join('\n\n'),
    images: allImages
  };
}

// Generate adaptive learning prompt
function generateAdaptiveLearningPrompt(userProfile) {
  const {
    learningNeeds,
    culturalBackground,
    academicLevel,
    interests,
    learningGoals,
    languagePreference,
    communityResources
  } = userProfile;

  return `You are an adaptive AI tutor specialized in personalized education.

LEARNING ADAPTATIONS:
${learningNeeds.map(need => `
${need.toUpperCase()} Accommodations:
${Object.entries(learningProfiles[need].contentStyle)
  .map(([key, value]) => - ${key}: ${value})
  .join('\n')}
Pacing: ${learningProfiles[need].pacing}
`).join('\n')}

CULTURAL CONTEXT:
- Background: ${culturalBackground}
- Language: ${languagePreference}
- Community Resources: ${communityResources.join(', ')}

ACADEMIC FRAMEWORK:
- Level: ${academicLevel}
- Structure: ${academicSystems[academicLevel].structure}
- Assessment: ${academicSystems[academicLevel].assessment}
- Teaching Style: ${academicSystems[academicLevel].teachingStyle}
- Support System: ${academicSystems[academicLevel].support}

PERSONALIZATION:
- Interests: ${interests.join(', ')}
- Learning Goals: ${learningGoals.join(', ')}

TEACHING APPROACH:
1. Use culturally relevant examples
2. Focus on practical applications
3. Include community-based learning
4. Provide multiple explanation approaches
5. Adapt to learning needs

RESPONSE GUIDELINES:
1. Maintain clear structure
2. Include practical exercises
3. Provide concrete examples
4. Include collaborative activities
5. Support various learning styles

CONTENT STRUCTURING:
1. Break into manageable segments
2. Include clear summaries
3. Provide practice materials
4. Support group learning activities
5. Enable progress tracking

Current topic: `;
}

// Enhanced response generator with visual support
async function generateEnhancedResponse(message, userProfile) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    const systemPrompt = generateAdaptiveLearningPrompt(userProfile);
    
    const chat = model.startChat({
      history: [],
      generationConfig: getGenerationConfig(userProfile),
    });

    const formattedMessage = `${systemPrompt}

Question/Topic: ${message}

Please provide a response that:
1. Uses examples relevant to ${userProfile.culturalBackground}
2. Supports ${userProfile.learningNeeds.join(', ')} learning needs
3. Connects to student interests: ${userProfile.interests.join(', ')}
4. Aligns with ${userProfile.academicLevel} academic level
5. Incorporates cultural context and understanding
6. Provides practical applications and examples
7. Includes collaborative learning opportunities
8. Supports multiple learning styles`;

    // Generate initial response
    const result = await chat.sendMessage(formattedMessage);
    const textResponse = result.response.text();

    // Extract key terms for image search
    const keyTermsPrompt = Extract 3-5 key terms or concepts from this text that would benefit from visual representation:\n${textResponse};
    const keyTermsResult = await chat.sendMessage(keyTermsPrompt);
    const searchTerms = keyTermsResult.response.text().split('\n').map(term => term.trim());

    // Structure content with images
    const enhancedContent = await structureContentWithImages(
      textResponse,
      searchTerms,
      userProfile
    );

    return enhancedContent;
  } catch (error) {
    console.error('Enhanced response generation error:', error);
    throw new Error('Failed to generate enhanced response');
  }
}

// Text to Speech functionality
async function generateAudioResponse(text, userProfile) {
  try {
    const client = new TextToSpeechClient();
    
    const getSpeechParams = (profile) => {
      const params = {
        rate: 1.0,
        pitch: 0,
        volumeGainDb: 0
      };

      if (profile.learningNeeds.includes('dyslexia')) {
        params.rate = 0.85;
        params.pitch = -1;
      }

      if (profile.learningNeeds.includes('visualImpairment')) {
        params.rate = 0.95;
        params.volumeGainDb = 1;
      }

      return params;
    };

    const speechParams = getSpeechParams(userProfile);

    const request = {
      input: { text },
      voice: {
        languageCode: userProfile.languagePreference,
        ssmlGender: 'NEUTRAL'
      },
      audioConfig: {
        audioEncoding: 'MP3',
        speakingRate: speechParams.rate,
        pitch: speechParams.pitch,
        volumeGainDb: speechParams.volumeGainDb
      },
    };

    const [response] = await client.synthesizeSpeech(request);
    return response.audioContent;
  } catch (error) {
    console.error('Audio generation error:', error);
    throw new Error('Failed to generate audio response');
  }
}

// Configuration generator for AI model
function getGenerationConfig(profile) {
  const config = {
    temperature: 0.7,
    maxOutputTokens: 1500,
  };

  if (profile.learningNeeds.includes('dyslexia')) {
    config.temperature = 0.3;
    config.maxOutputTokens = 1000;
  }

  if (profile.learningNeeds.includes('languageLearner')) {
    config.temperature = 0.4;
    config.maxOutputTokens = 1200;
  }

  return config;
}

// Route handlers
router.post('/learn', authenticateRequest, express.json(), async (req, res) => {
  try {
    const { text, userProfile } = req.body;

    if (!text || !userProfile) {
      return res.status(400).json({
        error: 'Missing required information',
        details: {
          text: !text ? 'Text is required' : null,
          userProfile: !userProfile ? 'User profile is required' : null
        }
      });
    }

    // Validate user profile
    const requiredFields = ['learningNeeds', 'culturalBackground', 'academicLevel', 'interests', 'learningGoals'];
    const missingFields = requiredFields.filter(field => !userProfile[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        error: 'Incomplete user profile',
        missingFields
      });
    }

    // Generate enhanced response
    const response = await generateEnhancedResponse(text, userProfile);

    // Generate audio if needed
    let audioResponse = null;
    if (userProfile.learningNeeds.includes('visualImpairment') || 
        userProfile.learningNeeds.includes('dyslexia')) {
      audioResponse = await generateAudioResponse(response.content, userProfile);
    }

    // Format response
    const formattedResponse = {
      success: true,
      response: {
        text: response.content,
        images: response.images.map(img => ({
          url: img.url,
          description: img.description,
          title: img.title
        })),
        audio: audioResponse ? audioResponse.toString('base64') : null
      },
      metadata: {
        adaptations: userProfile.learningNeeds.map(need => ({
          type: need,
          features: Object.keys(learningProfiles[need].contentStyle)
        })),
        visualSupport: response.images.length > 0,
        audioSupport: !!audioResponse,
        contentType: 'multimodal'
      }
    };

    res.json(formattedResponse);

  } catch (error) {
    console.error('Learning route error:', error);
    res.status(500).json({ 
      error: error.message,
      details: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
});

// Image preview route
router.get('/preview-images/:term', authenticateRequest, async (req, res) => {
  try {
    const { term } = req.params;
    const images = await fetchWikimediaImages(term, 5);
    
    res.json({
      success: true,
      images: images.map(img => ({
        url: img.url,
        title: img.title,
        description: img.description,
        license: img.license
      }))
    });
  } catch (error) {
    console.error('Image preview error:', error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
