import { Stack, TextField } from "@mui/material";
import Button from '@mui/material/Button';
import { toast, ToastContainer } from "react-toastify";
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useState } from "react";
import axios from "axios";
import { addBrand } from "../../app/slice/brandSlice";
export default function AddBrand() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [brand, setBrand] = useState('')
    const createBrand = () => {
        axios({
            method: "POST",
            url: "http://localhost:8080/api/brand/add",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
            data: {
                brand_name: brand
            }
        })
            .then((res) => {
                toast.success(`Thêm loại ${res.data.data.brand_name} thành công`, {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                const action = addBrand(res.data.data)
                dispatch(action)
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
            })
    }
    return (
        <div className="overlays1">
            <ToastContainer />
            <div className="form add-cate" data-aos="zoom-up" data-aos-duration="800">
                <h1 className="title add-cate">CREATE BRAND</h1>
                <div className="content">
                    <div className="cate-name">
                        <p>Brand name</p>
                        <TextField
                            label="Tên sản phẩm"
                            id="outlined-size-small"
                            // defaultValue="Small"
                            size="small"
                            fullWidth={true}
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>
                </div>
                <div className="group-button">
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" startIcon={<AddIcon />} onClick={createBrand}>
                            Create
                        </Button>
                        <Button variant="outlined" onClick={() => history.push('/admin/brand')} endIcon={<ArrowBackIcon />}>
                            Cancel
                        </Button>
                    </Stack>
                </div>
            </div>
        </div>
    )
}