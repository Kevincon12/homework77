import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addMessage } from '../../features/messages/messagesSlice';
import type { RootState, AppDispatch } from '../../app/store';
import {Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@mui/material";


export const MessageForm = () => {
    const dispatch = useDispatch<AppDispatch>();
    const loading = useSelector((state: RootState) => state.messages.loading);

    const [open, setOpen] = useState(false);
    const [author, setAuthor] = useState('');
    const [message, setMessage] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleSubmit = async () => {
        if (!message.trim()) return;
        await dispatch(addMessage({ author, message, image }));
        setAuthor('');
        setMessage('');
        setImage(null);
        handleClose();
    };

    return (
        <>
            <Button variant="contained" onClick={handleOpen}>
                Добавить сообщение
            </Button>

            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Новое сообщение</DialogTitle>
                <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                    <TextField
                        label="Автор"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        fullWidth
                    />
                    <TextField
                        label="Сообщение"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                    />
                    <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} disabled={loading}>Отмена</Button>
                    <Button onClick={handleSubmit} variant="contained" disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Отправить'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};