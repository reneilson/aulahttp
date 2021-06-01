import { User } from './User';

export interface Client {
  name: string;
  document: string;
  document_type: DocumentType;
  users?: User[];
  share_code?: string;
}
