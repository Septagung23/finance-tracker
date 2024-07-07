import express from "express";
import { get, identity, merge } from "lodash";

import { getUserBySessionToken } from "../db/users";

export const isAuthenticated = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const sessionToken = req.cookies["SHENX-AUTH"];

    if (!sessionToken) {
      console.log("No session token");
      return res.sendStatus(403);
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      console.log("User not found");
      return res.sendStatus(403);
    }

    merge(req, { identity: existingUser });
    return next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const isOwner = async (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  try {
    const { id } = req.params;
    const currentUser = get(req, "identity._id") as string;

    if (!currentUser) {
      return res.sendStatus(403);
    }
    if (currentUser !== id) {
      console.log("You're gonna delete your own account nigga!");
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};
