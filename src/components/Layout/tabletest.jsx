import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import { MDBDataTableV5 } from 'mdbreact';
import 'mdbreact/dist/css/mdb.css';
import React from 'react';
export default function TableTest() {
    const [datatable, setDatatable] = React.useState({
        columns: [
            {
                label: 'Tên sản phẩm',
                field: 'name',
                width: 150,
                attributes: {
                    'aria-controls': 'DataTable',
                    'aria-label': 'Name',
                },
            },
            {
                label: 'Số lượng',
                field: 'position',
                width: 270,
            },
            {
                label: 'Đơn giá',
                field: 'office',
                width: 200,
            },
            {
                label: 'Khuyến mãi',
                field: 'age',
                sort: 'asc',
                width: 100,
            },
            {
                label: 'Loại sản phẩm',
                field: 'date',
                sort: 'disabled',
                width: 150,
            },
            {
                label: 'Hãng',
                field: 'salary',
                sort: 'disabled',
                width: 100,
            },
        ],
        rows: [
            
            {
                name: 'Jackson Bradshaw',
                position: 'Director',
                office: 'New York',
                age: '65',
                date: '2008/09/26',
                salary: '$645',
            },
            {
                name: 'Olivia Liang',
                position: 'Support Engineer',
                office: 'Singapore',
                age: '64',
                date: '2011/02/03',
                salary: '$234',
            },
            {
                name: 'Bruno Nash',
                position: 'Software Engineer',
                office: 'London',
                age: '38',
                date: '2011/05/03',
                salary: '$163',
            },
            {
                name: 'Sakura Yamamoto',
                position: 'Support Engineer',
                office: 'Tokyo',
                age: '37',
                date: '2009/08/19',
                salary: '$139',
            },
            {
                name: 'Thor Walton',
                position: 'Developer',
                office: 'New York',
                age: '61',
                date: '2013/08/11',
                salary: '$98',
            },
            {
                name: 'Finn Camacho',
                position: 'Support Engineer',
                office: 'San Francisco',
                age: '47',
                date: '2009/07/07',
                salary: '$87',
            },
            {
                name: 'Serge Baldwin',
                position: 'Data Coordinator',
                office: 'Singapore',
                age: '64',
                date: '2012/04/09',
                salary: '$138',
            },
            {
                name: 'Zenaida Frank',
                position: 'Software Engineer',
                office: 'New York',
                age: '63',
                date: '2010/01/04',
                salary: '$125',
            },
            {
                name: 'Zorita Serrano',
                position: 'Software Engineer',
                office: 'San Francisco',
                age: '56',
                date: '2012/06/01',
                salary: '$115',
            },
            {
                name: 'Jennifer Acosta',
                position: 'Junior Javascript Developer',
                office: 'Edinburgh',
                age: '43',
                date: '2013/02/01',
                salary: '$75',
            },
            {
                name: 'Cara Stevens',
                position: 'Sales Assistant',
                office: 'New York',
                age: '46',
                date: '2011/12/06',
                salary: '$145',
            },
            {
                name: 'Hermione Butler',
                position: 'Regional Director',
                office: 'London',
                age: '47',
                date: '2011/03/21',
                salary: '$356',
            },
            {
                name: 'Lael Greer',
                position: 'Systems Administrator',
                office: 'London',
                age: '21',
                date: '2009/02/27',
                salary: '$103',
            },
            {
                name: 'Jonas Alexander',
                position: 'Developer',
                office: 'San Francisco',
                age: '30',
                date: '2010/07/14',
                salary: '$86',
            },
            {
                name: 'Shad Decker',
                position: 'Regional Director',
                office: 'Edinburgh',
                age: '51',
                date: '2008/11/13',
                salary: '$183',
            },
            {
                name: 'Michael Bruce',
                position: 'Javascript Developer',
                office: 'Singapore',
                age: '29',
                date: '2011/06/27',
                salary: '$183',
            },
            {
                name: 'Donna Snider',
                position: 'Customer Support',
                office: 'New York',
                age: '27',
                date: '2011/01/25',
                salary: '$112',
            },
        ],
    });

    return <MDBDataTableV5 hover order={['age', 'desc']} data={datatable} />;
}