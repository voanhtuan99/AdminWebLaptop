import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

import './info.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { pink } from '@mui/material/colors';
import axios from "axios";
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastContainer } from "react-toastify";
export default function InfoAdmin() {
    const [account, setAccount] = useState({})
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [sdt, setSdt] = useState('')
    const [address, setAddress] = useState('')
    const [role, setRole] = useState('')
    const [activestatus, setActiveStatus] = useState('')
    const [loading, setLoading] = useState(false)
    const [isLoadingEdit, setIsLoadingEdit] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios({
            method: "GET",
            url: `http://localhost:8080/api/user/find/${localStorage.getItem('idUser')}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        }).
            then(res => {
                setEmail(res.data.email)
                setPassword(res.data.password)
                setName(res.data.name)
                setSdt(res.data.phone_number)
                setAddress(res.data.address)
                setRole(res.data.role)
                setActiveStatus(res.data.activestatus)
            })
            .then(res => {
                setLoading(false)

            })
            .catch(() => {
                setLoading(false)

            })
    }, [])
    const changeInfo = () => {
        setIsLoadingEdit(true)
        axios({
            method: "PUT",
            url: `http://localhost:8080/api/user/${localStorage.getItem('idUser')}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
            data: {
                name: name,
                password: password,
                email,
                phone_number: sdt,
                address,
                role: role,
                activestatus
            }
        })
            .then(() => {
                toast.success('Sửa thông tin thành công', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsLoadingEdit(false)
            })
    }
    return (
        <div className="adminpage">
            <ToastContainer />
            {isLoadingEdit === true ? <div className="overlays3"><CircularProgress sx={{ color: "blue" }} /></div> : <></>}
            <div className="info">
                <div className="info__tittle">
                    <h1>Thông tin cá nhân</h1>
                    <Avatar
                        sx={{ width: 60, height: 60, bgcolor: pink[500] }}
                    >
                        <AccountCircleIcon fontSize="large" />
                    </Avatar>
                </div>
                {loading ?
                    <div className="loading-page">
                        <CircularProgress sx={{ color: "#73b6f8" }} />
                    </div> :
                    <><div className="info__content">
                        <div className="content tenuser">
                            <p>Tên user</p>
                            <input type="text" placeholder="tên user" value={name} onChange={e => setName(e.target.value)} />
                        </div>
                        <div className="content gmail">
                            <p>Gmail</p>
                            <input type="text" placeholder="gmail" value={email} onChange={e => setEmail(e.target.value)} />
                        </div>
                        <div className="content matkhau">
                            <p>Password</p>
                            <input type="password" placeholder="password" disabled value={password} />
                        </div>
                        <div className="content gt">
                            <p>Số điện thoại</p>
                            <input type="text" placeholder="Số điện thoại" value={sdt} onChange={e => setSdt(e.target.value)} />
                        </div>
                        <div className="content diachi">
                            <p>Địa chỉ</p>
                            <input type="text" placeholder="Địa chỉ" value={address} onChange={e => setAddress(e.target.value)} />
                        </div>
                    </div>
                        <div className="info__button">
                            <button onClick={changeInfo}>Change Info</button>
                        </div></>}
            </div>
        </div>
    )
}