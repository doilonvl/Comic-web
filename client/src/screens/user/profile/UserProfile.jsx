import React, { useContext, useEffect, useState } from "react";
import UserDetails from "../../../components/user/UserDetails";
import { BASE_URL } from "../../../components/common/utilities/initials";
import axios from "axios";
import UserContext from "../../../contexts/UserContext.js";
import { fetchStoriesSuccess } from "../../../components/common/data/dataStory/dataSlice.js";
import { useDispatch } from "react-redux";

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, setUser } = useContext(UserContext);
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    if (!user) {
      axios
        .get(`${BASE_URL}/users`, config)
        .then((response) => {
          setUser(response.data);
        })
        .catch((e) => console.log(e.message));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/story/get_list_stories`, config)
      .then((res) => dispatch(fetchStoriesSuccess(res.data)))
      .catch((e) => console.log(e.message));
  }, [dispatch]);

  return <UserDetails />;
};

export default UserProfile;
