import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext(null);

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [userData, setUserData] = useState(null);
  const [userResume, setUserResume] = useState([]);
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => axios.interceptors.request.eject(interceptor);
  }, [token]);

  const getIsAuth = async () => {
    if (!token) {
      setIsLoading(false);
      return;
    }
    try {
      const { data } = await axios.get("/api/user/is-auth");
      if (data.success) {
        setUserData(data.user);
      }
    } catch (error) {
      handleLogout(); 
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIsAuth();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      const { data } = await axios.post("/api/user/login", { email, password });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUserData(data.user);
        toast.success("Login Berhasil");
        navigate("/app");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Login Gagal");
    }
  };

  const handleRegister = async (name, email, password) => {
    try {
      const { data } = await axios.post("/api/user/register", { name, email, password });
      if (data.success) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setUserData(data.user);
        toast.success("Registrasi Berhasil");
        navigate("/app");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registrasi Gagal");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUserData(null);
    toast.info("Logged Out");
    navigate("/login");
  };

  // 2. Resume Functions
  const handleCreateResume = async (title) => {
    try {
      const { data } = await axios.post("/api/resume/create", { title });
      if (data.success) {
        toast.success(data.message);
        return data.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Gagal membuat resume");
    }
  };

  const handleUpdateResume = async (resumeId, resumeData, imageFile, removeBackground) => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);
      formData.append("resumeData", JSON.stringify(resumeData));
      if (imageFile) formData.append("image", imageFile);
      formData.append("removeBackground", removeBackground);

      const { data } = await axios.put("/api/resume/update", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (data.success) {
        toast.success("Resume Tersimpan");
        return data.data;
      }
    } catch (error) {
      toast.error("Gagal update resume");
    }
  };

  const handleDeleteResume = async (resumeId) => {
    try {
      const { data } = await axios.delete(`/api/resume/delete/${resumeId}`);
      if (data.success) {
        toast.success(data.message);
        getUserResumes();
      }
    } catch (error) {
      toast.error("Gagal menghapus");
    }
  };

  const getResumeById = async (resumeId) => {
    try {
      const { data } = await axios.get(`/api/resume/get/${resumeId}`);
      if (data.success) {
        setUserResume(data.data);
        return data.data;
      }
    } catch (error) {
      toast.error("Resume tidak ditemukan");
    }
  };

  const getUserResumes = async () => {
    try {
      const { data } = await axios.get("/api/user/resume");
      if (data.success) {
        setUserResume(data.data || []);
      }
    } catch (error) {
      console.error("Gagal memuat daftar resume");
    }
  };

  const getSummaryAI = async (userContent) => {
    try {
      const { data } = await axios.post("/api/ai/enhance-sum", { userContent });
      if (data.success) {
        setSummary(data.enhanceContent);
        toast.success("Summary diperbarui!");
      }
    } catch (error) {
      toast.error("AI Error");
    }
  };

  const getDescriptionAI = async (userContent) => {
    try {
      const { data } = await axios.post("/api/ai/enhance-desc", { userContent });
      if (data.success) {
        setDescription(data.enhanceContent);
      }
    } catch (error) {
      toast.error("AI Error");
    }
  };

  const handleUploadResumeAI = async (resumeText, title) => {
    try {
      const { data } = await axios.post("/api/ai/upload-resume", { resumeText, title });
      if (data.success) {
        toast.success("Resume berhasil di-parsing!");
        navigate(`/editor/${data.resumeId}`);
      }
    } catch (error) {
      toast.error("Gagal mengurai resume");
    }
  };

  return (
    <AppContext.Provider
      value={{
        token, userData, userResume, summary, description, isLoading,
        handleLogin, handleRegister, handleLogout,
        handleCreateResume, handleUpdateResume, handleDeleteResume,
        getResumeById, getUserResumes,
        getSummaryAI, getDescriptionAI, handleUploadResumeAI
      }}
    >
      {children}
    </AppContext.Provider>
  );
};