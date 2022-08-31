import { useContext } from "react";
import { UserContext } from "./About";

const Contact = () => {
  const { user } = useContext(UserContext);

  console.log("@@@@@@@@@@@@", user);
  return (
    <div>
      <h1>{`${user} Contact List`}</h1>
    </div>
  );
};

export default Contact;
