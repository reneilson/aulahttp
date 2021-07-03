import { Pet } from './Pet';

export interface Tag {
  id?: number;
  name?: string;
  pets?: Array<Pet>;
}
