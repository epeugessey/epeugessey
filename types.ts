
export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface MemorialSeed {
  id: string;
  name: string;
  message: string;
  flowerType: 'rose' | 'tulip' | 'lily' | 'daisy';
  color: string;
  date: Date;
}

export enum GardenFilter {
  ALL = 'ALL',
  RECENT = 'RECENT'
}
