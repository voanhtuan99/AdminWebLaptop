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
export default function EditBrand() {
    const params = useParams()
    const [brand, setBrand] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
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
    const handleChange = (e) => {
        setBrand(e.target.value)
    }
    const editCate = () => {
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
            })
    }
    return (
        <div className="overlays1">
            <ToastContainer />
            <div className="form add-cate" data-aos="zoom-up" data-aos-duration="800">
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
                <div className="group-button">
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<SaveIcon />} onClick={editCate} >
                            Update
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