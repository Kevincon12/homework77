import {Box, Container, Typography} from '@mui/material';
import MessageList from './components/messageList/messageList';
import {MessageForm} from "./components/messageForm/messageForm.tsx";

const App = () => (
    <Container maxWidth="md">
        <Typography variant="h4" mt={4} mb={2}>
            Messages
        </Typography>

        <Box mb={4}>
            <MessageForm/>
        </Box>

        <MessageList/>
    </Container>
);

export default App;