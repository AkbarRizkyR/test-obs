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
    dataLoaded: boolean; 
}

const initialState: UserState = {
    users: [],
    loading: false,
    error: null,
    dataLoaded: false, 
};

export const fetchUsers = createAsyncThunk("users/fetchUsers", async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/users");
    return res.data.map((user: any) => ({
        ...user,
        image: `https://picsum.photos/seed/${user.id}/200`,
    }));
});

export const addUserAsync = createAsyncThunk(
    "users/addUserAsync",
    async (newUser: Omit<User, "id" | "image">) => {
        const res = await axios.post(
            "https://jsonplaceholder.typicode.com/users",
            newUser
        );
        return res.data;
    }
);

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        addUser: (state, action: PayloadAction<Omit<User, "id">>) => {
            const newId = state.users.length > 0 
                ? Math.max(...state.users.map(u => u.id)) + 1 
                : 1;
            state.users.push({
                ...action.payload,
                id: newId,
            });
        },
        
        editUser: (state, action: PayloadAction<User>) => {
            const { id, name, email, username, phone, website } = action.payload;
            
            if (!name || !email) {
                console.warn("Name and email are required");
                return;
            }
            
            const index = state.users.findIndex((u) => u.id === id);
            if (index !== -1) {
                state.users[index] = { 
                    ...state.users[index], 
                    name, 
                    email, 
                    username: username || state.users[index].username,
                    phone: phone || state.users[index].phone,
                    website: website || state.users[index].website
                };
            }
        },
        updateUser: (state, action: PayloadAction<Partial<User> & { id: number }>) => {
            const { id, ...updatedFields } = action.payload;
            const index = state.users.findIndex((u) => u.id === id);
            
            if (index !== -1) {
                state.users[index] = { 
                    ...state.users[index], 
                    ...updatedFields 
                };
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
                if (!state.dataLoaded) {
                    state.users = action.payload;
                    state.dataLoaded = true; 
                }
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to load users";
            })
            .addCase(addUserAsync.pending, (state) => {
                state.loading = true;
            })
            .addCase(addUserAsync.fulfilled, (state, action) => {
                state.loading = false;
                const newId = state.users.length > 0 
                    ? Math.max(...state.users.map(u => u.id)) + 1 
                    : 1;
                state.users.push({
                    ...action.payload,
                    id: newId,
                    image: `https://picsum.photos/seed/${newId}/200`,
                });
            })
            .addCase(addUserAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? "Failed to add user";
            });
    },
});

export const { addUser, editUser, updateUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;