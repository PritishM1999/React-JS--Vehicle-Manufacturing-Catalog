import React, { useState, useEffect } from "react";
import './manu.css';
// import VehicleTypeFilter from '../vehicles/vehicles';
function ManufacturerTable() {
    const [manufacturers, setManufacturers] = useState([]);
    const [searchQuery, setSesrchQuery] = useState([]);

    useEffect(() => {

        fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers/")
            .then((res) => res.json())
            .then((data) => {
                setManufacturers(data.Results)
            })
            .catch((err) => console.log(err));

    }, []);

    const filterManufacturers = manufacturers.filter(
        (m) =>
            m.Mfr_Name &&
            m.Country &&
            m.VehicleTypes &&
            m.Mfr_Name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* <VehicleTypeFilter/> */}

            <input
                type='text'
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSesrchQuery(e.target.value)}
                id="search"
            />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Country</th>
                        <th>Type</th>
                    </tr>
                </thead>
                <tbody>
                    {filterManufacturers.map((m) => (
                        <tr key={m.Mfr_ID}>
                            <td>{m.Mfr_Name}</td>
                            <td>{m.Country}</td>
                            <td>{m.VehicleTypes}</td>
                        </tr>
                    ))

                    }
                </tbody>
            </table>
        </>
    );
}

export default ManufacturerTable;