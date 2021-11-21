import '../style.scss'
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';
import DetailOrderItem from './DetailOrderItem';
import { CircularProgress } from '@mui/material';

export default function InfoOrder() {
    const [order, setOrder] = useState({});
    const [detaiOrder, setDetailOrder] = useState([])
    const params = useParams()
    const id = params.id
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        setLoading(true)
        Aos.init({
        })
        axios({
            method: "GET",
            url: `http://localhost:8080/api/orders/${id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
        })
            .then(res => {
                setOrder(res.data.data)
                axios({
                    method: "GET",
                    url: `http://localhost:8080/api/detailorder/order/${id}`,
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                })
                    .then((res) => {
                        console.log(res.data.data)
                        setDetailOrder(res.data.data)
                    })
                    .then(() => {
                        setLoading(false)
                    })
            })

    }, [])

    return (
        <div className="overlays1">
            <div className="form order info-order" data-aos-duration="800" data-aos="zoom-up">
                <h1 className="big-label">Thông tin đơn hàng</h1>
                {loading ?
                    <div className="loading-page">
                        <CircularProgress sx={{ color: "#73b6f8" }} />
                    </div> : <>
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
                        <span className="tencty"></span>
                        <div className="list-detail order" data-aos-duration="500" data-aos="zoom-up">
                            <div className="name-column-detail-order">
                                <span className='image'>
                                    Image
                                </span>
                                <span className='name'>
                                    Tên sản phẩm
                                </span>
                                <span className='qty'>
                                    Số lượng
                                </span>
                                <span className='price'>
                                    Giá
                                </span>
                            </div>
                            {detaiOrder.map((item, index) => {
                                return <DetailOrderItem detail={item} key={index} />
                            })}

                        </div>
                        <div className="order-group-btn">
                            <Button variant="outlined" endIcon={<ArrowBackIcon />} onClick={() => history.push('/admin/order')}>
                                Thoát
                            </Button>
                        </div>
                    </>}
            </div>
        </div>
    )
}