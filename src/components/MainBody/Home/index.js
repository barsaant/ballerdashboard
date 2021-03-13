import React, { useEffect } from "react";

const Home = (props) => {
  useEffect(() => {
    props.changeSection();
  }, []);
  return <div></div>;
};

export default Home;
