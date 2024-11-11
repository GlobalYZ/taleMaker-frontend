import axios from 'axios';
import { setItem, getItem, removeItem } from '../scripts/store';
import { API_URL } from '../constants/api';

interface LoginRequestModel {
  email: string;
  password: string;
}

interface LoginResponseModel {
  email: string;
  accessToken: string;
  expiresIn: number;
}

interface SignupRequestModel {
  email: string;
  password: string;
  confirmPassword: string;
}

interface ResetPasswordRequestModel {
  token: string;
  newPassword: string;
}

export const login = async (credentials: LoginRequestModel) => {
  try {
    const response = await axios.post<LoginResponseModel>(API_URL + 'api/account/Login', credentials);
    if (response.status === 201 || response.status === 200) {
        console.log(response.data);
        const { accessToken } = response.data;
        //how to set a expire time for the token
        const expireTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);

        await setItem('auth_token', response.data.accessToken);
        await setItem('auth_token_expire', expireTime.toISOString());
        return accessToken;
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
      // POST request to the signup API endpoint
      const response = await axios.post(API_URL + 'api/useraccount/Create', userData);
  
      // Check if the request was successful
      if (response.status === 201 || response.status === 200) {
        const { data } = response;
        console.log("Signup successful");
        return data;
      } else {
        console.log("Signup failed: ", response);
        return null;
      }
    } catch (error) {
      console.error('Signup failed:', error);
      return null;
    }
  };

export const requestPasswordReset = async (email: string) => {
  try {
    //check auth token expiration
    const authToken = await getItem('auth_token');
    const authTokenExpire = await getItem('auth_token_expire');
    if (authToken && authTokenExpire && new Date(authTokenExpire) > new Date()) {
        //add auth token to the request header
        const headers = {
            'Authorization': `Bearer ${authToken}`
        };
        //send request with auth token
        const response = await axios.post(
            API_URL + '/api/account/forgotpassword', 
            { email }, 
            { headers }
        );
        if (response.status === 200) {
            console.log('Password reset email sent');
        } else {
            console.log("response failed: ", response);
        }
    } else {
        console.log("auth token expired");
        removeItem('auth_token');
        removeItem('auth_token_expire');
    }
    
  } catch (error) {
    console.error('Password reset request failed:', error);
  }
};

export const resetPassword = async (resetData: ResetPasswordRequestModel) => {
  try {
    //check auth token expiration
    const authToken = await getItem('auth_token');
    const authTokenExpire = await getItem('auth_token_expire');
    if (authToken && authTokenExpire && new Date(authTokenExpire) > new Date()) {
        //add auth token to the request header
        const headers = {
            'Authorization': `Bearer ${authToken}`
        };
        //send request with auth token
        const response = await axios.post(
            API_URL + '/api/account/ResetPassword', 
            resetData, 
            { headers }
        );
        if (response.status === 200) {
            console.log('Password reset successful');
        } else {
            console.log("response failed: ", response);
        }
    } else {
        console.log("auth token expired");
        removeItem('auth_token');
        removeItem('auth_token_expire');
    }
  } catch (error) {
    console.error('Password reset failed:', error);
  }
};