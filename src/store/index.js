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
    },
    getdata(state, action) {
      if (!state.data[0]) state.data = [...action.payload];
    },
    editdata(state, action) {
      const { id, name, age, email } = action.payload;
      // console.log(action.payload.id);
      state.data = state.data.map((el) => {
        if (el._id == id)
          return { _id: el._id, name: name, age: age, email: email };
        return el;
      });
    },
    deldata(state, action) {
      const { id } = action.payload;
      state.data = state.data.filter((el) => el._id !== id);
      console.log(action.payload.id);
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

export const AddData = (payload) => async (dispatch) => {
  try {
    console.log(payload.email);
    const res = await axios.post("http://localhost:8000/api/create", {
      email: payload.email,
      age: payload.age,
      name: payload.name,
    });
    console.log(res);
    await dispatch(add(res.data));
  } catch (error) {
    return console.error(error);
  }
};
export const EditData = (payload) => async (dispatch) => {
  try {
    const res = await axios.put(
      `http://localhost:8000/api/update/${payload.id}`,
      {
        _id: payload.id,
        email: payload.email,
        age: payload.age,
        name: payload.name,
      }
    );
    // console.log(res.originalurl);
    await dispatch(editdata(payload));
  } catch (error) {
    return console.error(error);
  }
};

export const DelData = (payload) => async (dispatch) => {
  try {
    const res = await axios.delete(
      `http://localhost:8000/api//delete/${payload.id}`
    );
    await dispatch(deldata(payload));
  } catch (error) {
    return console.error(error);
  }
};
