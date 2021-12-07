import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import Aos from 'aos';
import { useEffect, useState } from 'react';
import '../style.scss'
import LockIcon from '@mui/icons-material/Lock';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { deleteCompany } from '../../app/slice/companySlice';
import { getAllUser } from '../../app/slice/userSlice';
import { CircularProgress } from '@mui/material';
export default function BlockUser() {
    const params = useParams()
    const [user, setUser] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()
    const id = params.id
    const [loading, setLoading] = useState(false)
    const [disableBtn, setDisableBtn] = useState(false)
    useEffect(() => {
        setLoading(true)
        Aos.init({})
        axios({
            method: "GET",
            url: `http://localhost:8080/api/user/find/${id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
        })
            .then(res => {
                setUser(res.data)
            })
            .then(() => {
                setLoading(false)
            })
    }, [])
    const blockUser = () => {
        setDisableBtn(true)
        axios({
            method: "DELETE",
            url: `http://localhost:8080/api/user/${id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
        })
            .then(() => {
                toast.success(`Khóa tài khoản thành công`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                const action = deleteCompany(params.id)
                dispatch(action)
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
            .catch(err => {
                toast.error(`Khóa tài khoản thất bại`, {
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
            <div className="form delete-category" data-aos="fade-up">
                <div className="title">
                    <h2>Khóa tài khoản</h2>
                    <div className="logo"><i className="far fa-trash-alt"></i></div>
                </div>
                {loading ?
                    <div className="loading-page">
                        <CircularProgress sx={{ color: "#73b6f8" }} />
                    </div> : <>
                        <div className="cate-name">Email: <strong>{user.email}</strong></div>
                        <div className="group-button">
                            <Stack direction="row" spacing={2}>
                                <Button variant="contained" color="error" startIcon={<LockIcon />} onClick={blockUser} disabled={disableBtn}>
                                    Khóa
                                </Button>
                                <Button variant="outlined" onClick={() => history.push('/admin/users')} endIcon={<ArrowBackIcon />}>
                                    Thoát
                                </Button>
                            </Stack>
                        </div>
                    </>}
            </div>
        </div>
    )
}