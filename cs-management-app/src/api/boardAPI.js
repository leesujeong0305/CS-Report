import axios from 'axios';

const API_URL = `http://ubisampaju.synology.me:9101/boards`;

export const getAllBoard = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error adding board:', error);
    throw error;
  }
};

export const getBoard = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error adding board:', error);
    throw error;
  }
};

export const getCountBoard = async () => {
  try {
    const response = await axios.get(`${API_URL}/count`);
    return response.data;
  } catch (error) {
    console.error('Error adding board:', error);
    throw error;
  }
};


export const addBoard = async (data) => {
    try {
      const response = await axios.post(API_URL, data, {
        headers: {
          'Content-Type': 'application/json',
        }});
      return response.data;
    } catch (error) {
      console.error('Error adding board:', error);
      throw error;
    }
  };
  

  // 데이터 업데이트 함수
export const updateBoard = async (id, data) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, data);
      return response.data;
    } catch (error) {
      console.error('Error updating board:', error);
      throw error;
    }
  };

  export const deleteBoard = async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/${id}`);
      console.log('삭제 성공:', response.data);
      return response.data;
    } catch (error) {
      console.error('삭제 실패:', error.response?.data || error.message);
      throw error;
    }
  };