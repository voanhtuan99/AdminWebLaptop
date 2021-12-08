import '../style.scss'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Stack from '@mui/material/Stack';
import { useEffect, useState } from 'react';
import Aos from 'aos';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { addCompany, editCompany } from '../../app/slice/companySlice';
export default function EditCompany() {
    const [company_name, setCompanyName] = useState('')
    const [company_type, setCompanyType] = useState('Nhà phân phối')
    const [company_address, setCompanyAddress] = useState('')
    const [company_phone, setCompanyPhone] = useState('')
    const dispatch = useDispatch()
    const history = useHistory()
    const params = useParams()
    const [isLoadingBtn, setIsLoadingBtn] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        Aos.init({
        })
        setLoading(true)
        axios({
            method: "GET",
            url: `http://localhost:8080/api/company/${params.id}`,
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
        })
            .then(res => {
                setCompanyName(res.data.data.company_name)
                setCompanyType(res.data.data.company_type)
                setCompanyAddress(res.data.data.company_address)
                setCompanyPhone(res.data.data.company_phone)
            })
            .then(() => {
                setLoading(false)
            })
    }, [])
    const updateCompany = () => {
        console.log(company_name, company_type, company_address, company_phone);
        if (company_name === '') {
            document.querySelector('.errorname p').innerHTML = 'Tên công ty không được để trống'
        }
        if (company_address === '') {
            document.querySelector('.erroraddress p').innerHTML = 'Địa chỉ không được để trống'
        }
        if (company_phone === '') {
            document.querySelector('.errorphone p').innerHTML = 'Số điện thoại không được để trống'
        }
        if (company_name !== '' && company_type !== '' && company_address !== '' && company_phone !== '') {
            setIsLoadingBtn(true)
            axios({
                method: "PUT",
                url: `http://localhost:8080/api/company/${params.id}`,
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                data: {
                    company_name,
                    company_type,
                    company_address,
                    company_phone
                }
            })
                .then((res) => {
                    toast.success(`Cập nhât thông tin thành công`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    const action = editCompany(res.data.data)
                    dispatch(action)
                    setIsLoadingBtn(false)
                })
                .catch(() => {
                    toast.success(`Cập nhật thất bại`, {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    setIsLoadingBtn(false)
                })
        }
    }
    const handleChange = (e) => {
        setCompanyType(e.target.value)
    }
    return (
        <div className="overlays1">

            <ToastContainer />
            <div className="form add-company" data-aos="zoom-up" data-aos-duration="800">
                {loading ?
                    <div className="loading-page">
                        <CircularProgress sx={{ color: "#73b6f8" }} />
                    </div> : <>
                        <h1 className="title add-cate">CREATE COMPANY</h1>
                        <div className="content">
                            <div className="cate-name">
                                <p>Name</p>
                                <TextField
                                    label="Tên công ty"
                                    id="outlined-size-small"
                                    // defaultValue="Small"
                                    size="small"
                                    fullWidth={true}
                                    value={company_name}
                                    onChange={(e) => {
                                        if (company_name !== '') {
                                            document.querySelector('.errorname p').innerHTML = ''
                                        }
                                        setCompanyName(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="error1 errorname" style={{ marginLeft: 200 }}><p></p></div>
                            <div className="cate-name">
                                <p>Type</p>
                                <div className="select">
                                    <FormControl sx={{ m: 1, minWidth: 405 }}>
                                        <InputLabel id="demo-simple-select-helper-label">Hãng</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-helper-label"
                                            id="demo-simple-select-helper"
                                            value={company_type}
                                            label="Hãng"
                                            onChange={handleChange}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="Nhà phân phối">Nhà phân phối</MenuItem>
                                            <MenuItem value="Vận chuyển">Vận chuyển</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                            </div>
                            <div className="cate-name">
                                <p>Address</p>
                                <TextField
                                    label="Địa chỉ"
                                    id="outlined-size-small"
                                    // defaultValue="Small"
                                    size="small"
                                    fullWidth={true}
                                    value={company_address}
                                    onChange={(e) => {
                                        if (company_address !== '') {
                                            document.querySelector('.erroraddress p').innerHTML = ''
                                        }
                                        setCompanyAddress(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="error1 erroraddress" style={{ marginLeft: 200 }}><p></p></div>
                            <div className="cate-name">
                                <p>Phone number</p>
                                <TextField
                                    label="Số điện thoại"
                                    id="outlined-size-small"
                                    // defaultValue="Small"
                                    size="small"
                                    fullWidth={true}
                                    type="number"
                                    value={company_phone}
                                    onChange={(e) => {
                                        if (company_phone !== '') {
                                            document.querySelector('.errorphone p').innerHTML = ''
                                        }
                                        setCompanyPhone(e.target.value)
                                    }}
                                />
                            </div>
                            <div className="error1 errorphone" style={{ marginLeft: 200 }}><p></p></div>
                        </div>
                        <div className="group-button">
                            <Stack direction="row" spacing={2}>
                                <Button disabled={isLoadingBtn} variant="contained" startIcon={<SaveIcon />} onClick={updateCompany}>
                                    Cập nhật
                                </Button>
                                <Button variant="outlined" onClick={() => history.push('/admin/company')} endIcon={<ArrowBackIcon />}>
                                    Thoát
                                </Button>
                            </Stack>
                        </div></>}
            </div>
        </div>
    )
}