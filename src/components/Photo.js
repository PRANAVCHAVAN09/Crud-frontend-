import React from "react";

const Photo = ({ user }) => {
  const photo = user
    ? `http://localhost:8000/uploads/${user}`
    : "https://bitsofco.de/content/images/2018/12/broken-1.png";

  // console.log("photo", user);

  return (
    <div className="rounded">
      <img
        src={`${photo}?time=${new Date().getTime()}`}
        alt="userPhoto"
        style={{ maxHeight: "100px", maxWidth: "100px" }}
        className="img-fluid img-thumbnail"
      />
    </div>
  );
};

export default Photo;
