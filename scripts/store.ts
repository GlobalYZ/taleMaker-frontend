import * as SecureStore from 'expo-secure-store';

const setItem = async (key: string, value: string) => {
  await SecureStore.setItemAsync(key, value);
};

const getItem = async (key: string) => {
  return await SecureStore.getItemAsync(key);
};

const removeItem = async (key: string) => {
  await SecureStore.deleteItemAsync(key);
};

export { setItem, getItem, removeItem };
