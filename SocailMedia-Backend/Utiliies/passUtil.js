/** @format */

import bcrypt from "bcrypt";

export const hashedPass = async (pass) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
};

export const isValidPass = async (enteredPass, currPass) => {
  return await bcrypt.compare(enteredPass, currPass);
};
