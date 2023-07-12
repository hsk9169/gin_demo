import Button from '@mui/material/Button';
import { experimentalStyled as styled } from '@mui/material/styles';

const RoundedButton = styled(Button)(({ theme }) => ({
    borderRadius: 20,
    '&:hover': {
        backgroundColor: 'lightGrey'
    }
}));

export default RoundedButton;