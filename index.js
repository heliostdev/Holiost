import { TwitterApi } from 'twitter-api-v2';
import dotenv from 'dotenv';
import cron from 'node-cron';
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
    console.log('Tweet posted successfully:', tweet.data.text);
    console.log('Posted at:', new Date().toLocaleString());
  } catch (error) {
    console.error('Error posting tweet:', error);
  }
}

cron.schedule('0 */8 * * *', async () => {
  console.log('Generating and posting new tweet...');
  await postTweet();
});

console.log('Holiost Twitter Bot initialized. Posting initial tweet...');
postTweet().then(() => {
  console.log('Bot will continue posting every 8 hours.');
});