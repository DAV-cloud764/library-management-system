import api from './api';

const authService = {
  login: async (username, password) => {
  try {
    const response = await api.post("/auth/login", {
      username,
      password,
    });

    console.log("Login Response:", response.data);

    if (response.data.token) {
      localStorage.setItem("token", response.data.token);
    }

    return response.data;
  } catch (error) {
    console.error("FULL LOGIN ERROR:", error);
    console.error("STATUS:", error.response?.status);
    console.error("DATA:", error.response?.data);

    throw error;
  }
},

  logout: () => {
    localStorage.removeItem('token');
  },

  getToken: () => {
    return localStorage.getItem('token');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authService;