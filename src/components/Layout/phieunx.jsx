import Aos from 'aos'
import axios from 'axios'
import { MDBDataTableV5 } from 'mdbreact'
import { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllPNX } from '../../app/slice/phieunhapxuatSlice'
import VisibilityIcon from '@mui/icons-material/Visibility';
import './style.scss'
import { CircularProgress } from '@mui/material'
export default function PhieuNhapXuat() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Aos.init({

        })
        setLoading(true)
        axios({
            method: "GET",
            url: "http://localhost:8080/api/pnhapxuat",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        }).then(res => {
            const action = getAllPNX(res.data.data)
            dispatch(action)
        }).then(() => {
            setLoading(false)
        })
    }, [])
    const listPNX = useSelector(state => state.phieunx)
    console.log(listPNX)
    const phieunx = () => {
        const data = {
            columns: [

                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Ngày tạo',
                    field: 'createDate',
                    sort: 'asc'
                },
                {
                    label: 'Công ty',
                    field: 'company_name',
                    sort: 'asc'
                },
                {
                    label: 'Loại phiếu',
                    field: 'loaiPhieu',
                    sort: 'asc'
                },
                {
                    label: 'Trạng thái',
                    field: 'status',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        }

        listPNX && listPNX.forEach(item => {
            data.rows.push({
                email: item.email,
                createDate: item.createDate,
                company_name: item.company_name,
                loaiPhieu: item.loaiPhieu,
                status: item.statusName,
                actions: <div className="handle-product" >
                    <Link to={`/admin/nhapxuat/view/${item.nhapId}`} className="icon icon-edit">
                        <i className="fas fa-eye"></i>
                    </Link>
                    {item.statusName !== 'Cancel' ? <Link to={`/admin/nhapxuat/del/${item.nhapId}`} href className="icon icon-delete">
                        <i className="fas fa-trash-alt"></i>
                    </Link> : ''}
                </div>
            })
        })

        return data;

    }
    return (
        <div className="display" data-aos="zoom-up" data-aos-duration="800">
            <h1 className="title">
                Phiếu nhập xuất
            </h1>

            <div className="products">
                <div className="products__controls">
                    <div className="search">

                    </div>
                    <Link to="/admin/nhapxuat/add"><button className="addproduct"><i className="fas fa-plus"></i>Tạo phiếu nhập</button></Link>
                </div>
                <div className="list">
                    {loading ?
                        <div className="loading-page">
                            <CircularProgress sx={{ color: "#73b6f8" }} />
                        </div> :
                        <MDBDataTableV5
                            data={phieunx()}
                            className="px-3"
                            hover
                            searchTop
                            searchBottom={false}
                        />}
                </div>
            </div>

        </div>
    )
}