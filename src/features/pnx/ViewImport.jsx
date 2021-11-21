
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useHistory, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import Aos from 'aos';
import DetailView from './DetailView';

export default function ViewImport() {
    const history = useHistory()
    const params = useParams()
    const id = params.id
    const [importResponse, setImportResponse] = useState({})
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Aos.init({
        })
        setLoading(true)
        axios({
            method: 'GET',
            url: `http://localhost:8080/api/pnhapxuat/${id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        }).then(res => {
            setImportResponse(res.data.data)
        }).then(() => {
            setLoading(false)
        })
    }, [])
    console.log(importResponse.ctpNhapResponseDTOS)
    return (
        <div className="overlays1">
            <div className="form order accept-order" data-aos-duration="800" data-aos="zoom-up">
                {loading ?
                    <div className="loading-page">
                        <CircularProgress sx={{ color: "#73b6f8" }} />
                    </div> :
                    <><h1 className="big-label">Thông tin phiếu</h1>
                        <div className="label-info"><strong>Tên công ty:</strong>{importResponse ? importResponse.company_name : ''}</div>
                        <div className="label-info"><strong>Ngày tạo:</strong>{importResponse ? importResponse.createDate : ''}</div>
                        <div className="label-info"><strong>Trạng thái:</strong>{importResponse ? importResponse.statusName : ''}</div>
                        <div className="label-info"><strong>Người tạo:</strong>{importResponse ? importResponse.email : ''}</div>
                        <div className="list-detail phieunx" data-aos-duration="500" data-aos="zoom-up">
                            <div className="name-column-detail-order">
                                <span className='image'>
                                    Image
                                </span>
                                <span className='name'>
                                    Tên sản phẩm
                                </span>
                                <span className='qty'>
                                    SL
                                </span>
                                <span className='price'>
                                    Giá
                                </span>
                            </div>
                            {importResponse.ctpNhapResponseDTOS ? importResponse.ctpNhapResponseDTOS.map((item, index) => {
                                return <DetailView detail={item} key={index} />
                            }) : <div className="empty">
                                Chưa có sản phẩm
                            </div>}
                        </div>
                        <div className="order-group-btn">

                            <Button variant="outlined" endIcon={<ArrowBackIcon />} onClick={() => history.push('/admin/nhapxuat')}>
                                Thoát
                            </Button>
                        </div></>}
            </div>
        </div>
    )
}