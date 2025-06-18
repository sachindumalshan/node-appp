const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Mock AI Service (replace with actual AI API)
const generateSEOContent = async (roughDescription) => {
  try {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock SEO optimization logic
    const optimizedContent = {
      title: generateSEOTitle(roughDescription),
      metaDescription: generateMetaDescription(roughDescription),
      keywords: generateKeywords(roughDescription),
      optimizedContent: generateOptimizedContent(roughDescription),
      suggestions: generateSuggestions(roughDescription)
    };
    
    return optimizedContent;
  } catch (error) {
    throw new Error('Failed to generate SEO content');
  }
};

// Helper functions for content generation
const generateSEOTitle = (content) => {
  const words = content.split(' ').slice(0, 8);
  return words.join(' ').replace(/[^\w\s]/gi, '') + ' - SEO Optimized';
};

const generateMetaDescription = (content) => {
  const sentences = content.split('.').filter(s => s.trim().length > 0);
  let description = sentences[0] || content;
  if (description.length > 150) {
    description = description.substring(0, 147) + '...';
  }
  return description.trim();
};

const generateKeywords = (content) => {
  const words = content.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .split(' ')
    .filter(word => word.length > 3)
    .slice(0, 10);
  return [...new Set(words)].join(', ');
};

const generateOptimizedContent = (content) => {
  const sentences = content.split('.');
  const optimized = sentences.map(sentence => {
    if (sentence.trim()) {
      return sentence.trim() + '.';
    }
    return '';
  }).filter(s => s).join(' ');
  
  return `${optimized} This content has been optimized for better search engine visibility and user engagement.`;
};

const generateSuggestions = (content) => {
  return [
    'Add relevant keywords naturally throughout the content',
    'Include internal and external links',
    'Use header tags (H1, H2, H3) for better structure',
    'Optimize images with alt text',
    'Ensure content is mobile-friendly',
    'Add schema markup for rich snippets'
  ];
};

// Routes
app.get('/', (req, res) => {
  res.render('index', { result: null, error: null });
});

app.post('/optimize', async (req, res) => {
  try {
    const { roughDescription } = req.body;
    
    if (!roughDescription || roughDescription.trim() === '') {
      return res.render('index', { 
        result: null, 
        error: 'Please provide a description to optimize.' 
      });
    }
    
    const result = await generateSEOContent(roughDescription);
    res.render('index', { result, error: null });
    
  } catch (error) {
    console.error('Error optimizing content:', error);
    res.render('index', { 
      result: null, 
      error: 'Failed to optimize content. Please try again.' 
    });
  }
});

// API endpoint for AJAX requests
app.post('/api/optimize', async (req, res) => {
  try {
    const { roughDescription } = req.body;
    
    if (!roughDescription || roughDescription.trim() === '') {
      return res.status(400).json({ error: 'Description is required' });
    }
    
    const result = await generateSEOContent(roughDescription);
    res.json({ success: true, data: result });
    
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to optimize content' });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 SEO Optimizer server running on http://localhost:${PORT}`);
  console.log(`📝 Open your browser and navigate to the URL above`);
});