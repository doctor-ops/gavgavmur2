import { DOG_PROFILES } from './breedProfilesDogs';
import { CAT_PROFILES } from './breedProfilesCats';

export interface BreedProfile {
  about: string;
  character: string;
  facts: string[];
}

export function breedProfile(slug: string): BreedProfile | undefined {
  return DOG_PROFILES[slug] ?? CAT_PROFILES[slug];
}
