import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';

dotenv.config();

const twitterClient = new TwitterApi({
    appKey: process.env.TWITTER_API_KEY,
    appSecret: process.env.TWITTER_API_SECRET,
    accessToken: process.env.TWITTER_ACCESS_TOKEN,
    accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const promptTemplates = [
    `You are Holiost, an ancient Greek sage. Share a profound observation about {concept}. Focus on the unexpected connections between seemingly unrelated aspects of existence. Max 100 characters.`,
    `As Holiost, challenge conventional wisdom about {concept}. Question what others take for granted. Make readers pause and reconsider their assumptions. Max 100 characters.`,
    `Channel Holiost's voice to explore the paradox of {concept}. Highlight the beautiful contradictions in human experience. Max 100 characters.`,
    `Speaking as Holiost, examine how {concept} reveals deeper truths about consciousness and reality. Max 100 characters.`,
    `In Holiost's philosophical tradition, contemplate the relationship between {concept} and the fundamental nature of being. Max 100 characters.`
];

const concepts = [
    'time', 'consciousness', 'identity', 'change', 'knowledge',
    'perception', 'reality', 'truth', 'beauty', 'justice',
    'freedom', 'purpose', 'meaning', 'happiness', 'wisdom',
    'memory', 'existence', 'choice', 'nature', 'infinity',
    'unity', 'duality', 'chaos', 'order', 'transformation'
];

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}

// Generate random interval between 10 minutes and 3 hours (in milliseconds)
function getRandomInterval() {
    const MIN_INTERVAL = 10 * 60 * 1000; // 10 minutes
    const MAX_INTERVAL = 3 * 60 * 60 * 1000; // 3 hours
    return Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL;
}

async function generateTweet() {
    const concept = getRandomElement(concepts);
    const template = getRandomElement(promptTemplates);
    const prompt = template.replace('{concept}', concept);

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
                        content: "You are Holiost, an ancient Greek sage known for profound insights that challenge conventional understanding of existence."
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
        const tweet = data.choices[0].message.content.trim().replaceAll("\"", "");
        return tweet.length > 280 ? tweet.substring(0, 277) + "..." : tweet;
    } catch (error) {
        console.error('Error generating tweet:', error);
        throw error;
    }
}

async function postTweet() {
    try {
        const tweetContent = await generateTweet();
        const tweet = await twitterClient.v2.tweet(tweetContent);
        const currentTime = new Date().toLocaleString();
        console.log('Tweet posted successfully:', tweet.data.text);
        console.log('Posted at:', currentTime);
        
        // Schedule next tweet
        scheduleNextTweet();
    } catch (error) {
        console.error('Error posting tweet:', error);
        // Retry after 5 minutes if there's an error
        console.log('Retrying in 5 minutes...');
        setTimeout(postTweet, 5 * 60 * 1000);
    }
}

function scheduleNextTweet() {
    const interval = getRandomInterval();
    const nextTweetTime = new Date(Date.now() + interval);
    
    console.log(`Next tweet scheduled for: ${nextTweetTime.toLocaleString()} (in ${Math.round(interval/1000/60)} minutes)`);
    
    setTimeout(postTweet, interval);
}

// Start the bot
console.log('Holiost Twitter Bot initialized. Posting initial tweet...');
postTweet();