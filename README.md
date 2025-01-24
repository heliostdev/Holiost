# Holiost - Philosophical Twitter Bot

An automated Twitter bot that posts AI-generated philosophical thoughts about consciousness and existence using GPT-4 and Twitter API v2.

## Description

This bot generates profound yet concise philosophical tweets every 8 hours using OpenAI's GPT-4 model. The tweets are automatically posted to Twitter using the Twitter API v2. Each tweet is carefully crafted to question fundamental concepts about life while maintaining brevity and engagement.

# Live Bot
<img src="https://pbs.twimg.com/profile_images/1874979911317827584/SlPtB2l7_400x400.jpg">
https://x.com/holiost

## Features

- Automated tweet generation using GPT-4
- Scheduled posting
- Character limit handling and text cleaning
- Error handling and logging
- Environment variable configuration

## Prerequisites

- Node.js (v14 or higher)
- Twitter Developer Account with Elevated Access
- OpenAI API Key
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/holiost.git
cd holiost
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
TWITTER_API_KEY=your_twitter_api_key
TWITTER_API_SECRET=your_twitter_api_secret
TWITTER_ACCESS_TOKEN=your_twitter_access_token
TWITTER_ACCESS_SECRET=your_twitter_access_secret
OPENAI_API_KEY=your_openai_api_key
```

## Usage

Start the bot:
```bash
npm start
```

The bot will:
1. Post an initial tweet upon startup
2. Schedule subsequent tweets every 8 hours
3. Log successful posts and any errors that occur

## Configuration

You can modify the following parameters in the code:

- Tweet generation prompt in the `generateTweet()` function
- Posting schedule in the cron job (`0 */8 * * *`)
- GPT-4 parameters (temperature, max_tokens, etc.)
- Tweet character limit handling

## Error Handling

The bot includes error handling for:
- OpenAI API failures
- Twitter API failures
- Invalid tweet content
- Network issues

All errors are logged to the console with timestamps.

## Dependencies

- twitter-api-v2: Twitter API client
- dotenv: Environment variable management
- node-cron: Task scheduling
- openai: OpenAI API interface

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- OpenAI for providing the GPT-4 API
- Twitter for their API access
- Contributors and maintainers of the dependencies used

## Support

For support, please open an issue in the GitHub repository or contact the maintainers.
