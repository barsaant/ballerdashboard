import React, { useEffect } from "react";

const Home = (props) => {
  useEffect(() => {
    props.changeSection("home");
  }, []);
  return <div></div>;
};

export default Home;
