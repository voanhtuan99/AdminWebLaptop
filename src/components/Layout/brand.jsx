import Aos from "aos";
import axios from "axios";
import { MDBDataTableV5 } from "mdbreact";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllBrand } from "../../app/slice/brandSlice";
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react'
export default function Brand() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Aos.init({

        })
        setLoading(true)
        axios({
            method: "GET",
            url: "http://localhost:8080/api/brand/",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then(res => {
                const action = getAllBrand(res.data.data)
                dispatch(action);
            }).then(() => {
                setLoading(false)
            })
    }, [])
    const listBrand = useSelector(state => state.brand)
    const brands = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Brand name',
                    field: 'brand_name',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        }

        listBrand && listBrand.forEach(item => {
            data.rows.push({
                id: item.id,
                brand_name: item.brand_name,
                actions: <div className="handle-product" >
                    <Link to={`/admin/brand/edit/${item.id}`} className="icon icon-edit">
                        <i className="fas fa-pen"></i>
                    </Link>
                    <Link to={`/admin/brand/del/${item.id}`} href className="icon icon-delete">
                        <i className="fas fa-trash-alt"></i>
                    </Link>
                </div>
            })
        })

        return data;

    }

    console.log(listBrand)
    return (
        <div className="display">
            <h1 className="title">
                BRANDS
            </h1>
            <div className="products">
                <div className="products__controls">
                    <div className="search">

                    </div>
                    <Link to="/admin/brand/add"><button className="addproduct"><i className="fas fa-plus"></i>Thêm công ty</button></Link>
                </div>
                <div className="list">
                    {loading ?
                        <div className="loading-page">
                            <CircularProgress sx={{ color: "#73b6f8" }} />
                        </div> :
                        <MDBDataTableV5
                            data={brands()}
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