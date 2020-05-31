import React from "react";

const PageTitle = props => {
  const { location } = props;
  return (
    <h1>
      {location.pathname.split("/")[1][0].toUpperCase() +
        location.pathname.split("/")[1].slice(1)}
    </h1>
  );
};

export default PageTitle;
