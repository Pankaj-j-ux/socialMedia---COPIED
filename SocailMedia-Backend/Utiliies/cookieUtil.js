/** @format */
import { getJwt } from "./jwtUtil.js";

export const generateCookie = async (model, res) => {
  try {
    const option = {
      expire: new Date(
        Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
    };

    const jwttoken = await getJwt(model);
    console.log(jwttoken);

    res.status(200).cookie("token", jwttoken, option).json({
      success: true,
      jwttoken,
      model,
    });
  } catch (err) {}
};
