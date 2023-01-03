import React from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Table } from "reactstrap";
import { useState } from "react";
import { GetData, DelData } from "../store";
import { useNavigate } from "react-router-dom";

const Get = () => {
  const { data } = useSelector((state) => {
    return state;
  });

  const navigate = useNavigate();

  const onEdit = (el) => {
    try {
      // dispatch(EditStudentAction(payload));
      navigate("/Post", { state: el });
      // Isclick(true);
    } catch (e) {
      console.log(e);
    }
  };
  const onDelete = (el) => {
    try {
      let payload = {
        id: el._id,
      };
      dispatch(DelData(payload));
    } catch (e) {
      console.log(e);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetData());
  }, []);
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>Index</th>
            <th>userId</th>
            <th>Name</th>
            <th>Age</th>
            <th>Email-Id</th>
            <th>Update</th>
            <th>Delete</th>
          </tr>
        </thead>
        {data.length > 0 ? (
          data.map((el, indx) => {
            return (
              <tbody key={indx}>
                <tr>
                  <td>{indx + 1}</td>
                  <td>{el._id}</td>
                  <td>{el.name}</td>
                  <td>{el.age}</td>
                  <td>{el.email}</td>
                  <td>
                    <Button
                      color="success"
                      onClick={(e) => {
                        onEdit(el);
                      }}
                    >
                      Edit user
                    </Button>
                  </td>
                  <td>
                    <Button
                      color="danger"
                      onClick={(e) => {
                        onDelete(el);
                      }}
                    >
                      Delete user
                    </Button>
                  </td>
                </tr>
              </tbody>
            );
          })
        ) : (
          <>
            <p>No data</p>
          </>
        )}
      </Table>
    </div>
  );
};

export default Get;
