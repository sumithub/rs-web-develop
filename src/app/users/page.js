"use client"
import React from 'react';
import Status from "../../components/Status"
import Dropdown from '../../components/DropDown';
import TableOrder from '../../components/TableOrder';
import PaginationDemo from '../../components/Pagination';
import AdminLayout from '../../components/AdminLayout';

function Users() {
    return (
        <AdminLayout>
            <div className='table-class'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Name" /></th>
                            <th><TableOrder title="Role" /></th>
                            <th><TableOrder title="Status" /></th>
                            <th><TableOrder title="Last Active" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Jaydon George</td>
                            <td>Manager</td>
                            <td><Status status="Active" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown /></td>
                        </tr>

                        <tr>
                            <td>Jaydon George</td>
                            <td>Manager</td>
                            <td><Status status="Pending Invite" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown /></td>
                        </tr>

                        <tr>
                            <td>Jaydon George</td>
                            <td>Manager</td>
                            <td><Status status="Active" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown /></td>
                        </tr>

                        <tr>
                            <td>Jaydon George</td>
                            <td>Manager</td>
                            <td><Status status="Suspended" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown /></td>
                        </tr>

                        <tr>
                            <td>Jaydon George</td>
                            <td>Manager</td>
                            <td><Status status="Active" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown /></td>
                        </tr>

                        <tr>
                            <td>Jaydon George</td>
                            <td>Manager</td>
                            <td><Status status="Pending Invite" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown /></td>
                        </tr>

                        <tr>
                            <td>Jaydon George</td>
                            <td>Manager</td>
                            <td><Status status="Active" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown /></td>
                        </tr>

                        <tr>
                            <td>Jaydon George</td>
                            <td>Manager</td>
                            <td><Status status="Active" /></td>
                            <td>Aug 05,2025</td>
                            <td><Dropdown /></td>
                        </tr>
                    </tbody>
                </table>
                <div>
                    <PaginationDemo />
                </div>
            </div>
        </AdminLayout>
    )
}

export default Users