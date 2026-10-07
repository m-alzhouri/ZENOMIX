export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  iconName: string;
  features: string[];
  specs: {
    transitTime: string;
    capacity: string;
    globalCoverage: string;
  };
}

export interface FleetVehicle {
  id: string;
  name: string;
  type: 'heavy' | 'medium' | 'light' | 'electric';
  typeName: string;
  payload: string;
  volume: string;
  range: string;
  propulsion: string;
  imageAlt: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatarUrl?: string;
  quote: string;
  rating: number;
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
