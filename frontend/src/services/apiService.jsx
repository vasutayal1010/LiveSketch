import axios from 'axios';
const API_URL = 'http://localhost:8000';

export const registerUser = async (userData) => {
    try{
        const response = await axios.post(`${API_URL}/api/v1/auth/signup`, userData);
        return response.data;
    }catch(error){
        console.error('Error in User Registration From service.jsx',error);
        throw error;
    }
}
export const loginUser = async (userData) => {
    try{
        const response = await axios.post(`${API_URL}/api/v1/auth/signin`, userData);
        return response.data;
    }catch(error){
        console.error('Error in User Login From service.jsx',error);
        throw error;
    }
}

export const resetPassword = async (userId,userData) => {
    try{
        const response = await axios.patch(
          `${API_URL}/api/v1/auth/resetpassword/:${userId}`,
          userData
        );
        return response.data;
    }catch(error){
        console.error('Error in Reset Password From service.jsx',error);
        throw error;
    }
}