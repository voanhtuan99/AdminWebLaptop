import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import Aos from 'aos';
import { useEffect, useState } from 'react';
import './style.scss'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { deleteBrand } from '../../app/slice/brandSlice';
export default function DeleteBrand() {
    const params = useParams()
    const [brand, setBrand] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
    useEffect(() => {
        Aos.init({})
        axios({
            method: "GET",
            url: `http://localhost:8080/api/brand/${params.id}`,
        })
            .then(res => {
                setBrand(res.data.data)
            })
    }, [])
    const delBrand = () => {
        setIsLoadingBtn(true)
        axios({
            method: "DELETE",
            url: `http://localhost:8080/api/brand/brand/${params.id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
        })
            .then(res => {
                toast.success(`Xóa hãng thành công`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                const action = deleteBrand(params.id)
                dispatch(action)
                setIsLoadingBtn(false)
            })
            .catch(err => {
                toast.error(`Xóa hãng thất bại`, {
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
                <div className="title">
                    <h2>Delete Category</h2>
                    <div className="logo"><i className="far fa-trash-alt"></i></div>
                </div>
                <div className="cate-name">Tên loại: <strong>{brand.brand_name}</strong></div>
                <div className="group-button">
                    <Stack direction="row" spacing={2}>
                        <Button disabled={isLoadingBtn} variant="contained" color="error" startIcon={<DeleteOutlineIcon />} onClick={delBrand}>
                            Xóa
                        </Button>
                        <Button variant="outlined" onClick={() => history.push('/admin/brand')} endIcon={<ArrowBackIcon />}>
                            Thoát
                        </Button>
                    </Stack>
                </div>
            </div>
        </div>
    )
}