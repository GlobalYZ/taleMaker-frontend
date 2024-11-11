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

interface PasswordResetRequestModel
{
    email: string;
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

export const requestPasswordReset = async (resetData: PasswordResetRequestModel) => {
  try {
    const response = await axios.post(API_URL + '/api/account/forgotpassword', resetData);
    console.log(response);


        if (response.status === 200) {
            console.log('Password reset email sent');
            const token = response.data.token;
            await setItem('reset_password_token', token);
            return token
        } else {
            console.log("response failed: ", response);
        }

    
  } catch (error) {
    console.error('Password reset request failed:', error);
  }
};

export const resetPassword = async (resetData: ResetPasswordRequestModel) => {
  try {
    const authToken = await getItem('reset_password_token'); //place token from request password reset here
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
        if (response.status === 200 || response.status === 201) {
            console.log('Password reset successful');
            return response.data;
        } else {
            console.log("response failed: ", response);
            return null;
        }
    } catch (error) {
        console.error('Password reset failed:', error);
        return null;
    }

};