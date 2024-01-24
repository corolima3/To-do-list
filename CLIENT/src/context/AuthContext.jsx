//import { useEffect } from "react";
import { createContext, useContext, useEffect, useState } from "react";
//import { loginRequest, registerRequest, verifyTokenRequest } from "../api/auth";
import { registerRequest, loginRequest } from "../api/auth";
//import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error("useAuth must be used within a AuthProvider");
    return context;
};

// eslint-disable-next-line react/prop-types
export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);
    const hola = "hola mundo";
    const signup = async (user) => {
        try {
            const res = await registerRequest(user);//obj con name, email, password
            if (res.status === 200) {
                setUser(res.data);
                setIsAuthenticated(true);
            }
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data);
        }
    };

    const signin = async (user) => {
        try {
            console.log(user)
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response);
             //setErrors(error.response.data.message);
             setErrors(error.response.data);
             /* if(Array.isArray(error.response.data)){ //3:08
              return setErrors(error.response.data)
             }
             setErrors([error.response.data]) */
        }
    };
    useEffect(() => {
      if(errors.length > 0){
        const timer=setTimeout(()=>{
          setErrors([])
        }, 5000)
        return ()=> clearTimeout(timer)
      }
    },[])

    return (
        <AuthContext.Provider value={{
            signup,
            user,
            hola,
            isAuthenticated,
            errors,
            signin
        }}>
            {children}
        </AuthContext.Provider>
    )
}

/* export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within a AuthProvider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  // clear errors after 5 seconds
  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      // setErrors(error.response.data.message);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        console.log(res);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        signup,
        signin,
        logout,
        isAuthenticated,
        errors,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext; */