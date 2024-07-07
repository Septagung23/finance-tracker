import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
      password: { type: String, required: true, select: false },
      salt: { type: String, select: false },
      sessionToken: { type: String, select: false },
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

UserSchema.virtual("incomes", {
  ref: "Income",
  localField: "_id",
  foreignField: "userId",
  justOne: false,
});

UserSchema.virtual("expenses", {
  ref: "Expense",
  localField: "_id",
  foreignField: "userId",
  justOne: false,
});

export const UserModel = mongoose.model("User", UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: string) => UserModel.findOne({ email });
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });
export const getUserById = (id: string) =>
  UserModel.findById(id).populate("incomes").populate("expenses");
export const createUser = (val: Record<string, any>) =>
  new UserModel(val).save().then((user) => user.toObject());
export const deleteUserById = (id: string) =>
  UserModel.findByIdAndDelete({ _id: id });
export const updateUserById = (id: string, val: Record<string, any>) =>
  UserModel.findByIdAndUpdate(id, val);
