import Box from '@mui/material/Box';
import { experimentalStyled as styled } from '@mui/material/styles';

const PageBox = styled(Box)(({ theme }) => ({
    component: 'div',
    overflow: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%'
}));

export default PageBox;