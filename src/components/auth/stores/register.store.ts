import { create } from 'zustand';
import { UserProperties } from './stores.type';
import { AvatarFullConfig, genConfig } from '@ui/avatar';

// Define properties for the user state
interface RegisterState extends UserProperties {
  password: string;
  setPassword: (password: string) => void;
  setUserName: (userName: string) => void;
  setGenre: (genre: 'man' | 'woman') => void;
  setAvatar: (avatar: AvatarFullConfig) => void;
  getUser: () => UserProperties & { password: string };
}

/*
 * This function creates the store for managing user data.
 * uses the zustand persist middleware to persist the user data in AsyncStorage.
 * the data is stored in the 'userData' key.
 * the data to be saved is the name, the sex and the avatar.
 */
export const useRegisterStore = create<RegisterState>()((set, get) => {
  const defaultAvatarConfig: AvatarFullConfig = {
    hatStyle: 'none',
    hairStyle: 'thick',
    shirtStyle: 'polo',
    eyeBrowStyle: 'up',
  };

  return {
    // Properties
    userName: '',
    genre: 'man',
    password: '',
    avatar: genConfig(defaultAvatarConfig),

    // Methods
    setPassword: (password: string) => set({ password }),
    setUserName: (userName: string) => set({ userName }),
    setGenre: (genre: 'man' | 'woman') => set({ genre }),
    setAvatar: (avatar: AvatarFullConfig) => set({ avatar }),
    getUser: () => {
      const { userName, genre, avatar, password } = get();
      return { userName, genre, avatar, password };
    },
  };
});
