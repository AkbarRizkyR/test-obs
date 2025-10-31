import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    phone: string;
    website: string;
    image: string;
}

interface UserState {
    users: User[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
};

// Fetch data dummy dari JSONPlaceholder
export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res.data.map((user: any) => ({
        ...user,
        image: `https://picsum.photos/seed/${user.id}/200`,
    }));
});

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<User>) => {
            state.users.push({
                ...action.payload,
                id: state.users.length + 1,
                image: `https://picsum.photos/seed/${state.users.length + 1}/200`,
            });
        },
        editUser: (state, action: PayloadAction<User>) => {
            const index = state.users.findIndex((u) => u.id === action.payload.id);
            if (index !== -1) {
                state.users[index] = { ...action.payload };
            }
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            state.users = state.users.filter((u) => u.id !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to load users";
            });
    },
});

export const { addUser, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
