import axios from "axios";

const apiMesto = axios.create({
  baseURL: 'https://nomoreparties.co/v1',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'f5453d66-220b-4eec-9304-3d93ad06c4d6'
  }
})

apiMesto.interceptors.response.use(
  response => {
    return {
      success: true,
      data: response.data,
      status: response.status
    };
  },
  error => {
    const { status, data } = error.response || {};
    console.log(status);
    return Promise.reject({
      success: false,
      error: data,
      status
    });
  }
);

export const apiMestoEndpoints = {
  getProfile: async () => {
    const response = await apiMesto.get('/higher-front-back-dev/users/me');
    return response.data
  },

  getCards: async () => {
    const response = await apiMesto.get('/higher-front-back-dev/cards')
    return response.data
  },

  updateProfile: async (name, about) => {
    const response = await apiMesto.patch('/higher-front-back-dev/users/me', { name, about });
    return response.data;
  },

  addNewCard: async (name, link) => {
    const response = await apiMesto.post('/higher-front-back-dev/cards', { name, link });
    return { data: response.data, success: response.success };
  },

  deleteCard: async (cardId) => {
    const response = await apiMesto.delete(`/higher-front-back-dev/cards/${cardId}`);
    return response.success;
  },

  likeCard: async (cardId) => {
    const response = await apiMesto.put(`/higher-front-back-dev/cards/likes/${cardId}`)
    return {data: response.data, success: response.success}
  },

  unlikeCard: async (cardId) => {
    const response = await apiMesto.delete(`/higher-front-back-dev/cards/likes/${cardId}`)
    return response.data
  },

  updateAvatar: async (avatar) => {
    const response = await apiMesto.patch('/higher-front-back-dev/users/me/avatar', {
      avatar
    })
    return response.success
  }
}
