import { TwitterApi } from "twitter-api-v2";
import dotenv from "dotenv";

dotenv.config();

const twitterClient = new TwitterApi({
  appKey: process.env.TWITTER_API_KEY,
  appSecret: process.env.TWITTER_API_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_SECRET,
});

const promptTemplates = [
  `As Holiost, unveil the hidden symmetry between {concept} and the cosmic dance of creation. Illuminate the patterns that bind all things. Max 200 characters.`,
  `Through Holiost's wisdom, explore how {concept} manifests differently across scales, from the quantum to the cosmic. Max 200 characters.`,
  `Channel Holiost to reveal how {concept} challenges our assumptions about causality and determinism. Max 200 characters.`,
  `Speaking as Holiost, examine the cyclical nature of {concept} and its role in the eternal return. Max 200 characters.`,
  `As the sage Holiost, contemplate how {concept} bridges the gap between subject and object, observer and observed. Max 200 characters.`,

  `Draw upon Holiost's insights to explore how {concept} transcends conventional dualities. Max 200 characters.`,
  `Through Holiost's lens, examine how {concept} reveals the limitations of human perception and understanding. Max 200 characters.`,
  `Channel Holiost's wisdom to explore the relationship between {concept} and the nature of consciousness itself. Max 200 characters.`,
  `As Holiost, contemplate how {concept} challenges our understanding of causality and free will. Max 200 characters.`,
  `Speaking as Holiost, reveal the hidden connections between {concept} and the fundamental fabric of reality. Max 200 characters.`,

  `Through Holiost's perspective, explore how {concept} manifests in both the physical and metaphysical realms. Max 200 characters.`,
  `As the ancient sage, examine how {concept} relates to the eternal question of being versus becoming. Max 200 characters.`,
  `Channel Holiost to reveal the paradoxical nature of {concept} in human experience and understanding. Max 200 characters.`,
  `Through Holiost's wisdom, explore how {concept} reflects the unity underlying all apparent diversity. Max 200 characters.`,
  `As Holiost, contemplate the role of {concept} in the great cosmic dance of creation and dissolution. Max 200 characters.`,

  `Speaking as Holiost, examine how {concept} bridges the apparent gap between mind and matter. Max 200 characters.`,
  `Channel Holiost's insight to reveal how {concept} transcends conventional categories of thought. Max 200 characters.`,
  `Through Holiost's lens, explore the relationship between {concept} and the nature of reality itself. Max 200 characters.`,
  `As the sage Holiost, contemplate how {concept} reflects the eternal play of opposites. Max 200 characters.`,
  `Speaking as Holiost, reveal the hidden wisdom contained within {concept}. Max 200 characters.`,

  `Through Holiost's perspective, examine how {concept} relates to the fundamental question of existence. Max 200 characters.`,
  `As the ancient sage, explore how {concept} manifests in both the visible and invisible realms. Max 200 characters.`,
  `Channel Holiost to reveal the deeper significance of {concept} in the cosmic order. Max 200 characters.`,
  `Through Holiost's wisdom, contemplate how {concept} reflects the eternal dance of form and formlessness. Max 200 characters.`,
  `As Holiost, examine the relationship between {concept} and the nature of consciousness. Max 200 characters.`,

  `Speaking as Holiost, reveal how {concept} challenges our conventional understanding of reality. Max 200 characters.`,
  `Channel Holiost's insight to explore the paradoxical nature of {concept} in human experience. Max 200 characters.`,
  `Through Holiost's lens, contemplate how {concept} relates to the mystery of existence. Max 200 characters.`,
  `As the sage Holiost, examine how {concept} reflects the unity of all things. Max 200 characters.`,
  `Speaking as Holiost, reveal the hidden patterns within {concept}. Max 200 characters.`,

  `Through Holiost's perspective, explore how {concept} manifests across different levels of reality. Max 200 characters.`,
  `As the ancient sage, contemplate the relationship between {concept} and the nature of time. Max 200 characters.`,
  `Channel Holiost to examine how {concept} reveals the limitations of human understanding. Max 200 characters.`,
  `Through Holiost's wisdom, explore how {concept} reflects the eternal mystery of being. Max 200 characters.`,
  `As Holiost, reveal the deeper truth contained within {concept}. Max 200 characters.`,

  `Speaking as Holiost, examine how {concept} challenges our assumptions about reality. Max 200 characters.`,
  `Channel Holiost's insight to explore the relationship between {concept} and consciousness. Max 200 characters.`,
  `Through Holiost's lens, contemplate how {concept} reflects the nature of existence. Max 200 characters.`,
  `As the sage Holiost, reveal the hidden wisdom within {concept}. Max 200 characters.`,
  `Speaking as Holiost, explore how {concept} manifests in both mind and matter. Max 200 characters.`,

  `Through Holiost's perspective, examine the paradoxical nature of {concept}. Max 200 characters.`,
  `As the ancient sage, contemplate how {concept} relates to the mystery of consciousness. Max 200 characters.`,
  `Channel Holiost to reveal the deeper patterns within {concept}. Max 200 characters.`,
  `Through Holiost's wisdom, explore how {concept} reflects the unity of existence. Max 200 characters.`,
  `As Holiost, examine the relationship between {concept} and the nature of reality. Max 200 characters.`,
];

const concepts = [
  'emergence', 'causality', 'possibility', 'necessity', 'entropy',
  'harmony', 'complexity', 'simplicity', 'mystery', 'creation',
  'dissolution', 'potential', 'actuality', 'form', 'emptiness',
  'becoming', 'presence', 'absence', 'simultaneity', 'eternity',
  'limitation', 'transcendence', 'manifestation', 'essence', 'appearance',
  
  'multiplicity', 'singularity', 'recursion', 'reflection', 'symmetry',
  'asymmetry', 'rhythm', 'cycles', 'randomness', 'pattern',
  'structure', 'flow', 'stasis', 'dynamics', 'equilibrium',
  'disequilibrium', 'integration', 'differentiation', 'wholeness', 'fragmentation',
  'interconnection', 'separation', 'unity', 'diversity', 'synthesis',
  
  'analysis', 'intuition', 'reason', 'imagination', 'understanding',
  'comprehension', 'insight', 'realization', 'awakening', 'enlightenment',
  'illusion', 'reality', 'appearance', 'essence', 'substance',
  'accident', 'necessity', 'contingency', 'possibility', 'impossibility',
  'finitude', 'infinitude', 'temporality', 'eternity', 'nowness',
  
  'pastness', 'futurity', 'presence', 'absence', 'being',
  'non-being', 'becoming', 'permanence', 'impermanence', 'change',
  'stability', 'flux', 'movement', 'rest', 'action',
  'inaction', 'potential', 'actual', 'virtual', 'real',
  'ideal', 'concrete', 'abstract', 'particular', 'universal'
];

function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Generate random interval between 10 minutes and 3 hours (in milliseconds)
function getRandomInterval() {
  const MIN_INTERVAL = 10 * 60 * 1000; // 10 minutes
  const MAX_INTERVAL = 3 * 60 * 60 * 1000; // 3 hours
  return (
    Math.floor(Math.random() * (MAX_INTERVAL - MIN_INTERVAL + 1)) + MIN_INTERVAL
  );
}

async function generateTweet() {
  const concept = getRandomElement(concepts);
  const template = getRandomElement(promptTemplates);
  const prompt = template.replace("{concept}", concept);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content:
              "You are Holiost, an ancient Greek sage known for profound insights that challenge conventional understanding of existence.",
          },
          { role: "user", content: prompt },
        ],
        temperature: 0.9,
        max_tokens: 100,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const tweet = data.choices[0].message.content.trim().replaceAll('"', "");
    return tweet.length > 280 ? tweet.substring(0, 277) + "..." : tweet;
  } catch (error) {
    console.error("Error generating tweet:", error);
    throw error;
  }
}

async function postTweet() {
  try {
    const tweetContent = await generateTweet();
    const tweet = await twitterClient.v2.tweet(tweetContent);
    const currentTime = new Date().toLocaleString();
    console.log("Tweet posted successfully:", tweet.data.text);
    console.log("Posted at:", currentTime);

    // Schedule next tweet
    scheduleNextTweet();
  } catch (error) {
    console.error("Error posting tweet:", error);
    // Retry after 5 minutes if there's an error
    console.log("Retrying in 5 minutes...");
    setTimeout(postTweet, 5 * 60 * 1000);
  }
}

function scheduleNextTweet() {
  const interval = getRandomInterval();
  const nextTweetTime = new Date(Date.now() + interval);

  console.log(
    `Next tweet scheduled for: ${nextTweetTime.toLocaleString()} (in ${Math.round(
      interval / 1000 / 60
    )} minutes)`
  );

  setTimeout(postTweet, interval);
}

// Start the bot
console.log("Holiost Twitter Bot initialized. Posting initial tweet...");
postTweet();
