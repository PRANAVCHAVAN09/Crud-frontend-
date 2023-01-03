import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { EditData, GetData, AddData } from "../store";
import { useLocation } from "react-router-dom";

const Post = () => {
  const location = useLocation();
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();

  const onUpdate = async () => {
    try {
      let payload = {
        id: location.state._id,
        name: name,
        age: age,
        email: email,
      };
      // console.log(payload.id);
      dispatch(EditData(payload));
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
      let payload = {
        name: name,
        age: age,
        email: email,
      };
      console.log(payload);
      dispatch(AddData(payload));
      if (payload.name && payload.age !== undefined) {
        setName("");
        setAge("");
        setEmail("");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    if (location.state) {
      const { id, name, age, email } = location.state;
      setName(name);
      setAge(age);
      setId(id);
      setEmail(email);
      setIsEdit(true);
      return;
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
