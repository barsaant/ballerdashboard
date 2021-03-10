import React, { useEffect } from "react";

const Home = (props) => {
  useEffect(() => {
    props.changeSection("home");
  }, []);
  return <div>hdfh</div>;
};

export default Home;
