import express from "express";

import {
  deleteUser,
  getAllUsers,
  getTransactionByUserId,
  updateUser,
} from "../controllers/users";
import { isAuthenticated, isOwner } from "../middlewares";

export default (router: express.Router) => {
  router.get("/users", isAuthenticated, getAllUsers);
  router.get("/users/:id", isAuthenticated, getTransactionByUserId);
  router.delete("/users/:id", isAuthenticated, isOwner, deleteUser);
  router.patch("/users/:id", isAuthenticated, updateUser);
};
