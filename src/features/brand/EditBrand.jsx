import SaveIcon from '@mui/icons-material/Save';
import './style.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import { useParams, useHistory } from "react-router-dom";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { editBrand } from '../../app/slice/brandSlice';
import { CircularProgress } from '@mui/material';
export default function EditBrand() {
    const params = useParams()
    const [brand, setBrand] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Aos.init({})
        setLoading(true)
        axios({
            method: "GET",
            url: `http://localhost:8080/api/brand/${params.id}`,
        })
            .then(res => {
                setBrand(res.data.data)
            })
            .then(() => {
                setLoading(false)
            })
    }, [])
    const handleChange = (e) => {
        if (brand !== '') {
            document.querySelector('.errorbrand p').innerHTML = ''
        }
        setBrand(e.target.value)
    }
    const editCate = () => {
        if (brand === '') {
            document.querySelector('.errorbrand p').innerHTML = 'Tên hãng không được để trống'
        }
        else {
            setIsLoadingBtn(true)
            axios({
                method: "PUT",
                url: `http://localhost:8080/api/brand/${params.id}`,
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                data: {
                    brand_name: brand
                }
            }).then((res) => {
                toast.success(`Cập nhật hãng thành công`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                const action = editBrand(res.data.data)
                dispatch(action)
                setIsLoadingBtn(false)
            })
                .catch(() => {
                    toast.error(`Cập nhật thất bại`, {
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
    }
    return (
        <div className="overlays1">
            <ToastContainer />
            <div className="form add-cate" data-aos="zoom-up" data-aos-duration="800">
                {loading ?
                    <div className="loading-page">
                        <CircularProgress sx={{ color: "#73b6f8" }} />
                    </div> :
                    <>
                        <h1 className="title add-cate">Sửa loại</h1>
                        <div className="content">
                            <div className="cate-name">
                                <p>Tên loại</p>
                                <TextField
                                    label="Tên sản phẩm"
                                    id="outlined-size-small"
                                    size="small"
                                    fullWidth={true}
                                    value={brand.brand_name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="error1 errorbrand"><p></p></div>
                        <div className="group-button">
                            <Stack direction="row" spacing={2}>
                                <Button disabled={isLoadingBtn} variant="contained" startIcon={<SaveIcon />} onClick={editCate} >
                                    Update
                                </Button>
                                <Button variant="outlined" onClick={() => history.push('/admin/brand')} endIcon={<ArrowBackIcon />}>
                                    Thoát
                                </Button>
                            </Stack>
                        </div></>}
            </div>
        </div>
    )
}