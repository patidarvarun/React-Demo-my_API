import { useEffect } from "react";

const Logout = () => {
  useEffect(() => {
    localStorage.clear("token");
    setTimeout(() => {
      window.location = "/login";
    }, 1000);
  }, []);
  return <div></div>;
};

export default Logout;
