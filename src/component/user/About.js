import { Link } from "@mui/material";
import { createContext, useState } from "react";

export const UserContext = createContext();

const About = () => {
  const [user, setUser] = useState("Varun Patidar");

  return (
    <UserContext.Provider value={{ user }}>
      <div>
        <h1>About</h1>
        <h1>{`My name is ${user}`}</h1>
        <Link href="/contact">Contact Page</Link>
      </div>
    </UserContext.Provider>
  );
};

export default About;
