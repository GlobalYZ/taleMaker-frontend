import axios from 'axios';
import { setItem, getItem, removeItem } from '../scripts/store';
import { API_URL } from '../constants/api';


interface LoginRequestModel {
  email: string;
  password: string;
}

interface LoginResponseModel {
  token: string;
  expiration: string;
}

interface SignupRequestModel {
  email: string;
  password: string;
}

interface ResetPasswordRequestModel {
  token: string;
  newPassword: string;
}

export const login = async (credentials: LoginRequestModel) => {
  try {
    const response = await axios.post<LoginResponseModel>(API_URL + 'api/Account/Login', credentials);
    if (response.status === 200) {
        const { token } = response.data;
        await setItem('auth_token', token);
        return token;
    } else {
        console.log("response failed: ", response);
    }
    
  } catch (error) {
    console.error('Login failed:', error);
    return null;
  }
};

export const signup = async (userData: SignupRequestModel) => {
  try {
    const response = await axios.post(API_URL + 'api/Account/Signup', userData);
    if (response.status === 200) {
        const { data } = response.data;
        console.log("signup successful: ", data);
        return data;
    } else {
        console.log("response failed: ", response);
    }
    return response.data;
  } catch (error) {
    console.error('Signup failed:', error);
    return null;
  }
};

export const requestPasswordReset = async (email: string) => {
  try {
    const response = await axios.post(API_URL + '/api/Account/ForgotPassword', { email });
    if (response.status === 200) {
        console.log('Password reset email sent');
    } else {
        console.log("response failed: ", response);
    }
  } catch (error) {
    console.error('Password reset request failed:', error);
  }
};

export const resetPassword = async (resetData: ResetPasswordRequestModel) => {
  try {
    const response = await axios.post(API_URL + '/api/Account/ResetPassword', resetData);
    if (response.status === 200) {
        console.log('Password reset successful');
    } else {
        console.log("response failed: ", response);
    }
  } catch (error) {
    console.error('Password reset failed:', error);
  }
};