export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date?: string;
  rotation?: number;
  x?: number;
  y?: number;
  z?: number;
  scale?: number;
}

export interface MessageCard {
  id: string;
  title: string;
  tag: string;
  emoji: string;
}

export interface BestieReason {
  id: number;
  icon: string;
  title: string;
  text: string;
}

export interface AppConfig {
  recipientName: string;
  senderName: string;
  birthDate: string;
  milestoneAge: number;
  milestoneDays: number;
  passcode: string;
  cakeHeading: string;
  cakeCelebrationText: string;
  letterTitle: string;
  letterGreeting: string;
  letterBody: string[];
  letterClosing: string;
  customAudioUrl?: string;
  musicTitle?: string;
}

export type SceneType =
  | 'countdown'
  | 'passcode'
  | 'giftbox'
  | 'welcome'
  | 'milestone'
  | 'trivia'
  | 'award'
  | 'bouquet'
  | 'heartgame'
  | 'spinwheel'
  | 'cake'
  | 'letter'
  | 'reasons'
  | 'messages'
  | 'finale';
