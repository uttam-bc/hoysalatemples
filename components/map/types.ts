export interface MapTemple {
  id: string;
  slug: string;
  name: string;
  nameKannada: string;
  town: string;
  district: string;
  region: string;
  lat: number;
  lng: number;
  yearBuilt: string;
  century: string;
  patron: string;
  deity: string;
  unescoStatus: string;
  ringOrder: number;
  x: number;
  y: number;
  thumbnailUrl?: string;
}

export interface MapLink {
  fromId: string;
  toId: string;
  type: "ring" | "cross";
  distanceKm: number;
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

export interface ExploreData {
  temples: MapTemple[];
  links: MapLink[];
}
