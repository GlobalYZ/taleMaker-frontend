import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

interface CookieOptions {
  expires?: Date;
  path?: string;
  secure?: boolean;
  httpOnly?: boolean;
}

const setItem = async (key: string, value: string) => {
  if (Platform.OS === 'web') {
    localStorage.setItem(key, value);
  } else {
    await SecureStore.setItemAsync(key, value);
  }
};

const getItem = async (key: string): Promise<string | null> => {
  if (Platform.OS === 'web') {
    return localStorage.getItem(key);
  }
  return await SecureStore.getItemAsync(key);
};

const removeItem = async (key: string) => {
  if (Platform.OS === 'web') {
    localStorage.removeItem(key);
  } else {
    await SecureStore.deleteItemAsync(key);
  }
};

const setCookie = (name: string, value: string, options: CookieOptions = {}) => {
  if (Platform.OS === 'web') {
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    
    if (options.expires) {
      cookieString += `; expires=${options.expires.toUTCString()}`;
    }
    
    if (options.path) {
      cookieString += `; path=${options.path}`;
    }
    
    if (options.secure) {
      cookieString += '; secure';
    }
    
    if (options.httpOnly) {
      cookieString += '; httpOnly';
    }
    
    document.cookie = cookieString;
  }
};

const getCookie = (name: string): string | null => {
  if (Platform.OS === 'web') {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=').map(c => c.trim());
      if (decodeURIComponent(cookieName) === name) {
        return decodeURIComponent(cookieValue);
      }
    }
    return null;
  }
  return null;
};

const deleteCookie = (name: string, path: string = '/') => {
  if (Platform.OS === 'web') {
    document.cookie = `${encodeURIComponent(name)}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=${path}`;
  }
};

const hasItem = async (key: string): Promise<boolean> => {
  const value = await getItem(key);
  return value !== null;
};

export { 
  setItem, 
  getItem, 
  removeItem, 
  setCookie, 
  getCookie, 
  deleteCookie,
  hasItem 
};
