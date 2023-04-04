/** @format */

import jwt from "jsonwebtoken";

export const getJwt = async (model) => {
  return await jwt.sign({ id: model._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXP,
  });
};

export const decodeJwt = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};
