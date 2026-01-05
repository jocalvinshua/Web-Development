import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  /* ================================
     AXIOS AUTH INTERCEPTOR (FIXED)
  ================================= */
  useEffect(() => {
    const interceptor = axios.interceptors.request.use((config) => {
      const storedToken = localStorage.getItem("token");

      // Only attach VALID JWT token
      if (storedToken && storedToken.startsWith("ey")) {
        config.headers.Authorization = `Bearer ${storedToken}`;
      }

      return config;
    });

    return () => axios.interceptors.request.eject(interceptor);
  }, []);

  /* ================================
     CHECK AUTH ON APP LOAD
  ================================= */
  const getIsAuth = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        setUserData(null);
        return;
      }

      const { data } = await axios.get(
        `${backendUrl}/api/user/is-auth`
      );

      if (data.success) {
        setUserData(data.user);
      }
    } catch (error) {
      console.error(
        "Auth Error:",
        error.response?.data?.message || error.message
      );

      // ❗ Do NOT delete token automatically here
      setUserData(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getIsAuth();
  }, []);

  /* ================================
     LOGIN
  ================================= */
  const handleLogin = async (formData) => {
  try {
    const payload = {
      email: formData.email,
      password: formData.password,
    };

    const { data } = await axios.post(
      `${backendUrl}/api/user/login`,
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    if (data.success) {
      localStorage.setItem("token", data.token);
      setUserData(data.user);
      toast.success("Selamat Datang!");
      navigate("/app");
    }
  } catch (error) {
    console.error("LOGIN ERROR:", error.response?.data);
    toast.error(error.response?.data?.message || "Login gagal");
  }
};


  /* ================================
     LOGOUT
  ================================= */
  const logout = () => {
    localStorage.removeItem("token");
    setUserData(null);
    toast.info("Sesi berakhir, silakan login kembali");
    navigate("/login");
  };

  /* ================================
     RESUME FUNCTIONS
  ================================= */
const createResume = async (title, token, navigate) => {
  try {
    const { data } = await axios.post(
      `${backendUrl}/api/resume/create`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (data.success) {
      toast.success("Resume successfully created");

      navigate(`/app/builder/${data.resumeId}`);
    } else {
      toast.error(data.message || "Failed to create resume");
    }
  } catch (error) {
    toast.error("Server error");
    console.error(error.response?.data || error.message);
  }
};


  const saveResumeContent = async (resumeId, content) => {
    try {
      const formData = new FormData();
      formData.append("resumeId", resumeId);

      Object.keys(content).forEach((key) => {
        if (key === "personalInfo") {
          const { imageFile, ...rest } = content[key];

          if (imageFile instanceof File) {
            formData.append("image", imageFile);
          }

          formData.append(key, JSON.stringify(rest));
        } else if (typeof content[key] === "object") {
          formData.append(key, JSON.stringify(content[key]));
        } else {
          formData.append(key, content[key]);
        }
      });

      const { data } = await axios.patch(
        `${backendUrl}/api/resume/save-content`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (data.success) {
        toast.success("Progress disimpan!");
        return data.data;
      }
    } catch (error) {
      console.error("Save Error:", error.response?.data);
      toast.error(error.response?.data?.message || "Gagal menyimpan");
      return null;
    }
  };

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        userData,
        isLoading,
        handleLogin,
        logout,
        createResume,
        saveResumeContent,
        navigate,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
