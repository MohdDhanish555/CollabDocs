import React, { useEffect, useState } from "react";
import { errorToastMessage } from "../../utils/toast";
import { http } from "../../utils/http";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await http.get("/users/");
        setLoading(false);
      } catch (err) {
        errorToastMessage(err as Error);
        setLoading(false);
      }
    };
    fetchData();
  }, [setLoading]);

  return <div>{loading ? "Loading..." : "Home"}</div>;
};

export default Home;
