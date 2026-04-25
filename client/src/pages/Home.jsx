import { useState, useEffect } from "react";
import { getCurrentUser } from "../api/users";

const Home = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchMe = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data?.data?.user);
      } catch (err) {
        setError("failed to load profile");
      }
    };

    fetchMe();
  }, []);

  if (error) return <div>{error}</div>;
  if (!user) return <div>...Loading</div>;
  return (
    <div>
      <h2>Home Component</h2>
      <h3>Name: {user.name}</h3>
      <h3>Email: {user.email}</h3>
    </div>
  );
};

export default Home;
