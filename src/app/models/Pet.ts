import { Category } from './Category';
import { Tag } from './Tag';

export interface Pet {
  id?: number;
  name: string;
  photoUrl: string;
  category?: Category;
  tags?: Array<Tag>;
}
