import { Stack, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory, useParams } from "react-router";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { getAllUser } from "../../app/slice/userSlice";
import { useDispatch } from "react-redux";
import CircularProgress from '@mui/material/CircularProgress';
export default function EditUser() {
    const history = useHistory()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [name, setName] = useState('')
    const [sdt, setSdt] = useState('')
    const [address, setAddress] = useState('')
    const [role, setRole] = useState('')
    const [activestatus, setActiveStatus] = useState('')
    const dispatch = useDispatch()
    const params = useParams()
    const id = params.id
    const [loading, setLoading] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    useEffect(() => {
        setLoading(true)
        axios({
            method: "GET",
            url: `http://localhost:8080/api/user/find/${id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then(res => {
                setEmail(res.data.email)
                setPassword(res.data.password)
                setName(res.data.name)
                setSdt(res.data.phone_number)
                setAddress(res.data.address)
                setRole(res.data.role)
                setActiveStatus(res.data.activestatus)
            })
            .then(() => {
                setLoading(false)
            })
    }, [])
    const editUser = () => {
        setDisableBtn(true)
        axios({
            method: "PUT",
            url: `http://localhost:8080/api/user/${id}`,
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
                axios({
                    method: "GET",
                    url: `http://localhost:8080/api/user/`,
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
                })
                    .then(res => {
                        const action = getAllUser(res.data)
                        dispatch(action)
                    })
            }).then(() => {
                setDisableBtn(false)
                toast.success('Sửa thông tin thành công', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            })
    }
    return (
        <div className="overlays1">
            <ToastContainer />
            <div className="form add-company" data-aos="zoom-up" data-aos-duration="800">
                <h1 className="title add-cate">Sửa thông tin</h1>
                {loading ?
                    <div className="loading-page">
                        <CircularProgress sx={{ color: "#73b6f8" }} />
                    </div> : <>
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
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
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
                                    disabled
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
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
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
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
                                    onChange={(e) => setSdt(e.target.value)}
                                />
                            </div>
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
                                    onChange={(e) => setAddress(e.target.value)}
                                />
                            </div>
                            <div className="group-button">
                                <Stack direction="row" spacing={2}>
                                    <Button variant="contained" startIcon={<SaveIcon />} onClick={editUser} disabled={disableBtn}>
                                        Cập nhật
                                    </Button>
                                    <Button variant="outlined" onClick={() => history.push('/admin/users')} endIcon={<ArrowBackIcon />}>
                                        Thoát
                                    </Button>
                                </Stack>
                            </div>

                        </div></>}
            </div>
        </div>
    )
}