import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteCustomer } from '../../Store/CustomerReducer';
import { RootState } from '../../Store/Store';
import { BUTTON_TEXT, ERROR_MESSAGE, PLACE_HOLDER_TEXT, SCREEN_TITLE, TOAST_MESSAGE_VALUE } from '../../Utility/Constant';
import { showNotification } from '../../Components/ToastMessage';

export default function Dashboard() {

    //Store Value
    const customerDetails = useSelector((state: RootState) => state.customer);

    //Local State Value
    const [customerData, setCustomerData] = useState([]);
    const [sortedData, setSortedData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOrder, setSortOrder] = useState({
        key: '',
        ascending: true,
    });

    //Dispatch Action
    const dispatch = useDispatch();

    //Delete the Records
    const handleDelete = (id: any) => {
        dispatch(deleteCustomer({ id: id }));
        showNotification(ERROR_MESSAGE.DELETE_CUSTOMER, TOAST_MESSAGE_VALUE.SUCCESS);
    }

    useEffect(() => {
        setCustomerData(customerDetails);
        setSortedData(customerDetails);
    }, [customerDetails])

    //Filter based on the Name 
    const handleFilter = (event) => {
        const searchTerm = event.target.value.toLowerCase();
        setSearchTerm(searchTerm);
        const filtered = customerData.filter((item) =>
            item.name.toLowerCase().includes(searchTerm)
        );
        setSortedData(filtered);
    };

    //Sorting the data using asc
    const handleSort = (key) => {
        const isAscending = sortOrder.key === key ? !sortOrder.ascending : true;
        const sorted = [...sortedData].sort((a, b) => {
            if (a[key] < b[key]) return isAscending ? -1 : 1;
            if (a[key] > b[key]) return isAscending ? 1 : -1;
            return 0;
        });
        setSortedData(sorted);
        setSortOrder({ key, ascending: isAscending });
    };

    //Render Elements
    return (
        <div className='container dashboard_container'>
            <div style={{ display: "flex", justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>{SCREEN_TITLE.DASHBOARD_CUSTOMER}</h2>
                <Link to={`/`} className='btn btn-sm btn-primary'><h6>{SCREEN_TITLE.LOGOUT}</h6></Link>
            </div>
            <div className='head-search'>
                <Link to={`/create/${"0"}`} className='btn btn-success my-3'>{BUTTON_TEXT.CREATE}</Link>
                <input
                    type="text"
                    placeholder={PLACE_HOLDER_TEXT.SEARCH_BY_NAME}
                    value={searchTerm}
                    onChange={handleFilter}
                />
            </div>
            <table className='table'>
                <thead>
                    <tr>
                        <th onClick={() => handleSort('id')}>
                            ID {sortOrder.key === 'id' && (sortOrder.ascending ? '↑' : '↓')}</th>
                        <th onClick={() => handleSort('name')}>
                            Name{' '}
                            {sortOrder.key === 'name' &&
                                (sortOrder.ascending ? '↑' : '↓')}</th>
                        <th onClick={() => handleSort('email')}>
                            Email{' '}
                            {sortOrder.key === 'email' &&
                                (sortOrder.ascending ? '↑' : '↓')}
                        </th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((customer, index) => (
                        <tr key={index}>
                            <td>{customer.id}</td>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td><Link to={`/create/${customer.id}`} className='btn btn-sm btn-primary'>{BUTTON_TEXT.EDIT}</Link>
                                <button onClick={() => { handleDelete(customer.id) }} className='btn btn-sm btn-danger ms-2'>{BUTTON_TEXT.DELETE}</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
