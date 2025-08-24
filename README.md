# Phrase of the Day Backend

A Node.js Express backend API for serving Spanish phrases of the day, with an admin interface for content management.

## Features

- **RESTful API** for serving Spanish phrases
- **Admin Interface** for content management
- **Rate Limiting** to protect against abuse
- **CORS Support** for React mobile app integration
- **Environment Configuration** with dotenv
- **Security Headers** with Helmet
- **Structured Logging** with Winston

## Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd phrase-of-the-day-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp env.example .env
```

4. Start the development server:
```bash
npm run dev
```

The server will start on `http://localhost:4001`

## API Endpoints

### Get Phrases
```
GET /api/v1/phrases?level=beginner
```

**Query Parameters:**
- `level` (optional): `beginner` or `intermediate` (defaults to `beginner`)

**Response:**
```json
{
  "phrases": [
    {
      "id": 1,
      "phrase": "¡Más te vale!",
      "pronunciation": "mahs teh VAH-leh",
      "date": {
        "spanish": "sábado, 24 de agosto de 2025",
        "dayName": "sábado",
        "monthName": "agosto",
        "day": 24,
        "year": 2025
      },
      "meaning": {
        "en": "You better! / You'd better!",
        "es": "¡Será mejor que lo hagas! / ¡Tienes que hacerlo!"
      },
      "context": {
        "en": "A warning or threat, often used by parents or authority figures",
        "es": "Una advertencia o amenaza, a menudo usada por padres o figuras de autoridad"
      },
      "formality": "informal",
      "regions": {
        "spain": {
          "usage": {
            "en": "Very common",
            "es": "Muy común"
          },
          "notes": {
            "en": "Often used with strong emphasis",
            "es": "A menudo se usa con mucho énfasis"
          }
        },
        "latinAmerica": {
          "usage": {
            "en": "Common",
            "es": "Común"
          },
          "notes": {
            "en": "Sometimes softened to '¡Más te vale, eh!'",
            "es": "A veces se suaviza a '¡Más te vale, eh!'"
          }
        }
      },
      "examples": [
        {
          "spanish": "¡Más te vale llegar a tiempo!",
          "english": "You better arrive on time!",
          "context": {
            "en": "Parent to child",
            "es": "Padre/madre a hijo/a"
          }
        }
      ],
      "similarPhrases": [
        "¡Te conviene!",
        "¡Será mejor que...!",
        "¡Como no lo hagas...!"
      ],
      "difficulty": "intermediate",
      "tags": ["warning", "threat", "advice", "colloquial"]
    }
  ],
  "level": "beginner",
  "timestamp": "2025-01-27T10:30:00.000Z"
}
```

### Get Specific Phrase
```
GET /api/v1/phrases/:id
```

### Health Check
```
GET /health
```

## Admin Interface

Access the admin interface at `http://localhost:4001/admin`

### Available Pages:
- **Dashboard**: Overview and statistics
- **Phrases**: Manage phrase content
- **Users**: User management (future)
- **Settings**: System configuration

## Environment Configuration

Create a `.env` file based on `env.example`:

```env
# Server Configuration
PORT=4001
NODE_ENV=development

# API Configuration
API_BASE_URL=/api/v1

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# Admin Configuration
ADMIN_BASE_URL=/admin
```

## Rate Limiting

The API is protected with rate limiting:
- **Window**: 15 minutes
- **Limit**: 100 requests per IP
- **Headers**: Standard rate limit headers included

## CORS Configuration

Configured to allow requests from:
- Development: `http://localhost:3000`, `http://localhost:3001`
- Production: Configure in `.env`

## Project Structure

```
src/
├── server.js          # Main server file
├── routes/
│   ├── api.js         # API routes
│   └── admin.js       # Admin routes
├── views/
│   ├── layouts/
│   │   └── main.ejs   # Main layout template
│   ├── admin/
│   │   ├── dashboard.ejs
│   │   ├── phrases.ejs
│   │   ├── users.ejs
│   │   └── settings.ejs
│   ├── 404.ejs        # 404 error page
│   └── error.ejs      # Generic error page
└── public/            # Static files (future)
```

## Development

### Available Scripts

- `npm start`: Start production server
- `npm run dev`: Start development server with nodemon

### Adding New Phrases

Currently, phrases are hardcoded in `src/routes/api.js`. In future versions, this will be replaced with a database.

## Security Features

- **Helmet**: Security headers
- **Rate Limiting**: Protection against abuse
- **CORS**: Controlled cross-origin requests
- **Input Validation**: Query parameter validation

## Future Enhancements

- Database integration (MongoDB/PostgreSQL)
- User authentication for admin interface
- Phrase CRUD operations
- Usage analytics
- Multi-language support
- Image/audio file support

## License

ISC
