import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import Aos from 'aos';
import { useEffect, useState } from 'react';
import '../style.scss'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { deleteCompany } from '../../app/slice/companySlice';
import { CircularProgress } from '@mui/material';
export default function DeleteCompany() {
    const params = useParams()
    const [company, setCompany] = useState({})
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Aos.init({})
        setLoading(true)
        axios({
            method: "GET",
            url: `http://localhost:8080/api/company/${params.id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
        })
            .then(res => {
                setCompany(res.data.data)
            })
            .then(() => {
                setLoading(false)
            })
    }, [])
    const delCompany = () => {
        setIsLoadingBtn(true)
        axios({
            method: "DELETE",
            url: `http://localhost:8080/api/company/${params.id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },

        })
            .then(res => {
                toast.success(`Xóa công ty thành công`, {
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
                setIsLoadingBtn(false)
            })
            .catch(err => {
                toast.error(`Xóa công ty thất bại`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                setIsLoadingBtn(false)
            })
    }
    return (
        <div className="overlays1">
            <ToastContainer />
            <div className="form delete-category" data-aos="fade-up">
                {loading ?
                    <div className="loading-page">
                        <CircularProgress sx={{ color: "#73b6f8" }} />
                    </div> : <>
                        <div className="title">
                            <h2>Delete Company</h2>
                            <div className="logo"><i className="far fa-trash-alt"></i></div>
                        </div>
                        <div className="cate-name">Tên công ty: <strong>{company.company_name}</strong></div>
                        <div className="group-button">
                            <Stack direction="row" spacing={2}>
                                <Button disabled={isLoadingBtn} variant="contained" color="error" startIcon={<DeleteOutlineIcon />} onClick={delCompany}>
                                    Xóa
                                </Button>
                                <Button variant="outlined" onClick={() => history.push('/admin/company')} endIcon={<ArrowBackIcon />}>
                                    Thoát
                                </Button>
                            </Stack>
                        </div></>}
            </div>
        </div>
    )
}