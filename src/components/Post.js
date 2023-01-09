import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { EditData, GetData, AddData } from "../store";
import { useLocation } from "react-router-dom";
import { isElement } from "react-dom/test-utils";

const Post = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState("");

  const [id, setId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const onUpdate = async () => {
    try {
      let payload = new FormData();
      payload.set("name", name);
      payload.set("age", age);
      payload.set("email", email);
      payload.set("_id", id);

      payload.set("myfile", photo);
      // console.log("photo", payload.get("name"));

      dispatch(EditData(payload));
      // dispatch(GetData());
      // console.log(payload.id, payload.name, payload.age, payload.email);
      if (payload.name && payload.age !== undefined) {
        setName("");
        setAge("");
        setEmail("");
      }
      // AddStudent(payload);
    } catch (e) {
      console.log(e);
    }
  };
  const Submit = async () => {
    try {
      let payload = new FormData();
      payload.append("name", name);
      payload.append("age", age);
      payload.append("email", email);
      payload.append("myfile", photo);

      for (const pair of payload.entries()) {
        console.log(`${pair[0]}, ${pair[1]}`);
      }
      dispatch(AddData(payload));
      // if (payload.name && payload.age !== undefined) {
      //   setName("");
      //   setAge("");
      //   setEmail("");
      // }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (location.state) {
      const { _id, name, age, email, photo } = location.state;
      console.log(_id);
      setName(name);
      setAge(age);
      setId(_id);
      setEmail(email);
      setIsEdit(true);
      setPhoto(photo);
    }
  }, []);

  return (
    <div className="container mt-3">
      {/* <label for="fname">Id:</label>
      <input
        type="text"
        id="fname"
        name="fname"
        value={id}
        onChange={(e) => {
          setId(e.target.value);
        }}
      ></input> */}
      <div className="d-flex flex-column ">
        <div class="col ">
          <div class="col-sm">
            <label for="fname">name:</label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></input>
          </div>
          <div class="col-sm mt-4">
            <label for="fname">age: </label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={age}
              onChange={(e) => {
                setAge(e.target.value);
              }}
            ></input>
          </div>
          <div class="col-sm mt-4">
            <label for="fname">email:</label>
            <input
              type="text"
              id="fname"
              name="fname"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            ></input>
          </div>
          <div class="col-sm mt-4">
            {/* <form
              action="/uploadphoto"
              enctype="multipart/form-data"
              method="POST"
            > */}
            <input
              type="file"
              name="myImage"
              onChange={(e) => {
                setPhoto(e.target.files[0]);
              }}
            />
            {/* </form> */}
          </div>
          <div class="col-sm mt-4">
            {isEdit && (
              <input
                type="submit"
                value="update"
                onClick={(e) => {
                  onUpdate();
                }}
              ></input>
            )}
            {!isEdit && (
              <input
                type="submit"
                value="Post"
                onClick={(e) => {
                  Submit();
                }}
              ></input>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
