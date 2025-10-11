import React from "react";
import { useEffect } from "react";
import { serverUrl } from "../App";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setReviewData } from "../redux/reviewSlice";

const useAllReviews = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const allReviews = async () => {
      try {
        const allReviews = async () => {
          const result = await axios.get(serverUrl + "/api/review/getreview", {
            withCredentials: true,
          });
          dispatch(setReviewData(result.data));
          console.log(result.data);
        };
      } catch (error) {
        console.log(error);
      }
    };
    allReviews();
  }, []);
};

export default useAllReviews;
