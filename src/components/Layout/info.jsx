import { Avatar } from "@mui/material";
import { useEffect, useState } from "react";

import './info.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { pink } from '@mui/material/colors';
import axios from "axios";
export default function InfoAdmin() {
    const [account, setAccount] = useState({})
    useEffect(() => {
        axios({
            method: "GET",
            url: `http://localhost:8080/api/user/find/${localStorage.getItem('idUser')}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        }).
            then(res => {
                setAccount(res.data)
            })
    }, [])
    return (
        <div className="adminpage">
            <div className="info">
                <div className="info__tittle">
                    <h1>Thông tin cá nhân</h1>
                    <Avatar
                        sx={{ width: 60, height: 60, bgcolor: pink[500] }}
                    >
                        <AccountCircleIcon fontSize="large" />
                    </Avatar>
                </div>
                <div className="info__content">
                    <div className="content tenuser">
                        <p>Tên user</p>
                        <input type="text" placeholder="tên user" value={account.name} />
                    </div>
                    <div className="content gmail">
                        <p>Gmail</p>
                        <input type="text" placeholder="gmail" value={account.email} />
                    </div>
                    <div className="content matkhau">
                        <p>Password</p>
                        <input type="password" placeholder="password" disabled value={account.password} />
                    </div>
                    <div className="content gt">
                        <p>Số điện thoại</p>
                        <input type="text" placeholder="Số điện thoại" value={account.phone_number} />
                    </div>
                    <div className="content diachi">
                        <p>Địa chỉ</p>
                        <input type="text" placeholder="Địa chỉ" value={account.address} />
                    </div>
                </div>
                <div className="info__button">
                    <button>Change Info</button>
                </div>
            </div>
        </div>
    )
}