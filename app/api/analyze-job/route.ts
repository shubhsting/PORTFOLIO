import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  let jobDescription: string = '';
  let candidateData: any = null;
  
  try {
    // Read request body once at the beginning
    const body = await request.json();
    jobDescription = body.jobDescription;
    candidateData = body.candidateData;

    if (!jobDescription || !candidateData) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
      // Fallback to rule-based analysis if no API key
      console.log('No API key found, using fallback analysis');
      return NextResponse.json(getFallbackAnalysis(jobDescription, candidateData));
    }

    // Call Google Gemini API (using Gemini 2.0)
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are an expert technical recruiter. Analyze if the following candidate is a good fit for this job.

CANDIDATE PROFILE:
${JSON.stringify(candidateData, null, 2)}

JOB DESCRIPTION:
${jobDescription}

Provide a detailed analysis in the following JSON format (respond ONLY with valid JSON, no markdown):
{
  "overallMatch": <number 0-100> return 0 if nothing matches,
  "matchingSkills": ["skill1", "skill2", ...],
  "missingSkills": ["skill1", "skill2", ...],
  "relevantExperience": ["experience1", "experience2", ...],
  "recommendation": "<one sentence recommendation>",
  "strengths": ["strength1", "strength2", ...],
  "suggestions": ["suggestion1", "suggestion2", ...]
}`
            }]
          }]
        }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Gemini API error:', errorData);
      throw new Error('AI API request failed');
    }

    const data = await response.json();
    const aiResponse = data.candidates[0]?.content?.parts[0]?.text;

    if (!aiResponse) {
      throw new Error('Invalid AI response');
    }

    // Parse AI response (remove markdown code blocks if present)
    const cleanedResponse = aiResponse.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const analysis = JSON.parse(cleanedResponse);

    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Error analyzing job fit:', error);
    
    // Fallback to rule-based analysis on error
    // Use the already-parsed data from the beginning
    if (jobDescription && candidateData) {
      return NextResponse.json(getFallbackAnalysis(jobDescription, candidateData));
    } else {
      return NextResponse.json(
        { error: 'Analysis failed' },
        { status: 500 }
      );
    }
  }
}

// Fallback rule-based analysis (when AI is unavailable)
function getFallbackAnalysis(jobDescription: string, candidateData: any) {
  const jdLower = jobDescription.toLowerCase();
  
  const matchingSkills = candidateData.skills.filter((skill: string) => 
    jdLower.includes(skill.toLowerCase())
  );
  
  const commonSkills = [
    'python', 'golang', 'kubernetes', 'terraform', 'graphql',
    'vue', 'angular', 'django', 'flask', 'spring', 'kafka', 'rust',
    'scala', 'kotlin', 'swift', 'ruby', 'php', 'c++', 'c#'
  ];
  
  const missingSkills = commonSkills.filter(skill => 
    jdLower.includes(skill) && !candidateData.skills.some((s: string) => 
      s.toLowerCase() === skill
    )
  );
  
  const overallMatch = Math.min(
    95,
    Math.round((matchingSkills.length / Math.max(8, matchingSkills.length + missingSkills.length)) * 100)
  );
  
  const relevantExp = candidateData.experience.map((exp: any) => 
    `${exp.title} at ${exp.company} (${exp.duration})`
  );
  
  const strengths = [
    matchingSkills.length > 5 ? 'Strong technical skill alignment with job requirements' : 'Solid foundational technical skills',
    'Proven track record of delivering measurable results and impact',
    'Experience with modern full-stack development and cloud technologies',
    'Strong problem-solving and system design capabilities',
    'Demonstrated ability to work in fast-paced startup environments'
  ];
  
  const suggestions = [];
  
  if (missingSkills.length > 0) {
    suggestions.push(`Consider gaining hands-on experience with: ${missingSkills.slice(0, 3).join(', ')}`);
  } else {
    suggestions.push('Well-aligned with all core technical requirements');
  }
  
  if (jdLower.includes('senior') || jdLower.includes('lead') || jdLower.includes('staff')) {
    suggestions.push('This role seeks senior-level experience - emphasize leadership and architecture experience');
  }
  
  if (jdLower.includes('startup') || jdLower.includes('fast-paced')) {
    suggestions.push('Great fit for startup environment - has experience in agile, fast-paced settings');
  }
  
  const recommendation = overallMatch >= 80 
    ? '✅ Excellent Match! Divyanshu is a strong candidate for this role with high skill alignment and relevant experience.'
    : overallMatch >= 60
    ? '✨ Good Match! Divyanshu meets most requirements with proven ability to learn and adapt quickly.'
    : '💡 Potential Match! While some skill gaps exist, Divyanshu shows strong fundamentals and quick learning capability.';
  
  return {
    overallMatch,
    matchingSkills,
    missingSkills: missingSkills.slice(0, 5),
    relevantExperience: relevantExp,
    recommendation,
    strengths,
    suggestions
  };
}

