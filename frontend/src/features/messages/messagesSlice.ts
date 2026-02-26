import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Message {
    id: string;
    author: string;
    message: string;
    image: string | null;
}

interface MessagesState {
    items: Message[];
    loading: boolean;
    error: string | null;
}

const initialState: MessagesState = {
    items: [],
    loading: false,
    error: null,
};

const API_URL = 'http://localhost:8000';

export const fetchMessages = createAsyncThunk(
    'messages/fetchMessages',
    async () => {
        const response = await axios.get<Message[]>(`${API_URL}/messages`);
        return response.data;
    }
);

interface NewMessagePayload {
    author?: string;
    message: string;
    image?: File | null;
}

export const addMessage = createAsyncThunk(
    'messages/addMessage',
    async (payload: NewMessagePayload) => {
        const formData = new FormData();
        formData.append('message', payload.message);
        if (payload.author) formData.append('author', payload.author);
        if (payload.image) formData.append('image', payload.image);

        const response = await axios.post<Message>(`${API_URL}/messages`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    }
);

export const deleteMessage = createAsyncThunk(
    'messages/deleteMessage',
    async (id: string) => {
        await axios.delete(`${API_URL}/messages/${id}`);
        return id;
    }
);

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMessages.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMessages.fulfilled, (state, action: PayloadAction<Message[]>) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to fetch messages';
            })
            .addCase(addMessage.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addMessage.fulfilled, (state, action: PayloadAction<Message>) => {
                state.loading = false;
                state.items.push(action.payload);
            })
            .addCase(deleteMessage.fulfilled, (state, action: PayloadAction<string>) => {
                state.items = state.items.filter(m => m.id !== action.payload);
            })
            .addCase(addMessage.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || 'Failed to add message';
            });
    },
});

export default messagesSlice.reducer;