import { useEffect } from "react";
import { useSelector } from "react-redux";
import {  useAppDispatch } from "../store";
import type { RootState } from "../store";  
import { fetchUsers } from "../store/userSlice";

export const useFetchUsers = () => {
  const dispatch = useAppDispatch();
  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (users.length === 0) dispatch(fetchUsers());
  }, [dispatch, users.length]);

  return { users, loading, error };
};
