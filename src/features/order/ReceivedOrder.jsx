import Aos from 'aos'
import { useEffect, useState } from 'react'
import '../style.scss'
import Button from '@mui/material/Button';
import DoneIcon from '@mui/icons-material/Done';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';
import { orange, purple } from '@mui/material/colors';
import { styled } from '@mui/system';
export default function ReceivedOrder() {
    const params = useParams()
    const history = useHistory()
    const [order, setOrder] = useState({});
    useEffect(() => {
        Aos.init({
        })
        axios({
            method: "GET",
            url: `http://localhost:8080/api/orders/${params.id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
        })
            .then(res => {
                setOrder(res.data.data)
            })
    }, [])
    const handleCancel = () => {
        axios({
            method: "PUT",
            url: `http://localhost:8080/api/orders/received/${params.id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
        })
            .then(res => {
                toast.success(`Đã hủy đơn hàng`, {
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
            <div className="form order cancel-order" data-aos-duration="800" data-aos="zoom-up">
                <h1 className="big-label">Đã nhận hàng</h1>
                <div className="info-order" data-aos-duration="500" data-aos="zoom-up">
                    <div className="content-order">
                        <strong>Số điện thoại: </strong>
                        {order.phone_number}
                    </div>
                    <div className="content-order">
                        <strong>Địa chỉ:</strong>
                        {order.address}
                    </div>
                    <div className="content-order">
                        <strong>Tổng tiền: </strong>
                        {order.total_price}
                    </div>
                    <div className="content-order">
                        <strong>Ngày đặt: </strong>
                        {order.ngaydat}
                    </div>
                </div>
                <div className="order-group-btn">
                    <ColorButton variant="contained" color="success" startIcon={<DoneIcon />} sx={{ marginRight: 2 }} onClick={handleCancel}>
                        Đã nhận
                    </ColorButton>
                    <Button variant="outlined" endIcon={<ArrowBackIcon />} onClick={() => history.push('/admin/order')}>
                        Thoát
                    </Button>
                </div>
            </div>
        </div >
    )
}

const ColorButton = styled(Button)(({ theme }) => ({
    backgroundColor: orange[500],
    '&:hover': {
        backgroundColor: orange[700],
    },
}));