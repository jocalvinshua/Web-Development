import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);
  const [newResume, setNewResume] = useState([])

  const getIsAuth = async () => {
    try {
      if (!token) return;
      const { data } = await axios.get(`${backendUrl}/api/user/is-auth`, {
        headers: { token }
      });
      if (data.success) {
        setUserData(data.user);
      } else {
        logout();
      }
    } catch (error) {
      console.error("Auth error:", error);
      logout();
    }
  };

  useEffect(() => {
    if (token) {
      getIsAuth();
    }
  }, []);

  const headers = {token};

  const handleLogin = async (formData) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/user/login`, formData);
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUserData(data.user);
        toast.success("Login Berhasil!");
        navigate("/app");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login gagal");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUserData(null);
    navigate("/login");
  };

  // Di dalam AppProvider
  const createResume = async (title) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/resume/create`, { title }, { headers });
      if (data.success) {
        toast.success("Resume initialized!");
        return data.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create");
      return null;
    }
  };

  const saveResumeContent = async (resumeId, content) => {
    try {
      const formData = new FormData();
      formData.append('resumeId', resumeId);
      Object.keys(content).forEach(key => {
        if (key === 'personalInfo' && content[key].imageFile) {
          formData.append('image', content[key].imageFile);
        }
        if (typeof content[key] === 'object') {
          formData.append(key, JSON.stringify(content[key]));
        } else {
          formData.append(key, content[key]);
        }
      });
      const { data } = await axios.patch(`${backendUrl}/api/resume/save-content`, formData, {
        headers: { 
          token, 
          'Content-Type': 'multipart/form-data' 
        }
      });

      if (data.success) {
        toast.success("Progress Saved!");
        return data.data;
      }
    } catch (error) {
      console.error("Save Error:", error.response?.data);
      toast.error("Save failed");
      return null;
    }
  };

  return (
    <AppContext.Provider value={{ 
        backendUrl, 
        token, 
        userData,

        handleLogin, 
        getIsAuth,
        logout,

        createResume,
        saveResumeContent,
        
        navigate 
      }}>
      {children}
    </AppContext.Provider>
  );
};