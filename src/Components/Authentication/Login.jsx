import { useState } from "react";
export const Login = () => {
  const [userDetails, setUserDetails] = useState({
    username: "",
    passowrd: "",
  });
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserDetails((prevdetails) => {
      return {
        ...prevdetails,
        [name]: value,
      };
    });
  };
  const handleFormSubmit = () => {
    // api call to add user
  };
  return (
    <form onSubmit={() => handleFormSubmit}>
      <input
        type="text"
        name="username"
        onChange={(event) => handleInputChange(event)}
      />
      <input
        type="password"
        name="password"
        onChange={(event) => handleInputChange(event)}
      />
    </form>
  );
};
