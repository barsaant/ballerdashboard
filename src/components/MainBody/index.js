import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Home from "./Home";
import Media from "./Media";
import Users from "./Users";
import Zaal from "./Zaal";
import Articles from "./Zaal";

const MainBody = (props) => {
  const params = useParams();
  console.log(params);
  let content = <Home />;
  if (params.section === "sporthalls") {
    content = <Zaal />;
  } else if (params.section === "articles") {
    content = <Articles />;
  } else if (params.section === "media") {
    content = <Media />;
  } else if (params.section === "users") {
    content = <Users />;
  }
  useEffect(() => {
      props.changeSection(params.section);
  },[params.section]);

  return <>{content}</>;
};

export default MainBody;
