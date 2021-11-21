import './style.scss'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import Aos from 'aos'
import axios from 'axios'
import { getAllCategory } from '../../app/slice/categorySlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { MDBDataTableV5 } from 'mdbreact'
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from 'react'
export default function Categories() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Aos.init({

        })
        setLoading(true)
        axios({
            method: "GET",
            url: "http://localhost:8080/api/category/",
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then(res => {
                const action = getAllCategory(res.data.data)
                dispatch(action);
            }).then(() => {
                setLoading(false)
            })
    }, [])
    const listCategory = useSelector(state => state.category)
    const categories = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Category name',
                    field: 'category_name',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        }

        listCategory && listCategory.forEach(item => {
            data.rows.push({
                id: item.id,
                category_name: item.category_name,
                actions: <div className="handle-product" >
                    <Link to={`/admin/category/edit/${item.id}`} className="icon icon-edit">
                        <i className="fas fa-pen"></i>
                    </Link>
                    <Link to={`/admin/category/del/${item.id}`} href className="icon icon-delete">
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
                Categories
            </h1>
            <div className="products">
                <div className="products__controls">
                    <div className="search">

                    </div>
                    <Link to="/admin/category/add"><button className="addproduct"><i className="fas fa-plus"></i>Thêm loại</button></Link>
                </div>
                <div className="list small">
                    {loading ?
                        <div className="loading-page">
                            <CircularProgress sx={{ color: "#73b6f8" }} />
                        </div> :
                        <MDBDataTableV5
                            data={categories()}
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