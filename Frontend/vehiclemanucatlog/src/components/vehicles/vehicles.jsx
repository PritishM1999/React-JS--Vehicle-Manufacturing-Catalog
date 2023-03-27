import React, { useState, useEffect } from "react";

function VehicleTypeFilter({ manufacturers, onFilter }){
    const [vehicleTypes, setVehicleTypes] = useState([]);

    useEffect(() => {
        const types = manufacturers.reduce((acc, m) =>{
            if(m.vehicleTypes){
                m.vehicleTypes.split(";").forEach((type)=>{
                    if(!acc.includes(type)){
                        acc.push(type);
                    }
                });
            }
            return acc;
        }, []);
        setVehicleTypes(types);
    }, [manufacturers]);

    return(
        <select onChange={(e) => onFilter(e.target.value)}>
            <option value="">All</option>
            {vehicleTypes.map((type) => (
                <option key={type}>{type}
                {type}
                </option>
            ))}
        </select>
    );
}

export default VehicleTypeFilter;