import { createSlice, current } from "@reduxjs/toolkit";
import { Action } from "@remix-run/router";
import axios from "axios";

const actionSlice = createSlice({
  name: "data",
  initialState: {
    data: [],
  },
  reducers: {
    add(state, action) {
      const { payload } = action;
      state.data.push(payload);
      console.log(action.payload);
    },
    getdata(state, action) {
      if (!state.data[0]) state.data = [...action.payload];
    },
    editdata(state, action) {
      // const { _id, name, age, email, myfile } = action.payload;
      // console.log(action.payload);
      // state.data = state.data.map((el) => {
      //   if (el._id == _id)
      //     return {
      //       _id: el._id,
      //       name: name,
      //       age: age,
      //       email: email,
      //       myfile: myfile,
      //     };
      //   return el;
      // });
      // state.data = [...state.data];
    },
    deldata(state, action) {
      const { id } = action.payload;
      state.data = state.data.filter((el) => el._id !== id);
      // console.log(action.payload.id);
    },
  },
});
export default actionSlice.reducer;
const { add, getdata, editdata, deldata } = actionSlice.actions;

export const GetData = () => async (dispatch) => {
  try {
    const res = await axios.get("http://localhost:8000/api/users");
    await dispatch(getdata(res.data));
  } catch (error) {
    return console.error(error);
  }
};

export const AddData = (formData) => async (dispatch) => {
  try {
    console.log(formData);
    const res = await axios.post("http://localhost:8000/api/create", formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(formData);
    await dispatch(add(res.data));
  } catch (error) {
    return console.error(error);
  }
};
export const EditData = (formData) => async (dispatch) => {
  console.log(formData.get("myfile"));
  for (const pair of formData.entries()) {
    console.log(`${pair[0]}, ${pair[1]}`);
  }
  try {
    const res = await axios.put(
      `http://localhost:8000/api/update/${formData.get("_id")}`,
      formData,
      {
        headers: {
          "content-type": "multipart/form-data",
        },
      }
    );
    var object = {};
    formData.forEach(function (value, key) {
      object[key] = value;
    });
    // // var json = JSON.stringify(object);
    // console.log(object);

    await dispatch(getdata(object));
  } catch (error) {
    return console.error(error);
  }
};

export const DelData = (payload) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:8000/api/delete`, {
      _id: payload.id,
      imageUrl: payload.imageUrl,
    });
    // const res = await axios.delete(
    //   `http://localhost:8000/api//delete/${payload.id}`
    // );
    // console.log("IMAGE_URL", payload.imageUrl);
    await dispatch(deldata(payload));
  } catch (error) {
    return console.error(error);
  }
};
