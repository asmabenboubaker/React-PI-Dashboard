import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getUsers, addUser as addUserService, deleteUser as deleteUserService ,banUser,update} from "../service/api";


export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
  const response = await getUsers();
  return response;
});
export const addUser = createAsyncThunk("users/addUser", async (user) => {
  const response = await addUserService(user);
  return response;
});
export const updateAsyncThunk = createAsyncThunk(
  "users/updateUser",
  async (user) => {
    const response = await update(user.id,user);
    return response;
  }
);

export const deleteUser = createAsyncThunk("users/deleteUser", async (user) => {
  const response = await deleteUserService(user._id);
  return response.data;
});
export const banUseradmin = createAsyncThunk("users/ban", async (user) => {
  const response = await banUser(user._id);
  return response.data;
});

export const userSlice = createSlice({
  name: "users",
  initialState: { value: [] },
  reducers: {
   
    updateUsername: (state, action) => {
      state.value.map((user) => {
        if (user.id === action.payload.id) {
          user.username = action.payload.username;
        }
      });
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.value = action.payload;
    });
  },
});

export const {  updateUsername } = userSlice.actions;
export default userSlice.reducer;
