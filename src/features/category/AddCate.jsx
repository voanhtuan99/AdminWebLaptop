import '../style.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../app/slice/categorySlice';
import { useHistory } from 'react-router';
export default function AddCate() {
    const [cate, setCate] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
    useEffect(() => {
        Aos.init({
        })
    }, [])
    const addCate = () => {

        if (cate === '') {
            document.querySelector('.errorcate p').innerHTML = 'Tên loại không được để trống'
        }
        else {
            setIsLoadingBtn(true)
            axios({
                method: "POST",
                url: "http://localhost:8080/api/category/add",
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                data: {
                    category_name: cate
                }
            })
                .then((res) => {
                    toast.success(`Thêm loại ${res.data.data.category_name} thành công`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    const action = addCategory(res.data.data)
                    dispatch(action)
                    setIsLoadingBtn(false)
                })
                .catch(() => {
                    toast.success(`Loại đã tồn tại`, {
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
                <h1 className="title add-cate">Thêm loại</h1>
                <div className="content">
                    <div className="cate-name">
                        <p>Tên loại</p>
                        <TextField
                            label="Tên sản phẩm"
                            id="outlined-size-small"
                            // defaultValue="Small"
                            size="small"
                            fullWidth={true}
                            value={cate}
                            onChange={(event) => {
                                if (cate !== '') {
                                    document.querySelector('.errorcate p').innerHTML = ''
                                }
                                setCate(event.target.value)

                            }}
                        />
                    </div>

                </div>
                <div className="error1 errorcate"><p></p></div>
                <div className="group-button">
                    <Stack direction="row" spacing={2}>
                        <Button disabled={isLoadingBtn} variant="contained" startIcon={<AddIcon />} onClick={addCate}>
                            Thêm
                        </Button>
                        <Button variant="outlined" onClick={() => history.push('/admin/category')} endIcon={<ArrowBackIcon />}>
                            Thoát
                        </Button>
                    </Stack>
                </div>
            </div>
        </div>
    )
}