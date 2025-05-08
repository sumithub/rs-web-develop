"use client"
import AdminLayout from '../../components/AdminLayout'
import PaginationDemo from '../../components/Pagination'
import Status from '../../components/Status'
import TableOrder from '../../components/TableOrder'
import React from 'react'

function ManageCampaigns() {
    return (
        <AdminLayout>
            <div className='table-class'>
                <table className='w-full'>
                    <thead>
                        <tr>
                            <th><TableOrder title="Campaign Name" /></th>
                            <th><TableOrder title="Created On" /></th>
                            <th><TableOrder title="Launch Date" /></th>
                            <th><TableOrder title="Customers" /></th>
                            <th><TableOrder title="Status" /></th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Campaign 1</td>
                            <td>Jan 10,2025</td>
                            <td>Jan 15,2025</td>
                            <td>150</td>
                            <td><Status status="Draft" /></td>
                        </tr>

                        <tr>
                            <td>Campaign 2</td>
                            <td>Jan 14,2025</td>
                            <td>Jan 20,2025</td>
                            <td>150</td>
                            <td><Status status="Draft" /></td>
                        </tr>

                        <tr>
                            <td>Campaign 3</td>
                            <td>Jan 20,2025</td>
                            <td>Jan 28,2025</td>
                            <td>150</td>
                            <td><Status status="Draft" /></td>
                        </tr>

                        <tr>
                            <td>Campaign 4</td>
                            <td>Jan 22,2025</td>
                            <td>Jan 30,2025</td>
                            <td>150</td>
                            <td><Status status="Draft" /></td>
                        </tr>

                        <tr>
                            <td>Campaign 5</td>
                            <td>Jan 25,2025</td>
                            <td>Aug 10,2025</td>
                            <td>150</td>
                            <td><Status status="Draft" /></td>
                        </tr>

                        <tr>
                            <td>Campaign 6</td>
                            <td>Jan 28,2025</td>
                            <td>Aug 12,2025</td>
                            <td>150</td>
                            <td><Status status="Draft" /></td>
                        </tr>

                        <tr>
                            <td>Campaign 7</td>
                            <td>Jan 30,2025</td>
                            <td>Aug 15,2025</td>
                            <td>150</td>
                            <td><Status status="Draft" /></td>
                        </tr>

                        <tr>
                            <td>Campaign 8</td>
                            <td>Aug 10,2025</td>
                            <td>Aug 20,2025</td>
                            <td>150</td>
                            <td><Status status="Draft" /></td>
                        </tr>
                    </tbody>
                </table>
                <PaginationDemo />
            </div>
        </AdminLayout>
    )
}

export default ManageCampaigns