import Aos from 'aos'
import axios from 'axios'
import { MDBDataTableV5 } from 'mdbreact'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllUser } from '../../app/slice/userSlice'
import CircularProgress from '@mui/material/CircularProgress';
export default function Users() {
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Aos.init({
        })
        setLoading(true)
        axios({
            method: "GET",
            url: `http://localhost:8080/api/user/`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` }
        })
            .then(res => {
                const action = getAllUser(res.data)
                dispatch(action)
            })
            .then(() => {
                setLoading(false)
            })
    }, [])
    const listUser = useSelector(state => state.user)
    const user = () => {
        const data = {
            columns: [
                {
                    label: 'STT',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Tên',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'SĐT',
                    field: 'phone_number',
                    sort: 'asc'
                },
                {
                    label: 'Địa chỉ',
                    field: 'address',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Trạng thái',
                    field: 'activestatus',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                }
            ],
            rows: []
        }

        listUser && listUser.forEach((item, index) => {
            data.rows.push({
                id: index + 1,
                email: <strong>{item.email}</strong>,
                name: item.name,
                phone_number: item.phone_number,
                address: item.address,
                role: <span style={{ color: "#333", fontWeight: 400 }}>{item.role === 2 ? 'Admin' : 'Client'}</span>,
                activestatus: item.activestatus === 'Active' ? <span style={{ padding: 2, background: '#70eff5', color: "#fff", fontWeight: 400 }}>{item.activestatus}</span> : <span style={{ padding: 2, background: '#8d8d8d', color: "#fff", fontWeight: 400 }}>Block</span>,
                actions: <div className="handle-product" >
                    {item.role === 3 && item.activestatus === 'Active' ? <><Link to={`/admin/users/edit/${item.id}`} className="icon icon-edit">

                        <i class="fas fa-pen"></i>
                    </Link>
                        <Link to={`/admin/users/block/${item.id}`} href className="icon icon-delete">
                            <i class="fas fa-lock"></i>
                        </Link></> : ''}
                </div>
            })
        })

        return data;

    }
    return (
        <div className="display">
            <h1 className="title">
                Danh sách tài khoản
            </h1>
            <div className="products">
                <div className="products__controls">
                    <div className="search">

                    </div>
                    <Link to="/admin/users/add"><button className="addproduct"><i className="fas fa-plus"></i>Thêm tài khoản</button></Link>
                </div>
                <div className="list">
                    {loading ?
                        <div className="loading-page">
                            <CircularProgress sx={{ color: "#73b6f8" }} />
                        </div> :
                        <MDBDataTableV5
                            data={user()}
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