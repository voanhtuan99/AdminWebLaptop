import { Link, useHistory } from 'react-router-dom'
import './style.scss'
import '../overlays.scss'
import Slider from '../Slider/Slider';
import { useState } from 'react';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useDispatch } from 'react-redux';
import { updateAccount } from '../../../app/slice/accountSlice';
export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const handleChangeEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleChangePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleLogin = () => {
        setLoading(true)
        axios({
            method: "POST",
            url: "http://localhost:8080/api/auth/signin",
            data: {
                username: email,
                password: password
            }
        })
            .then((response) => {
                localStorage.setItem("accessToken", response.data.accessToken)
                localStorage.setItem("idUser", response.data.id)
                setTimeout(() => {
                    setLoading(false)
                    axios({
                        method: "GET",
                        url: `http://localhost:8080/api/user/find/${response.data.id}`,
                        headers: {
                            'Authorization': 'Bearer ' + response.data.accessToken
                        }
                    }).then((response) => {
                        const action = updateAccount(response.data)
                        dispatch(action)
                    })
                    if (response.data.roles[0] === "ADMIN") {
                        history.push("/admin")
                    }
                }, 800)

            })
            .catch((err) => {
                setTimeout(() => setLoading(false), 800)
            })
    }
    return (
        <>
            <div className={loading ? 'overlays active' : 'overlays'}>
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
            </div>
            <div className="loginPage">
                <img className="background" src="https://hoanghapc.vn/media/news/2010_goc-gaming-dep79.jpg" />
                <div className="loginForm">
                    <div className="loginForm__banner">
                        <Slider />
                    </div>
                    <div className="loginForm__fields">
                        <h2 className="loginForm__title">
                            Login
                        </h2>
                        <div className="loginForm__input">
                            <p>Gmail</p>
                            <input type="text" placeholder="Mời nhập gmail" onChange={handleChangeEmail} value={email} />
                        </div>
                        <div className="error"></div>
                        <div className="loginForm__input">
                            <p>Mật khẩu</p>
                            <input type="password" placeholder="Mời nhập mật khẩu" onChange={handleChangePassword} value={password} />
                        </div>
                        <div className="error"></div>
                        <Link to="/quenmk">Quên mật khẩu</Link>
                        <button className="btn nutdangnhap" onClick={handleLogin}>Login</button>
                        {/* <button className="btn facebook">Login with Facebook</button>
                        <button className="btn google">Login with Google</button> */}
                    </div>
                </div>
            </div></>
    )
}