export interface Detection {
  label: string;
  confidence: number;
  timestamp: string; // or Date if you're parsing it as a Date object
  imageUrl: string;
  location?: string;
}