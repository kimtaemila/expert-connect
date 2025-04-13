
import nlp from 'compromise';

// Define the appropriate types for compromise document
interface CompromiseDoc {
  topics: () => { out: (format: string) => string[] };
  people: () => { out: (format: string) => string[] };
  organizations: () => { out: (format: string) => string[] };
  nouns: () => { out: (format: string) => string[] };
  verbs: () => { out: (format: string) => string[] };
  adjectives: () => { out: (format: string) => string[] };
  questions: () => { out: (format: string) => string[]; found: boolean };
  sentences: () => { out: (format: string) => string[] };
  match: (pattern: string) => { found: boolean };
  dates?: () => { out: (format: string) => string[] };
  sentiment?: () => number;
}

// Process natural language queries and extract structured information
export async function processNaturalLanguage(text: string) {
  try {
    const doc = nlp(text) as unknown as CompromiseDoc;
    
    // Extract different types of information
    const result: any = {
      topics: doc.topics().out('array'),
      people: doc.people().out('array'),
      organizations: doc.organizations().out('array'),
      nouns: doc.nouns().out('array'),
      verbs: doc.verbs().out('array'),
      adjectives: doc.adjectives().out('array'),
      questions: doc.questions().out('array')
    };
    
    // Add dates if available in compromise
    if (typeof doc.dates === 'function') {
      result.dates = doc.dates().out('array');
    }
    
    // Add sentiment if available in compromise
    if (typeof doc.sentiment === 'function') {
      result.sentiment = doc.sentiment();
    }
    
    // Generate summary (simplified)
    let summary = text;
    if (text.length > 100) {
      // Extract main sentences with important terms
      const sentences = doc.sentences().out('array');
      const importantTerms = [...result.topics, ...result.organizations];
      
      summary = sentences
        .filter((sentence: string) => {
          // Keep sentences containing important terms
          return importantTerms.some((term: string) => sentence.includes(term));
        })
        .slice(0, 2)
        .join(' ');
    }
    
    return {
      ...result,
      summary,
      // Extract intentions (like questions, commands, etc)
      intentions: getIntentions(doc)
    };
  } catch (error) {
    console.error('Error processing natural language:', error);
    return {
      error: 'Failed to process text',
      original: text
    };
  }
}

// Helper to determine the user's intention from the text
function getIntentions(doc: CompromiseDoc) {
  const intentions: string[] = [];
  
  if (doc.questions().found) {
    intentions.push('question');
  }
  
  if (doc.match('#Imperative').found) {
    intentions.push('command');
  }
  
  if (doc.match('(find|search|look for|show me) [.+]').found) {
    intentions.push('search');
  }
  
  if (doc.match('(compare|versus|vs)').found) {
    intentions.push('comparison');
  }
  
  return intentions;
}

export default {
  processNaturalLanguage
};
