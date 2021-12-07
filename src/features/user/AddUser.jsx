import { Stack, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from "react-router";
import { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { getAllUser } from "../../app/slice/userSlice";
import { useDispatch } from "react-redux";
export default function AddUser() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [sdt, setSdt] = useState('')
    const [address, setAddress] = useState('')
    const dispatch = useDispatch()
    const createUser = () => {
        if (email === '') {
            document.querySelector('.erroremail p').innerHTML = 'Email không được để trống'
        }
        if (password === '') {
            document.querySelector('.errorpass p').innerHTML = 'Password không được để trống'
        }
        if (name === '') {
            document.querySelector('.errorname p').innerHTML = 'Tên không được để trống'
        }
        if (sdt === '') {
            document.querySelector('.errorsdt p').innerHTML = 'Số điện thoại không được để trống'
        }
        if (address === '') {
            document.querySelector('.erroraddress p').innerHTML = 'Địa chỉ không được để trống'
        }
        if (email !== '' && password !== '' && name !== '' && sdt !== '' && address !== '') {
            axios({
                method: "POST",
                url: `http://localhost:8080/api/auth/signup`,
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                data: {
                    email,
                    password,
                    username: name,
                    phone: sdt,
                    address,
                    role: 'admin'
                }
            }).then(() => {
                toast.success(`Thêm tài khoản ${email} thành công`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            }).then(() => {
                axios({
                    method: "GET",
                    url: `http://localhost:8080/api/user/`,
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
                })
                    .then(res => {
                        const action = getAllUser(res.data)
                        dispatch(action)
                    })
            })
        }
    }
    return (
        <div className="overlays1">
            <ToastContainer />
            <div className="form add-company" data-aos="zoom-up" data-aos-duration="800">
                <h1 className="title add-cate">Tạo tài khoản</h1>
                <div className="content">
                    <div className="cate-name">
                        <p>Email</p>
                        <TextField
                            label="Email"
                            id="outlined-size-small"
                            // defaultValue="Small"
                            size="small"
                            fullWidth={true}
                            type="email"
                            value={email}
                            onChange={(e) => {
                                if (email !== '') {
                                    document.querySelector('.erroremail p').innerHTML = ''
                                }
                                setEmail(e.target.value)
                            }}
                        />
                    </div>
                    <div className="error1 erroremail" style={{ marginLeft: 200 }}><p></p></div>
                    <div className="cate-name">
                        <p>Mật khẩu</p>
                        <TextField
                            label="Mật khẩu"
                            id="outlined-size-small"
                            // defaultValue="Small"
                            size="small"
                            fullWidth={true}
                            type="password"
                            value={password}
                            onChange={(e) => {
                                if (password !== '') {
                                    document.querySelector('.errorpass p').innerHTML = ''
                                }
                                setPassword(e.target.value)
                            }}
                        />
                    </div>
                    <div className="error1 errorpass" style={{ marginLeft: 200 }}><p></p></div>
                    <div className="cate-name">
                        <p>Tên</p>
                        <TextField
                            label="Tên"
                            type="text"
                            id="outlined-size-small"
                            // defaultValue="Small"
                            size="small"
                            fullWidth={true}
                            value={name}
                            onChange={(e) => {
                                if (name !== '') {
                                    document.querySelector('.errorname p').innerHTML = ''
                                }
                                setName(e.target.value)
                            }}
                        />
                    </div>
                    <div className="error1 errorname" style={{ marginLeft: 200 }}><p></p></div>
                    <div className="cate-name">
                        <p>SĐT</p>
                        <TextField
                            label="Số điện thoại"
                            id="outlined-size-small"
                            type="number"
                            // defaultValue="Small"
                            size="small"
                            fullWidth={true}
                            value={sdt}
                            onChange={(e) => {
                                if (sdt !== '') {
                                    document.querySelector('.errorsdt p').innerHTML = ''
                                }
                                setSdt(e.target.value)
                            }}
                        />
                    </div>
                    <div className="error1 errorsdt" style={{ marginLeft: 200 }}><p></p></div>
                    <div className="cate-name">
                        <p>Địa chỉ</p>
                        <TextField
                            label="Địa chỉ"
                            id="outlined-size-small"
                            // defaultValue="Small"
                            size="small"
                            fullWidth={true}
                            type="text"
                            value={address}
                            onChange={(e) => {
                                if (address !== '') {
                                    document.querySelector('.erroraddress p').innerHTML = ''
                                }
                                setAddress(e.target.value)
                            }}
                        />
                    </div>
                    <div className="error1 erroraddress" style={{ marginLeft: 200 }}><p></p></div>
                    <div className="group-button">
                        <Stack direction="row" spacing={2}>
                            <Button variant="contained" startIcon={<AddIcon />} onClick={createUser}>
                                Thêm
                            </Button>
                            <Button variant="outlined" onClick={() => history.push('/admin/users')} endIcon={<ArrowBackIcon />}>
                                Thoát
                            </Button>
                        </Stack>
                    </div>

                </div>
            </div>
        </div>
    )
}