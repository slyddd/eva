/*
 * This file contains the Zustand store for managing user data.
 * it uses Zustand to create a store that holds user data,
 * the data is persisted using AsyncStorage.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { UserProperties } from './stores.type';
import { AvatarFullConfig, genConfig } from '@ui/avatar';

// Define properties for the user state
interface UserState extends UserProperties {
  id: string;
  setUser: (user: UserProperties & { id: string }) => void;
  clear: () => void;
}

/*
 * This function creates the store for managing user data.
 * uses the zustand persist middleware to persist the user data in AsyncStorage.
 * the data is stored in the 'userData' key.
 * the data to be saved is the name, the sex and the avatar.
 */
export const useUserStore = create<UserState>()(
  persist(
    (set) => {
      const defaultAvatarConfig: AvatarFullConfig = {
        hatStyle: 'none',
        hairStyle: 'thick',
        shirtStyle: 'polo',
        eyeBrowStyle: 'up',
      };

      return {
        // Properties
        id: '',
        userName: '',
        genre: 'man',
        avatar: genConfig(defaultAvatarConfig),

        // Methods
        setUser: (user: UserProperties & { id: string }) =>
          // NOTE: this function is used to set the user data and persist the state
          set({
            id: user.id,
            userName: user.userName,
            genre: user.genre,
            avatar: user.avatar,
          }),

        clear: () =>
          // NOTE: this function is used to clear the user data and reset the persistent state
          set({
            userName: '',
            genre: 'man',
            avatar: genConfig(defaultAvatarConfig),
          }),
      };
    },
    // NOTE: this is the key used to persist the data in AsyncStorage
    {
      name: 'userData', // The name in AsyncStorage
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        // This is the data to be saved in AsyncStorage
        id: state.id,
        userName: state.userName,
        genre: state.genre,
        avatar: state.avatar,
      }),
    },
  ),
);
