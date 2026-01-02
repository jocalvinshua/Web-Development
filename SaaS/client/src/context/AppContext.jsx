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

  const saveResume = async (resumeData) => {
    try {
      const formData = new FormData();
      formData.append('data', JSON.stringify(resumeData));
      if (resumeData.personal_info?.imageFile) {
        formData.append('image', resumeData.personal_info.imageFile);
      }
      const { data } = await axios.post(`${backendUrl}/api/resume/save`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          token: token
        }
      });

      if (data.success) {
        toast.success(data.message || "Resume saved!");
        return data.data;
      } else {
        toast.error(data.message);
        return null;
      }
    } catch (error) {
      console.error("Save Error:", error);
      toast.error(error.response?.data?.message || "Failed to save resume");
      return null;
    }
  };

  const getUserResumes = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/resume/list`, { headers: { token } });
      if (data.success) return data.resumes;
    } catch (error) {
      toast.error("Failed to load resumes");
    }
    return [];
  };

  const renameResume = async (resumeId, newTitle) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/resume/rename`, 
        { resumeId: resumeId, title: newTitle },
        { headers: { token } }
      );
      return data.success;
    } catch (error) {
      return false;
    }
  };

  const deleteResume = async (resumeId) => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/resume/delete`, 
        { resumeId }, 
        { headers: { token } }
      );
      if (data.success) {
        toast.success("Resume deleted");
        return true;
      }
    } catch (error) {
      toast.error("Failed to delete resume");
    }
    return false;
  };

  return (
    <AppContext.Provider value={{ 
        backendUrl, 
        token, 
        userData, 
        handleLogin, 
        getIsAuth, 
        logout,
        saveResume,
        getUserResumes,
        renameResume,
        deleteResume,
        navigate 
      }}>
      {children}
    </AppContext.Provider>
  );
};