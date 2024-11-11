import axios from 'axios';
import { setItem, getItem, removeItem } from '../scripts/store';
import { API_URL } from '../constants/api';
import Toast from 'react-native-toast-message';

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
        const expireTime = new Date(new Date().getTime() + response.data.expiresIn * 1000);

        await setItem('auth_token', response.data.accessToken);
        await setItem('auth_token_expire', expireTime.toISOString());
        Toast.show({
          type: 'success',
          text1: 'Successfully logged in!',
        });
        return accessToken;
    } else {
        console.log("response failed: ", response);
        Toast.show({
          type: 'error',
          text1: 'Login failed. Please try again.',
        });
    }
    
  } catch (error) {
    console.error('Login failed:', error);
    Toast.show({
      type: 'error',
      text1: 'Error',
      text2: 'Login failed. Please check your credentials.'
    });
    return null;
  }
};

export const signup = async (userData: SignupRequestModel) => {
    try {
      const response = await axios.post(API_URL + 'api/useraccount/Create', userData);
  
      if (response.status === 201 || response.status === 200) {
        const { data } = response;
        console.log("Signup successful");
        Toast.show({
          type: 'success',
          text1: 'Account created successfully!'
        });
        return data;
      } else {
        console.log("Signup failed: ", response);
        Toast.show({
          type: 'error',
          text1: 'Failed to create account. Please try again.'
        });
        return null;
      }
    } catch (error) {
      console.error('Signup failed:', error);
      Toast.show({
        type: 'error',
        text1: 'Failed to create account. Please check your information.',
      });
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
        Toast.show({
          type: 'success',
          text1: 'Password reset email has been sent!',
        });
        return token;
    } else {
        console.log("response failed: ", response);
        Toast.show({
          type: 'error',
          text1: 'Failed to send reset email. Please try again.',
        });
    }
    
  } catch (error) {
    console.error('Password reset request failed:', error);
    Toast.show({
      type: 'error',
      text1: 'Failed to send reset email. Please check your email address.',
    });
    return null;
  }
};

export const resetPassword = async (resetData: ResetPasswordRequestModel) => {
  try {
    const authToken = await getItem('reset_password_token');
    const headers = {
        'Authorization': `Bearer ${authToken}`
    };
    const response = await axios.post(
        API_URL + '/api/account/ResetPassword', 
        resetData, 
        { headers }
    );
    if (response.status === 200 || response.status === 201) {
        console.log('Password reset successful');
        Toast.show({
          type: 'success',
          text1: 'Password has been reset successfully!'
        });
        return response.data;
    } else {
        console.log("response failed: ", response);
        Toast.show({
          type: 'error',
          text1: 'Failed to reset password. Please try again.'
        });
        return null;
    }
  } catch (error) {
    console.error('Password reset failed:', error);
    Toast.show({
      type: 'error',
      text2: 'Failed to reset password. Please try again later.'
    });
    return null;
  }
};