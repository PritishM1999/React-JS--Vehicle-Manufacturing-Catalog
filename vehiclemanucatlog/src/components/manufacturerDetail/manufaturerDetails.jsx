import React, { useState, useEffect } from "react";

// function VehicleTypeFilter({manufact})

function ManufacturerDetailsModel({ manufacturerId, onClose }){
    const [details, setDetails] = useState(null);

    useEffect(() => {
        if(manufacturerId){
            fetch(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${manufacturerId}`)
            .then((res) => res.json())
            .then((data) => {
                setDetails(data);
            })
            .catch((err) => console.log(err))
        }
    }, [manufacturerId]);

    if(!details){
        return null;
    }

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>
                    &times;
                </span>
                <h2>{details.Mfr_Name}</h2>
                <p>
                    <strong>Registration Name:</strong> {details.Mfr_CommonName}
                </p>
                <strong>Current Head:</strong> {details.Current_Holder}

                {details.Current_Designation && (
                    <>
                        {" "}
                        (<em>{details.Current_Designation}</em>)
                    </>
                )}
                <p>
                    <strong>Address:</strong> {details.Mfr_Address}
                </p>
                <p>
                    <strong>State:</strong> {details.Mfr_StateProvince}
                </p>
            </div>
        </div>
    );
}

export default ManufacturerDetailsModel;