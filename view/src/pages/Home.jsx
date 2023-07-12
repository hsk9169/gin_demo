import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router';
import RoundedButton from '../components/styled/RoundedButton'
import Colors from '../const/colors';
import Typography from '@mui/material/Typography'
import PageBox from '../components/styled/PageBox'
import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid'
import { getData } from '../api/Data';
import { logoutUser } from '../api/Users';
import { tokenRefresh } from '../api/Token';
import { getCookieToken, removeCookieToken } from '../storage/Cookie';
import { useDispatch, useSelector } from 'react-redux';
import { getAccessToken, isAuthenticated } from '../store/Auth'
import { setRefreshToken } from '../storage/Cookie'
import { SET_TOKEN, DELETE_TOKEN } from '../store/Auth'

function Home() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { email } = useLocation()
    var accessToken = useSelector(getAccessToken);
    const isAuthorized = useSelector(isAuthenticated);

    const [data, setData] = useState('')
    const [errMsg, setErrMsg] = useState('')
    const [isDataLoading, setDataLoading] = useState(false)
    const [isRefreshLoading, setRefreshLoading] = useState(false)
    const [isLogoutLoading, setLogoutLoading] = useState(false)

    useEffect(() => {
        console.log(isAuthorized)
        if (!isAuthorized) {
            return navigate('/')
        }
    }, [isAuthorized, accessToken, navigate])

    const onClickGetData = async () => {
        setDataLoading(true)
        const res = await getData({ email, accessToken })
        if (res.status) {
            console.log(res.json)
            setData(res.json.message)
        } else {
            console.log(res.json)
            setErrMsg('Access Token 만료')
            setData('')
        }
        setDataLoading(false)
    }

    const onClickRefreshToken = async () => {
        setRefreshLoading(true)
        const refresh_token = getCookieToken()
        const res = await tokenRefresh({ refresh_token })
        if (res.status) {
            setErrMsg('')
            removeCookieToken()
            setRefreshToken(res.json.data.refresh_token);
            dispatch(SET_TOKEN(res.json.data.access_token));
        } else {
            console.log(res.json)
        }
        setRefreshLoading(false)
    }

    const onClickLogout = async () => {
        setLogoutLoading(true)
        const res = await logoutUser({ accessToken })
        if (res.status) {
            dispatch(DELETE_TOKEN())
            removeCookieToken()
            return navigate('/')
        } else {
            setErrMsg('Access Token 만료')
            setData('')
            setLogoutLoading(false)
        }
    }

    return (
        <>
            <PageBox sx={{
                display: 'flex', width: '100%',
                height: '100%',
                justifyContent: 'center', alignItems: 'center'
            }}>
                <Grid container direction='column'
                    sx={{ pt: 10, justifyContent: 'center', alignItems: 'center', }}>
                    <Grid item sx={{ width: 500, pt: 2 }}>
                        <Typography variant='subtitle1'
                            sx={{ fontWeight: 'fontWeightBold', color: 'black' }}>
                            Home View
                        </Typography>
                    </Grid>
                    <Grid item sx={{ width: 500, pt: 2 }}>
                        <RoundedButton onClick={onClickGetData} sx={{
                            backgroundColor: Colors.mainColor, width: '50%'
                        }}>
                            {isDataLoading ?
                                <CircularProgress />
                                :
                                <Typography variant='subtitle1'
                                    sx={{ fontWeight: 'fontWeightBold', color: 'white' }}>
                                    데이터 조회
                                </Typography>}
                        </RoundedButton>
                    </Grid>
                    <Grid item sx={{ width: 500, pt: 2 }}>
                        <Typography variant='subtitle2'
                            sx={{ fontWeight: 'fontWeightNormal', color: 'black' }}>
                            {data}
                        </Typography>
                    </Grid>
                    <Grid item sx={{ width: 500, pt: 2 }}>
                        <Typography variant='subtitle2'
                            sx={{ fontWeight: 'fontWeightNormal', color: 'red' }}>
                            {errMsg}
                        </Typography>
                    </Grid>
                    <Grid item sx={{ width: 500, pt: 2 }}>
                        <RoundedButton onClick={onClickRefreshToken} sx={{
                            backgroundColor: Colors.mainColor, width: '50%'
                        }}>
                            {isRefreshLoading ?
                                <CircularProgress />
                                :
                                <Typography variant='subtitle1'
                                    sx={{ fontWeight: 'fontWeightBold', color: 'white' }}>
                                    토큰 Refresh
                                </Typography>}
                        </RoundedButton>
                    </Grid>
                    <Grid item sx={{ width: 500, pt: 2 }}>
                        <RoundedButton onClick={onClickLogout} sx={{
                            backgroundColor: Colors.mainColor, width: '50%'
                        }}>
                            {isLogoutLoading ?
                                <CircularProgress />
                                :
                                <Typography variant='subtitle1'
                                    sx={{ fontWeight: 'fontWeightBold', color: 'white' }}>
                                    로그아웃
                                </Typography>}
                        </RoundedButton>
                    </Grid>
                </Grid>
            </PageBox>
        </>
    );
}

export default Home