import { Pet } from './Pet';

export interface Category {
  id?: number;
  name?: string;
  pets?: Array<Pet>;
}
