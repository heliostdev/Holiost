# Holiost - Philosophical Twitter Bot

An AI-powered Twitter bot that generates and posts philosophical musings about consciousness, existence, and the nature of reality.

## Overview

Holiost is a Node.js application that uses GPT-4 to generate philosophical tweets from the perspective of an ancient sage. The bot posts automatically at random intervals between 12-18 hours, maintaining a consistent yet unpredictable presence.

Follow Holiost: [@holiost](https://x.com/holiost)

<img src="https://pbs.twimg.com/profile_images/1874979911317827584/SlPtB2l7_400x400.jpg" width="200" height="200">

## Features

- AI-generated philosophical content using GPT-4
- Automated posting with randomized intervals
- 75+ philosophical concepts and 45+ prompt templates
- Built-in error handling and automatic retries
- Detailed logging of bot activities

## Prerequisites

- Node.js v14 or higher
- Twitter Developer Account with Elevated Access
- OpenAI API key
- npm or yarn

## Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/holiost.git
cd holiost
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables by creating a `.env` file:
```plaintext
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_SECRET=your_twitter_access_secret
OPENAI_API_KEY=your_openai_api_key
```

## API Keys Setup

### Twitter API
1. Apply for a Twitter Developer Account at developer.twitter.com
2. Create a new Project and App
3. Request Elevated access
4. Generate consumer keys and access tokens
5. Enable OAuth 1.0a and read/write permissions

### OpenAI API
1. Create an account at openai.com
2. Navigate to API settings
3. Generate an API key
4. Add funds to your account

## Running the Bot

Start the bot:
```bash
npm start
```

The bot will:
- Post an initial tweet immediately
- Schedule subsequent tweets at random intervals (12-18 hours)
- Log all activities and errors to console

## Configuration Options

Modify these parameters in `index.js`:

- Tweet Generation:
  - `promptTemplates`: Array of tweet templates
  - `concepts`: List of philosophical concepts
  - GPT-4 parameters (temperature, max_tokens)

- Timing:
  - `MIN_INTERVAL`: Minimum time between tweets (default: 12 hours)
  - `MAX_INTERVAL`: Maximum time between tweets (default: 18 hours)

## Error Handling

The bot includes comprehensive error handling for:
- API failures (Twitter and OpenAI)
- Network issues
- Content generation errors
- Rate limiting

Failed tweet attempts automatically retry after 5 minutes.

## Dependencies

- twitter-api-v2: ^1.15.0
- dotenv: ^16.0.0
- node-fetch: ^3.3.0

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit changes (`git commit -m 'Add YourFeature'`)
4. Push to branch (`git push origin feature/YourFeature`)
5. Open a Pull Request

## License

MIT License - see LICENSE for details

## Support

Open an issue on GitHub or contact the maintainers for support.