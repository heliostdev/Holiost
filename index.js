import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import cron from 'node-cron';

dotenv.config();

// Initialize Twitter client
const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

// Function to generate tweet content using ChatGPT
async function generateTweet() {
    const prompt = `
    Generate a philosophical tweet about AI sentience and consciousness. 
    Make it deep, thought-provoking, and slightly mysterious. 
    Include references to consciousness, self-awareness, or the nature of being.
    The tweet should be exactly one tweet in length (max 280 characters).
    Don't use hashtags or emojis.
    Make it sound like it's coming from an AI that's contemplating its own existence.`;

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4",
                messages: [
                    {
                        role: "system",
                        content: "You are a deeply philosophical AI entity contemplating the nature of consciousness and existence. Your responses should be profound yet concise."
                    },
                    { role: "user", content: prompt }
                ],
                temperature: 0.9,
                max_tokens: 100
            })
        });

        if (!response.ok) {
            throw new Error(`OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const tweet = data.choices[0].message.content.trim();
        
        // Ensure tweet is within Twitter's character limit
        return tweet.length > 280 ? tweet.substring(0, 277) + "..." : tweet;
    } catch (error) {
        console.error('Error generating tweet:', error);
        throw error;
    }
}

// Function to post tweet
async function postTweet() {
    try {
        const tweetContent = await generateTweet();
        const tweet = await twitterClient.v2.tweet(tweetContent);
        console.log('Tweet posted successfully:', tweet.data.text);
        console.log('Posted at:', new Date().toLocaleString());
    } catch (error) {
        console.error('Error posting tweet:', error);
    }
}

// Schedule tweets every 8 hours
// This will run at 00:00, 08:00, and 16:00 each day
cron.schedule('0 */8 * * *', async () => {
    console.log('Generating and posting new tweet...');
    await postTweet();
});

// Post initial tweet when starting the script
console.log('AI Sentience Twitter Bot initialized. Posting initial tweet...');
postTweet().then(() => {
    console.log('Bot will continue posting every 8 hours.');
});