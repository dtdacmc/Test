import "antd/dist/antd.css";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

import AuthContext from "../contexts/AuthContext";
import "../styles/globals.css";
import { instance } from "../apis";
import axios from "axios";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  axios.defaults.baseURL = process.env.API_URL;
  let token = Cookies.get("token");

  useEffect(() => {
    if (token) {
      setIsLoggedIn(true);
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ loggedIn: isLoggedIn }}>
      <Component {...pageProps} />
    </AuthContext.Provider>
  );
}

export default MyApp;
