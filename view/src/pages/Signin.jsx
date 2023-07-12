import { useState } from 'react'
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Input from '@mui/material/Input';
import PageBox from '../components/styled/PageBox'
import RoundedButton from '../components/styled/RoundedButton'
import CircularProgress from '@mui/material/CircularProgress';
import Colors from '../const/colors';
import { loginUser } from '../api/Users';
import { removeCookieToken, setRefreshToken } from '../storage/Cookie'
import { SET_TOKEN } from '../store/Auth'


const Signin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState('')
    const [password, setPwd] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [isLoading, setLoading] = useState(false)

    const onClickSignup = () => {
        return navigate("/signup")
    }

    const onClickSignin = async () => {
        setLoading(true)
        const res = await loginUser({ email, password })
        if (res.status) {
            removeCookieToken()
            setRefreshToken(res.json.data.refresh_token);
            dispatch(SET_TOKEN(res.json.data.access_token));
            return navigate("/home", { state: email })
        } else {
            console.log(res.json)
            setErrMsg('로그인 실패, 입력을 확인해주세요')
            setLoading(false)
        }
    }

    const onTypeEmail = (e) => {
        setEmail(e.target.value)
    }

    const onTypePwd = (e) => {
        setPwd(e.target.value)
    }

    return (
        <>
            <PageBox sx={{
                display: 'flex', width: '100%',
                height: '100%',
                justifyContent: 'center', alignItems: 'center'
            }}>
                <Grid container direction='column'
                    sx={{ pt: 20, justifyContent: 'center', alignItems: 'center', }}>

                    <Grid item sx={{ width: 500, pt: 2 }}>
                        <RoundedButton onClick={onClickSignup}
                            sx={{
                                width: '100%', backgroundColor: Colors.mainColor,
                                borderRadius: 20, pt: 0.5, pb: 0.5
                            }}>
                            <Grid container sx={{ width: '100%' }}>
                                <Grid item xs={9}>
                                    <Typography variant='subtitle2'
                                        sx={{ fontWeight: 'fontWeightNormal', color: 'white' }}>
                                        회원이 아니시면 여기를 눌러 회원가입을 해주세요
                                    </Typography>
                                </Grid>
                                <Grid item xs={3}>
                                    <Typography variant='subtitle2'
                                        sx={{ fontWeight: 'fontWeightNormal', color: 'white' }}>
                                    </Typography>
                                </Grid>
                            </Grid>

                        </RoundedButton>
                    </Grid>
                    <Grid item sx={{ width: 500, pt: 2 }}>
                        <Box sx={{
                            backgroundColor: Colors.lightGreen, borderRadius: 5, p: 2,
                        }}>
                            <Grid container direction='column'
                                sx={{ justifyContent: 'center', alignItems: 'center' }} >
                                <Grid item sx={{ pt: 2, width: '100%' }}>
                                    <Box sx={{ width: '100%', pl: 5 }}>
                                        <Typography variant='subtitle1'
                                            sx={{ fontWeight: 'fontWeightBold', color: Colors.mainColor }}>
                                            이메일
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item sx={{
                                    display: 'flex', width: '100%',
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Input
                                        onChange={onTypeEmail}
                                        sx={{
                                            width: '90%', height: 40, border: 1, pl: 2, pr: 2,
                                            borderRadius: 3, borderColor: Colors.mainColor,
                                            backgroundColor: 'white',
                                        }}
                                        disableUnderline
                                    />
                                </Grid>
                                <Grid item sx={{ pt: 2, width: '100%' }}>
                                    <Box sx={{ width: '100%', pl: 5 }}>
                                        <Typography variant='subtitle1'
                                            sx={{ fontWeight: 'fontWeightBold', color: Colors.mainColor }}>
                                            비밀번호
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item sx={{
                                    display: 'flex', width: '100%',
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Input
                                        onChange={onTypePwd}
                                        type={'password'}
                                        sx={{
                                            width: '90%', height: 40, border: 1, pl: 2, pr: 2,
                                            borderRadius: 3, borderColor: Colors.mainColor,
                                            backgroundColor: 'white',
                                        }}
                                        disableUnderline
                                    />
                                </Grid>
                                <Grid item sx={{
                                    pt: 2, display: 'flex', width: '100%',
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <RoundedButton onClick={onClickSignin} sx={{
                                        backgroundColor: Colors.mainColor, width: '50%'
                                    }}>
                                        {isLoading ?
                                            <CircularProgress />
                                            :
                                            <Typography variant='subtitle1'
                                                sx={{ fontWeight: 'fontWeightBold', color: 'white' }}>
                                                로그인
                                            </Typography>}
                                    </RoundedButton>
                                </Grid>
                                <Grid item sx={{
                                    pt: 2, display: 'flex', width: '100%',
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Typography variant='subtitle2'
                                        sx={{ fontWeight: 'fontWeightNormal', color: 'red' }}>
                                        {errMsg}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Grid>
                </Grid>
            </PageBox>
        </>
    );
}

export default Signin