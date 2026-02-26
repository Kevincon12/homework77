import { Card, CardContent, Typography, CardMedia, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import type { AppDispatch } from '../../app/store';
import { deleteMessage } from '../../features/messages/messagesSlice';
import type { Message } from '../../features/messages/messagesSlice';

interface MessageItemProps {
    message: Message;
}

const MessageItem = ({ message }: MessageItemProps) => {
    const dispatch = useDispatch<AppDispatch>();

    const handleDelete = () => {
        dispatch(deleteMessage(message.id));
    };

    return (
        <Card sx={{ mb: 2 }}>
            {message.image && (
                <CardMedia
                    component="img"
                    height="200"
                    image={`http://localhost:8000/${message.image}`}
                    alt="message image"
                />
            )}
            <CardContent>
                <Typography variant="subtitle2">{message.author}</Typography>
                <Typography variant="body1">{message.message}</Typography>
                <Button
                    variant="outlined"
                    color="error"
                    size="small"
                    sx={{ mt: 1 }}
                    onClick={handleDelete}
                >
                    Удалить
                </Button>
            </CardContent>
        </Card>
    );
};

export default MessageItem;