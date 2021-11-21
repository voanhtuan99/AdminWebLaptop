import './style.scss'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Aos from 'aos'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { MDBDataTableV5 } from 'mdbreact'
import { getAllCompany } from '../../app/slice/companySlice'
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react'
export default function Companies() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Aos.init({

        })
        setLoading(true)
        axios({
            method: "GET",
            url: "http://localhost:8080/api/company/",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then(res => {
                const action = getAllCompany(res.data.data)
                dispatch(action);
            }).then(() => {
                setLoading(false)
            })
    }, [])
    const listCompany = useSelector(state => state.company)
    console.log(listCompany)
    const companies = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Company name',
                    field: 'company_name',
                    sort: 'asc'
                },
                {
                    label: 'Type',
                    field: 'company_type',
                    sort: 'asc'
                },
                {
                    label: 'Address',
                    field: 'company_address',
                    sort: 'asc'
                },
                {
                    label: 'Phone Number',
                    field: 'company_phone',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        }

        listCompany && listCompany.forEach(item => {
            data.rows.push({
                id: item.id,
                company_name: item.company_name,
                company_type: item.company_type,
                company_address: item.company_address,
                company_phone: item.company_phone,
                actions: <div className="handle-product" >
                    <Link to={`/admin/company/edit/${item.id}`} className="icon icon-edit">
                        <i className="fas fa-pen"></i>
                    </Link>
                    <Link to={`/admin/company/del/${item.id}`} href className="icon icon-delete">
                        <i className="fas fa-trash-alt"></i>
                    </Link>
                </div>
            })
        })

        return data;

    }
    return (
        <div className="display">
            <h1 className="title">
                COMPANIES
            </h1>
            <div className="products">
                <div className="products__controls">
                    <div className="search">

                    </div>
                    <Link to="/admin/company/add"><button className="addproduct"><i className="fas fa-plus"></i>Thêm công ty</button></Link>
                </div>
                <div className="list small">
                    {loading ?
                        <div className="loading-page">
                            <CircularProgress sx={{ color: "#73b6f8" }} />
                        </div> :
                        <MDBDataTableV5
                            data={companies()}
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