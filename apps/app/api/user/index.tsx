// Contains user actions related to authentication

import { useMutation, useQuery } from "@tanstack/react-query";
import { useMutationData } from "../../hooks/useMutation";
import axios from "axios";

axios.defaults.withCredentials = true; // Global axios config to enable cookies
const source = import.meta.env.VITE_PUBLIC_BASE_URL;

// ++++++++++++++++++++         User Actions                +++++++++++++++++++++++++++++++++++++++
export const getUserInfo = async () => {
  const response = await axios.get(`${source}/user`);
  return response.data;
};

export const userLogin = async (payload: any) => {
  const response = await axios.post(`${source}/user/signin`, payload);
  return response.data;
};

export const userSignup = async (payload: any) => {
  const response = await axios.post(`${source}/user/signup`, payload);
  return response.data;
};

// ++++++++++++++++++++++         Workspace Actions                +++++++++++++++++++++++++++++++++++++++
export const getWorkspaceInfo = async () => {
  const response = await axios.get(`${source}/workspace`);
  return response.data;
};

// +++++++++++++++++++++++         Component Actions                +++++++++++++++++++++++++++++++++++++++

export const getComponents = async () => {
  const response = await axios.get(`${source}/project`);
  return response.data;
};

export const newComponent = async (payload: any) => {
  const response = await axios.post(`${source}/project/new`, payload);
  return response.data;
};

export const updateComponent = async (payload: any) => {
  const response = await axios.post(
    `${source}/project/update/${payload._id}`,
    payload
  );
  return response.data;
};

export const deleteComponent = async (payload: any) => {
  const response = await axios.post(
    `${source}/project/delete/${payload._id}`,
    payload
  );
  return response.data;
};
