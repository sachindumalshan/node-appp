# SEO Content Optimizer

A powerful AI-driven tool that transforms rough content descriptions into SEO-friendly, optimized content. Built with Node.js, Express, and modern web technologies.

## Features

- **AI-Powered Optimization**: Transform rough descriptions into SEO-friendly content
- **Real-time Processing**: Get instant results with loading indicators
- **Comprehensive Results**: Generate SEO titles, meta descriptions, keywords, and optimized content
- **SEO Suggestions**: Receive actionable recommendations for better search visibility
- **Copy & Download**: Easy copying to clipboard and downloadable results
- **Responsive Design**: Works perfectly on desktop and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone or create the project:**
   ```bash
   mkdir seo-optimizer
   cd seo-optimizer
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

4. **Start the development server:**
   ```bash
   npm run dev
   ```

5. **Open your browser:**
   Navigate to `http://localhost:5000`

### Production Deployment

```bash
npm start
```

## Usage

1. **Enter Your Content**: Paste or type your rough content description
2. **Click Optimize**: Hit the "Optimize Content" button
3. **Get Results**: Receive optimized SEO content including:
   - SEO-friendly title
   - Meta description (with character count)
   - Relevant keywords
   - Enhanced content
   - SEO improvement suggestions
4. **Copy & Use**: Copy individual sections or download all results

## API Endpoints

### POST /optimize
Optimize content via form submission
- **Body**: `{ roughDescription: string }`
- **Response**: Renders page with results

### POST /api/optimize
Optimize content via API
- **Body**: `{ roughDescription: string }`
- **Response**: JSON with optimization results

## Docker Support

### Build Docker Image
```bash
docker build -t seo-optimizer .
```

### Run Container
```bash
docker run -p 5000:5000 --env-file .env seo-optimizer
```

### Docker Compose (Optional)
```yaml
version: '3.8'
services:
  seo-optimizer:
    build: .
    ports:
      - "5000:5000"
    env_file:
      - .env
    restart: unless-stopped
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |
| `OPENAI_API_KEY` | OpenAI API key (optional) | - |
| `MAX_CONTENT_LENGTH` | Maximum content length | `5000` |
| `MIN_CONTENT_LENGTH` | Minimum content length | `10` |

## Project Structure

```
seo-optimizer/
├── public/
│   ├── css/
│   │   └── style.css          # Styling
│   └── js/
│       └── main.js            # Client-side JavaScript
├── views/
│   └── index.ejs              # Main template
├── .env                       # Environment variables
├── .gitignore                 # Git ignore rules
├── dockerfile                 # Docker configuration
├── index.js                   # Main server file
├── package.json              # Dependencies and scripts
└── README.md                 # This file
```

## Customization

### Adding Real AI Integration

Replace the mock AI service in `index.js` with actual AI API calls:

```javascript
const generateSEOContent = async (roughDescription) => {
  // Example with OpenAI
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are an SEO expert. Optimize the given content for search engines."
      },
      {
        role: "user", 
        content: roughDescription
      }
    ]
  });
  
  return processAIResponse(response);
};
```

### Styling Customization

Modify `public/css/style.css` to change:
- Color scheme
- Typography
- Layout
- Animations

### Adding Features

Consider adding:
- User authentication
- Content history
- Advanced SEO analysis
- Multiple language support
- Bulk content processing

## Performance Optimization

- **Caching**: Implement Redis for result caching
- **Rate Limiting**: Built-in rate limiting support
- **Compression**: Enable gzip compression
- **CDN**: Serve static assets via CDN

## Security Features

- Input validation and sanitization
- Rate limiting protection
- Environment variable security
- Docker security best practices

## Browser Support

- Chrome/Chromium 70+
- Firefox 65+
- Safari 12+
- Edge 79+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review the code examples

## Changelog

### v1.0.0
- Initial release
- Basic SEO optimization
- Responsive design
- Copy/download functionality
- Docker support