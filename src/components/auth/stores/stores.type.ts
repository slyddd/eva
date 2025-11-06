import { AvatarFullConfig } from '@ui/avatar';

// Define user Properties
export interface UserProperties {
  userName: string;
  genre: 'man' | 'woman';
  avatar: AvatarFullConfig;
}
