import { useState } from 'react'
import { useNavigate } from 'react-router';
import { signupUser } from '../api/Users'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Input from '@mui/material/Input';
import PageBox from '../components/styled/PageBox'
import RoundedButton from '../components/styled/RoundedButton'
import CircularProgress from '@mui/material/CircularProgress';
import Colors from '../const/colors';

const Signup = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPwd] = useState('')
    const [name, setName] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [isLoading, setLoading] = useState(false)

    const onClickSignup = async () => {
        setLoading(true)
        const res = await signupUser({ email, name, password })
        if (res.status) {
            console.log(res.json)
            return navigate("/")
        } else {
            setErrMsg('이메일 중복이거나 다른 입력이 잘못되었습니다.')
            console.log(res.json)
            setLoading(false)
        }
    }

    const onTypeEmail = (e) => {
        setErrMsg('')
        setEmail(e.target.value)
    }

    const onTypeName = (e) => {
        setErrMsg('')
        setName(e.target.value)
    }

    const onTypePwd = (e) => {
        setErrMsg('')
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
                                            이름
                                        </Typography>
                                    </Box>
                                </Grid>
                                <Grid item sx={{
                                    display: 'flex', width: '100%',
                                    justifyContent: 'center', alignItems: 'center'
                                }}>
                                    <Input
                                        onChange={onTypeName}
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
                                    <RoundedButton onClick={onClickSignup} sx={{
                                        backgroundColor: Colors.mainColor, width: '50%'
                                    }}>
                                        {isLoading ?
                                            <CircularProgress />
                                            :
                                            <Typography variant='subtitle1'
                                                sx={{ fontWeight: 'fontWeightBold', color: 'white' }}>
                                                회원가입
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

export default Signup