import React, { useEffect } from "react";

const Home = (props) => {
  useEffect(() => {
    props.changeSection();
  }, []);
  return <div>hdfh</div>;
};

export default Home;
