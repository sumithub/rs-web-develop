"use client"
import React from 'react'
import Dropdown from '../../components/DropDown'
import TableOrder from '../../components/TableOrder'

function CampaignsTemplates() {
    return (
        <div className='table-class'>
            <table className='w-full'>
                <thead>
                    <tr>
                        <th><TableOrder title="Template Name" /></th>
                        <th><TableOrder title="Type" /></th>
                        <th><TableOrder title="Subject" /></th>
                        <th><TableOrder title="Last Updated" /></th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Hiking Template</td>
                        <td>Email</td>
                        <td>Lorem ipsum....</td>
                        <td>Jun 18,2025|10:00Am</td>
                        <td><Dropdown /></td>
                    </tr>

                    <tr>
                        <td>Hiking Template</td>
                        <td>Email</td>
                        <td>Lorem ipsum....</td>
                        <td>Jun 18,2025|10:00Am</td>
                        <td><Dropdown /></td>
                    </tr>

                    <tr>
                        <td>Hiking Template</td>
                        <td>Email</td>
                        <td>Lorem ipsum....</td>
                        <td>Jun 18,2025|10:00Am</td>
                        <td><Dropdown /></td>
                    </tr>

                    <tr>
                        <td>Hiking Template</td>
                        <td>Email</td>
                        <td>Lorem ipsum....</td>
                        <td>Jun 18,2025|10:00Am</td>
                        <td><Dropdown /></td>
                    </tr>

                    <tr>
                        <td>Hiking Template</td>
                        <td>Email</td>
                        <td>Lorem ipsum....</td>
                        <td>Jun 18,2025|10:00Am</td>
                        <td><Dropdown /></td>
                    </tr>

                    <tr>
                        <td>Hiking Template</td>
                        <td>Email</td>
                        <td>Lorem ipsum....</td>
                        <td>Jun 18,2025|10:00Am</td>
                        <td><Dropdown /></td>
                    </tr>

                    <tr>
                        <td>Hiking Template</td>
                        <td>Email</td>
                        <td>Lorem ipsum....</td>
                        <td>Jun 18,2025|10:00Am</td>
                        <td><Dropdown /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default CampaignsTemplates