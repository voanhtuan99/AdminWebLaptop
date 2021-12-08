import Aos from 'aos';
import "aos/dist/aos.css";
import React, { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import "./dashboard.scss";
import axios from 'axios'
import { TextField } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import CircularProgress from '@mui/material/CircularProgress';
import { MDBDataTableV5 } from 'mdbreact'
export default function Dashboard() {
    var fromdate = new Date(Date.now())
    fromdate.setDate(fromdate.getDate() - 5)
    var today = new Date(Date.now())
    today.setDate(today.getDate() + 1)

    fromdate = fromdate.toISOString().split('T')[0]
    today = today.toISOString().split('T')[0]
    const [beginDate, setBeginDate] = useState(fromdate)
    const [endDate, setEndDate] = useState(today)
    const [tke, setTke] = useState({})
    const [top5Sold, setTop5Sold] = useState([])
    const [top5Profit, setTop5Profit] = useState([])
    const [loading, setLoading] = useState(false)
    const [statisticSold, setStatisticSold] = useState([])
    const [statisticProfit, setStatisticProfit] = useState([])
    useEffect(() => {
        Aos.init({})
        setLoading(true)
        axios({
            method: "POST",
            url: `http://localhost:8080/api/dashboard/tkeall`,
            data: {
                dateBegin: beginDate,
                dateEnd: endDate
            },
            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
        }).then(res => {
            setTke(res.data.data)
        }).then(() => {
            axios({
                method: "POST",
                url: `http://localhost:8080/api/dashboard/top5sold`,
                data: {
                    dateBegin: beginDate,
                    dateEnd: endDate
                },
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
            }).then(res => {
                setTop5Sold(res.data.data)
                axios({
                    method: "POST",
                    url: `http://localhost:8080/api/dashboard/top5profit`,
                    data: {
                        dateBegin: beginDate,
                        dateEnd: endDate
                    },
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                }).then(res => {
                    setTop5Profit(res.data.data)
                }).then(() => {
                    axios({
                        method: "POST",
                        url: `http://localhost:8080/api/dashboard/statisticsold`,
                        data: {
                            dateBegin: beginDate,
                            dateEnd: endDate
                        },
                        headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                    }).then(res => {
                        setStatisticSold(res.data.data)
                        axios({
                            method: "POST",
                            url: `http://localhost:8080/api/dashboard/statisticprofit`,
                            data: {
                                dateBegin: beginDate,
                                dateEnd: endDate
                            },
                            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                        }).then(res => {
                            setStatisticProfit(res.data.data)
                            setLoading(false)

                        })

                    })
                })
            })
        })
    }, [])
    const handleChangeDate = () => {
        let firstday = new Date(beginDate)
        let lastday = new Date(endDate)
        if (beginDate === '' || endDate === '') {
            toast.error('Ngày không hợp lệ. Chọn lại!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    zIndex: 50
                }
            });
            return
        }
        if (firstday.getTime() > lastday.getTime()) {
            toast.error('Ngày không hợp lệ. Chọn lại!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                style: {
                    marginTop: 60
                }
            });
        }
        else {
            setLoading(true)
            axios({
                method: "POST",
                url: `http://localhost:8080/api/dashboard/tkeall`,
                data: {
                    dateBegin: beginDate,
                    dateEnd: endDate
                },
                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
            }).then(res => {
                setTke(res.data.data)
            }).then(() => {
                axios({
                    method: "POST",
                    url: `http://localhost:8080/api/dashboard/top5sold`,
                    data: {
                        dateBegin: beginDate,
                        dateEnd: endDate
                    },
                    headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                }).then(res => {
                    setTop5Sold(res.data.data)
                    axios({
                        method: "POST",
                        url: `http://localhost:8080/api/dashboard/top5profit`,
                        data: {
                            dateBegin: beginDate,
                            dateEnd: endDate
                        },
                        headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                    }).then(res => {
                        setTop5Profit(res.data.data)
                    }).then(() => {
                        axios({
                            method: "POST",
                            url: `http://localhost:8080/api/dashboard/statisticsold`,
                            data: {
                                dateBegin: beginDate,
                                dateEnd: endDate
                            },
                            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                        }).then(res => {
                            setStatisticSold(res.data.data)
                        })
                    }).then(() => {
                        axios({
                            method: "POST",
                            url: `http://localhost:8080/api/dashboard/statisticprofit`,
                            data: {
                                dateBegin: beginDate,
                                dateEnd: endDate
                            },
                            headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                        }).then(res => {
                            setStatisticProfit(res.data.data)
                            axios({
                                method: "POST",
                                url: `http://localhost:8080/api/dashboard/statisticprofit`,
                                data: {
                                    dateBegin: beginDate,
                                    dateEnd: endDate
                                },
                                headers: { 'Authorization': `Bearer ${localStorage.getItem("accessToken")}` },
                            }).then(res => {
                                setStatisticProfit(res.data.data)
                                setLoading(false)

                            })
                        })
                    })
                })
            })
        }
    }
    const tkeSold = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Tên sản phẩm',
                    field: 'productName',
                    sort: 'asc'
                },
                {
                    label: 'Số lượng bán',
                    field: 'quantitySold',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        statisticSold && statisticSold.forEach((item, index) => {
            data.rows.push({
                id: index + 1,
                productName: <strong>{item.productName}</strong>,
                quantitySold: <div className="text-blue">{item.quantitySold}</div>,

            })
        })

        return data;

    }

    const tkeProfit = () => {
        const data = {
            columns: [
                {
                    label: 'ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Tên sản phẩm',
                    field: 'productName',
                    sort: 'asc'
                },
                {
                    label: 'Số tiền bán',
                    field: 'priceSold',
                    sort: 'asc'
                },
            ],
            rows: []
        }

        statisticProfit && statisticProfit.forEach((item, index) => {
            data.rows.push({
                id: index + 1,
                productName: <strong>{item.productName}</strong>,
                priceSold: <div className="text-blue">{new Intl.NumberFormat().format(item.priceSold)}đ</div>,

            })
        })

        return data;

    }
    return (
        <div className="adminpage" data-aos="fade-up" data-aos-duration="400">
            <ToastContainer />
            <h1 className="title">Dashboard</h1>
            <div className="form-select-date">
                <h3>Chọn ngày</h3>
                <div className="selected-date">
                    <div className="begin-date">
                        <TextField
                            id="date"
                            label="Ngày bắt đầu"
                            type="date"
                            defaultValue={fromdate}
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={beginDate}
                            onChange={(e) => setBeginDate(e.target.value)}
                        />
                    </div>
                    <div className="begin-date">
                        <TextField
                            id="date"
                            label="Ngày kết thúc"
                            type="date"
                            defaultValue={today}
                            sx={{ width: 220 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </div>
                </div>
                <div className="group-btn">
                    <button onClick={handleChangeDate}>Chọn ngày</button>
                </div>
            </div>
            {loading ?
                <div className="loading-page">
                    <CircularProgress sx={{ color: "#73b6f8" }} />
                </div> : <>
                    <div className="thongke1">
                        <div className="banthongke tiennhap" data-aos="fade-up" data-aos-duration="500">
                            <h3>Tiền nhập</h3>
                            <p>{new Intl.NumberFormat().format(tke.tienNhap)}đ</p>
                        </div>
                        <div className="banthongke tienxuat" data-aos="fade-up" data-aos-duration="600">
                            <h3>Tiền xuất</h3>
                            <p>{new Intl.NumberFormat().format(tke.tienXuat)}đ</p>
                        </div>

                        <div className="banthongke soluongnhap" data-aos="fade-up" data-aos-duration="500">
                            <h3>Số lượng nhập</h3>
                            <p>{tke.soLuongNhap} sản phẩm</p>
                        </div>
                        <div className="banthongke soluongxuat" data-aos="fade-up" data-aos-duration="600">
                            <h3>Số lượng xuất</h3>
                            <p>{tke.soLuongXuat} sản phẩm</p>
                        </div>
                        <div className="banthongke tienloi" data-aos="fade-up" data-aos-duration="500">
                            <h3>Tiền lời</h3>
                            <p>{new Intl.NumberFormat().format(tke.tienLoi)}đ</p>
                        </div>
                    </div>
                    <div className="thongke2">
                        <div className="chart chart1" data-aos="zoom-in-up" data-aos-duration="800">
                            <h3>Sản phẩm có doanh thu cao</h3>
                            <Example top5Profit={top5Profit} />
                        </div>
                        <div className="chart chart2" data-aos="zoom-in" data-aos-duration="800">
                            <h3>Sản phẩm bán chạy</h3>

                            <Example2 top5Sold={top5Sold} />
                            <div className="mota"></div>
                        </div>
                    </div>
                    <h2>Thống kê số lượng sản phẩm bán được</h2>
                    <div className="table-statistic">
                        <MDBDataTableV5
                            data={tkeSold()}
                            className="px-3"
                            hover
                            searchTop
                            searchBottom={false}
                        />

                    </div>
                    <h2>Thống kê số lượng sản phẩm bán được</h2>
                    <div className="table-statistic">
                        <MDBDataTableV5
                            data={tkeProfit()}
                            className="px-3"
                            hover
                            searchTop
                            searchBottom={false}
                        />

                    </div>
                </>}
        </div>
    )
}

export function Example2(props) {

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];
    return (
        <ResponsiveContainer width="90%" height="70%">
            <PieChart width={500} height={500}>
                <Pie
                    data={props.top5Sold}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    // label={renderCustomizedLabel}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="quantitySold"
                >
                    {props.top5Sold.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );

}

export function Example(props) {
    // const data = [
    //     {
    //         name: 'Page A',
    //         uv: 4000,
    //         pv: 2400,
    //         amt: 2400,
    //     },
    //     {
    //         name: 'Page B',
    //         uv: 3000,
    //         pv: 1398,
    //         amt: 2210,
    //     },
    //     {
    //         name: 'Page C',
    //         uv: 2000,
    //         pv: 9800,
    //         amt: 2290,
    //     },
    //     {
    //         name: 'Page D',
    //         uv: 2780,
    //         pv: 3908,
    //         amt: 2000,
    //     },
    //     {
    //         name: 'Page E',
    //         uv: 1890,
    //         pv: 4800,
    //         amt: 2181,
    //     },
    //     {
    //         name: 'Page F',
    //         uv: 2390,
    //         pv: 3800,
    //         amt: 2500,
    //     },
    //     {
    //         name: 'Page G',
    //         uv: 3490,
    //         pv: 4300,
    //         amt: 2100,
    //     },
    // ];
    return (
        <ResponsiveContainer width="100%" height="100%">
            <BarChart
                width={500}
                height={300}
                data={props.top5Profit}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
                barSize={20}
            >
                <XAxis dataKey="productName" scale="point" padding={{ left: 10, right: 10 }} />
                <YAxis />
                <Tooltip />
                <Legend />
                <CartesianGrid strokeDasharray="3 3" />
                <Bar dataKey="priceSold" fill="#8884d8" background={{ fill: '#eee' }} />
            </BarChart>
        </ResponsiveContainer>
    );

}

