import SaveIcon from '@mui/icons-material/Save';
import '../style.scss'
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
import { editCategory } from '../../app/slice/categorySlice';
import { CircularProgress } from '@mui/material';
export default function EditCate() {
    const params = useParams()
    const [cate, setCate] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Aos.init({})
        setLoading(true)
        axios({
            method: "GET",
            url: `http://localhost:8080/api/category/${params.id}`,
        })
            .then(res => {
                setCate(res.data.data)
            })
            .then(() => {
                setLoading(false)
            })
    }, [])
    const handleChange = (e) => {
        if (cate !== '') {
            document.querySelector('.errorcate p').innerHTML = ''
        }
        setCate(e.target.value)
    }
    const editCate = () => {
        if (cate === '') {
            document.querySelector('.errorcate p').innerHTML = 'Tên loại không được để trống'
        }
        else {
            setIsLoadingBtn(true)
            axios({
                method: "PUT",
                url: `http://localhost:8080/api/category/${params.id}`,
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                data: {
                    category_name: cate
                }
            }).then((res) => {
                toast.success(`Cập nhật loại thành công`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                const action = editCategory(res.data.data)
                dispatch(action)
                setIsLoadingBtn(false)
            })
                .catch(() => {
                    toast.error(`Sửa thất bại`, {
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
                    </div> : <>
                        <h1 className="title add-cate">Sửa loại</h1>
                        <div className="content">
                            <div className="cate-name">
                                <p>Tên loại</p>
                                <TextField
                                    label="Tên sản phẩm"
                                    id="outlined-size-small"
                                    size="small"
                                    fullWidth={true}
                                    value={cate.category_name}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                        <div className="error1 errorcate"><p></p></div>
                        <div className="group-button">
                            <Stack direction="row" spacing={2}>
                                <Button disabled={isLoadingBtn} variant="contained" startIcon={<SaveIcon />} onClick={editCate} >
                                    Update
                                </Button>
                                <Button variant="outlined" onClick={() => history.push('/admin/category')} endIcon={<ArrowBackIcon />}>
                                    Thoát
                                </Button>
                            </Stack>
                        </div></>}
            </div>
        </div>
    )
}