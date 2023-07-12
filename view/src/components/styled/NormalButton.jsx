import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

const NormalButton = styled(Button)(({myColor}) => ({
    '&:active': {
        backgroundColor: myColor,
        borderColor: myColor
    },
    '&:focus': {
        backgroundColor: myColor,
        borderColor: myColor
    }
}))    

export default NormalButton