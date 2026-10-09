import { AppConfig, BestieReason, MessageCard } from '../types';

export const DEFAULT_CONFIG: AppConfig = {
  recipientName: 'Somyashree',
  senderName: 'Your Friend Forever 🥰',
  birthDate: '29 October',
  milestoneAge: 17,
  milestoneDays: 6209,
  passcode: '2910',
  cakeHeading: "Let's Bake a Cake! 🎂",
  cakeCelebrationText: 'Happy 17th Birthday, Somyashree! 🎂✨',
  letterTitle: 'A Birthday Letter for you, my Friend... ✉️',
  letterGreeting: 'To my wonderful friend, Somyashree 💖',
  letterBody: [
    'Happiest 17th Birthday to my Angry bird! 🌸✨',
    'I hope tumhe ye web. mil gya ho or abhi tum ye latter padh rhi ho toh happy birthday meri kuchupuchu, ha ha pata h tumhe gusaa aa rha h',
    'But tumhe pata toh hai kitna excited tha main ishi liye main apne aap ko rok nhi payaaaa',
    'Or ha tumhara gift mila mujhe ek toh hamesa mere study teble pe rheta h or ek mere sath',
    'chhoroo ye batten toh hoti rhengi phle birthdy celibrate karte h toh maine kuch likha h',
    "I don't know if you realize how much brighter you make everything just by being in it. The way you laugh, the fun jokes, and the warm positive energy you always bring with you.",
    'Har din achaaa ho jata h kuki mere pass aapke jaisi ek kuhupuchu haiii, jis se main boothhhh sariii batennn kar shkta huu💕',
    'Thank you for always being supportive, mujhe acchi salahhh dene ke liye, jab mujhe sabse jayadaa jarurat hoti hai toh mere liye hamesha ready rhehne ke liye.🥰',
    'May this 17th year bring you boundless happiness, endless smiles, all your biggest dreams coming true, and lots of great moments ahead! 🚀',
    'Never stop being your radiant, kind-hearted, and wonderfully cheerful self!',
    'Or bhi kuch batana h mujhe tum kaho toh main boluuu!!! chalooo bol hi deta huu main naaa 29 oct. 12am ko call karuungaa i hope ki tum call resive karogi',
    'mujhe pata h mujhe ye khud dena chahiye lekin main nikki ko de rha huu vo tumhe dedegi',
    'pata h mera aaj result aaya or CGPA bhi bhooth acha aaya h orr haa main apne collage ke ek e-cell( joki startup culture, bisiness ideas aur entrepreneurship ko promote karta h)',
    'Ishke liye maine interview bhi diyaa tha or unhone mujhe rakh kiyaa😄',
    'Basss itnaa hi ab jayadaa bak bak nhi karunga tumhe cake bhi tohhhh cut karna h🤤',
    'Or haaaaa',
    "Always. Keep smiling, keep shining, and take care of yourself, my sunshine.🥰🌻🎈",
  ],
  letterClosing: 'Always wishing you the very best, your friend forever 💕',
  musicTitle: 'Cute Birthday Melody 🎵'
};

export const BESTIE_REASONS: BestieReason[] = [
  {
    id: 1,
    icon: '🌻',
    title: 'Your thoughtful Heart🌻',
    text: "I'll alwaays remember the little things you do for me."
  },
  {
    id: 2,
    icon: '🤫',
    title: 'Secret Vault',
    text: 'You are so trustworthy, easy to talk to, and always listen with kindness and understanding.'
  },
  {
    id: 3,
    icon: '🍨',
    title: 'ice creem & Food Partner',
    text: 'Nobody appreciates good food, random snack cravings, and fun long conversations quite like you!'
  },
  {
    id: 4,
    icon: '👀',
    title: 'Great Understanding',
    text: 'We understand each other so well and always know what the other is thinking with just a glance.'
  },
  {
    id: 5,
    icon: '📣',
    title: 'Supportive Friend',
    text: 'The way you encourage others and always make people feel appreciated and confident.'
  },
  {
    id: 6,
    icon: '🤝',
    title: 'Always There For Help',
    text: 'Whenever life gets stressful, talking to a calm, supportive friend like you makes things better.'
  },
  {
    id: 7,
    icon: '🌸',
    title: 'A Rare & True Friend 🥰',
    text: 'Finding a genuine, thoughtful, and loyal friend like you is truly a special blessing in life.'
  },
  {
    id: 8,
    icon: '☕',
    title: 'Comfortable Company',
    text: 'We can talk about anything or just chill comfortably without any awkwardness at all.'
  },
  {
    id: 9,
    icon: '🛡️',
    title: 'Pure Loyalty',
    text: 'You are genuinely loyal, kind, and always stand up for the people you care about.'
  },
  {
    id: 10,
    icon: '🌟',
    title: 'You Inspire Me',
    text: 'Your kindness, your drive, and how genuinely good-hearted you are with everyone around you.'
  },
  {
    id: 11,
    icon: '💃',
    title: 'Cheerful Energy',
    text: 'Spontaneous fun moments, positive vibes, and bright smiles that light up any room!'
  },
  {
    id: 12,
    icon: '💖',
    title: 'Simply Because You Are Somyashree',
    text: 'Because life is so much more joyful and cheerful with you around as a great friend!'
  }
];

export const BESTIE_MESSAGES: MessageCard[] = [
  { id: '1', title: 'A truly wonderful human', tag: 'Friend 🥰', emoji: '🌟' },
  { id: '2', title: 'A genuine & caring friend', tag: 'Friend 🥰', emoji: '🤝' },
  { id: '3', title: 'Keep being your amazing self', tag: 'Vibes', emoji: '🌸' },
  { id: '4', title: 'So incredibly proud of you', tag: 'Cheer', emoji: '👑' },
  { id: '5', title: "You're pure sunshine", tag: 'Bright', emoji: '☀️' },
  { id: '6', title: 'Purest, sweetest soul ever', tag: 'Kind', emoji: '💖' },
  { id: '7', title: 'Wishing you endless happiness', tag: 'Always', emoji: '🌙' },
  { id: '8', title: 'Stay cheerful & happy forever', tag: 'Fun', emoji: '✨' },
  { id: '9', title: 'Dream big, 17 is your year!', tag: 'Goal', emoji: '🚀' },
  { id: '10', title: 'One in a billion friend 🥰', tag: 'Rare', emoji: '💎' },
  { id: '11', title: 'Keep shining bright, Somyashree', tag: 'Star', emoji: '✨' },
  { id: '12', title: 'So glad to have you as a friend', tag: 'Blessing', emoji: '🍀' }
];
