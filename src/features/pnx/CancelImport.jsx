import { useHistory, useParams } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress } from '@mui/material';
import Aos from 'aos';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import Button from '@mui/material/Button';
import { useDispatch } from "react-redux";
import { cancelPNX, getAllPNX } from "../../app/slice/phieunhapxuatSlice";
export default function CancelImport() {
    const params = useParams()
    const history = useHistory()
    const id = params.id
    const [importResponse, setImportResponse] = useState({})
    const [loading, setLoading] = useState(false)
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
    const dispatch = useDispatch()
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
    const cancelImport = () => {
        setIsLoadingBtn(true)
        axios({
            method: 'PUT',
            url: `http://localhost:8080/api/pnhapxuat/cancel/${id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        })

            .then((res) => {
                if (res.data.data === null) {
                    setIsLoadingBtn(false)
                    toast.error('Số lượng hàng trong kho không đủ', {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,

                    });
                }
                else {
                    axios({
                        method: "GET",
                        url: "http://localhost:8080/api/pnhapxuat",
                        headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
                    }).then(res => {
                        const action = getAllPNX(res.data.data)
                        dispatch(action)
                    }).then(() => {
                        setIsLoadingBtn(false)
                        toast.success('Xóa phiếu thành công', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            style: {
                                background: "#fff",
                                color: "#00ff14"
                            }
                        });
                    })

                }
            })
    }
    return (
        <div className="overlays1">
            <ToastContainer />
            <div className="form order cancel-import" data-aos-duration="800" data-aos="zoom-up">
                {loading ?
                    <div className="loading-page">
                        <CircularProgress sx={{ color: "#73b6f8" }} />
                    </div> :
                    <>
                        <h1 className="big-label">Hủy đơn hàng</h1>
                        <div className="label-info-import"><strong>Tên công ty:</strong>{importResponse ? importResponse.company_name : ''}</div>
                        <div className="label-info-import"><strong>Ngày tạo:</strong>{importResponse ? importResponse.createDate : ''}</div>
                        <div className="label-info-import"><strong>Trạng thái:</strong>{importResponse ? importResponse.statusName : ''}</div>
                        <div className="label-info-import"><strong>Người tạo:</strong>{importResponse ? importResponse.email : ''}</div>
                        <div className="order-group-btn">
                            <Button
                                disabled={isLoadingBtn} variant="contained" color="error" startIcon={<DeleteForeverIcon />} sx={{ marginRight: 2 }} onClick={cancelImport}
                            >
                                Hủy phiếu
                            </Button>

                            <Button variant="outlined" endIcon={<ArrowBackIcon />} onClick={() => history.push('/admin/nhapxuat')}>
                                Thoát
                            </Button>
                        </div>
                    </>}

            </div>
        </div >
    )
}