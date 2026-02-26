import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { fetchMessages } from '../../features/messages/messagesSlice';
import { Box, CircularProgress, Typography } from '@mui/material';
import MessageItem from "../messageItem/messageItem.tsx";

const MessageList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { items, loading, error } = useSelector(
        (state: RootState) => state.messages
    );

    useEffect(() => {
        dispatch(fetchMessages());
    }, [dispatch]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" mt={5}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" mt={3}>
                {error}
            </Typography>
        );
    }

    if (items.length === 0) {
        return (
            <Typography mt={3}>
                Нет сообщений
            </Typography>
        );
    }

    return (
        <Box display="flex" flexDirection="column" gap={2} mt={3}>
            {items.map((message) => (
                <MessageItem key={message.id} message={message} />
            ))}
        </Box>
    );
};

export default MessageList;