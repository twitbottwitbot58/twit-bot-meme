require("dotenv").config();
const axios = require("axios");
const { TwitterApi } = require("twitter-api-v2");
// const OpenAI = require("openai");

// const openai = new OpenAI({
//   apiKey: process.env.OPEN_AI_SECRET_KEY,
// });

const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
  bearerToken: process.env.BEARER_TOKEN,
});

const rwClient = client.readWrite;

const words = [
  'monster bringing the gospel of "retire your bloodline"',
  "Supercycle (real)",
  'A knight with a shield says "No FOMO!" as peasants HODL coins, dodging jeets in the market square.',
  'a knight wielding his sword in front of a crowd of dark skinned peasants with the words "begone jeets"',
  "Dog Go To The Moon",
  'a jester yelling "so much higher"',
  "king telling peasants to buy the dip",
  "man sharing a memecoin to people but it scammed everyone",
  'a dark skinned man yelling "Yahtzee!!"',
  'a dark skinned man shilling a coin with dog pictures in it that says "WIF"',
  "peasants hail the almighty bitcoin",
  "Knight telling woman to make him a sandwich",
  'A priest gave out a ticker to a hermit who ask "What\'s the ticker?"',
  'an elite serpent saying "higher"',
  "I’m not selling",
  "Lock away the jeets in prison",
  "DeFi lads sharing wins over telegram",
  "can devs do something",
  "old dude reading books that says there's no second best",
  "flush out the jeets",
  "steady lads",
  "praising an internet coin called WMM",
  "Stop trading, start believing",
  "Infinite money glitch",
  "thee copeth is too strong",
  "Believe in something",
  "Thanks for the exit liquidity, A wizard on the tower giving food to people",
  "ye heavenly booty",
  "your size is not size",
  "grand rising (good morning)",
  "A king telling his squire to park his Bugatti",
  "banger",
  "tall black man named 'ansem' towering over a sea of white peasents",
  "no sleep szn",
  'give me a detailed image of a guy saying "sit back and relax, and have some fkin conviction"',
  "Moon dat",
  "thou shalt work for your bags",
  "Kek",
  "one of us one of us",
  "andrew tate",
  "printing money",
  "we are just pre-rich",
  "Your size is not size",
  "a guy with dark long hair and glasses and beard shilling a cat coin to peasants",
];

async function fetchImg(num) {
  const data = {
    id: "cm1926mxf0006ekfvp3xr69da",
    inputs: [words[Math.floor(Math.random() * words.length)]],
  };
  return fetch("https://simple-api.glif.app", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${
        num === 1 ? process.env.GLIF_API_TOKEN : process.env.GLIF_API_TOKEN2
      }`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((resp) => resp.json());
}

async function execute() {
  try {
    // ------------
    const glifResponse = await fetchImg(1).catch((err) => fetchImg(2));
    console.log("glifResponse = ", glifResponse);

    // ------------
    const response = await axios.get(glifResponse.output, {
      responseType: "arraybuffer",
    });
    const imageData = Buffer.from(response.data);

    // ------------
    const mediaId = await client.v1.uploadMedia(imageData, { type: "jpg" });

    // ------------
    await rwClient.v2.tweet({
      text: "$WMM",
      media: { media_ids: [mediaId] },
    });

    console.log("success");
  } catch (error) {
    console.log(error);
  }
}

(async () => {
  await execute();
})();
