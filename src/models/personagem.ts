export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export interface Personagem {
  id: number;
  name: string;
  status: CharacterStatus;
  species: string;
  type: string;
  gender:string;
  origin: string;
  location: string
  image: string;
  episodeCount: number;
}