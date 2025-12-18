
export interface DayItinerary {
  dayLabel: string;
  title: string;
  narrative: string;
  imageDescription: string;
  keyDetails: string[];
}

export interface TravelNote {
  title: string;
  subtitle: string;
  introduction: string;
  headerImageDescription: string;
  days: DayItinerary[];
  packingEssentials: string[];
  travelerTips: string[];
  conclusion: string;
}

export type AppStatus = 'idle' | 'processing' | 'viewing';
