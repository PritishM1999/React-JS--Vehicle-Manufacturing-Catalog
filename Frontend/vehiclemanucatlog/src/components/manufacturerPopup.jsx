import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const ManufacturerPopup = ({ showPopup, setShowPopup, manufacturerId }) => {
  const [manufacturerData, setManufacturerData] = useState(null);

  useEffect(() => {
    const fetchManufacturerDetails = async () => {
      try {
        const response = await axios.get(
          `https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${manufacturerId}?format=json`
        );
        setManufacturerData(response.data.Results[0]);
      } catch (error) {
        console.log(error);
      }
    };
    fetchManufacturerDetails();
  }, [manufacturerId]);

  return (
    <div className={`manufacturer-popup ${showPopup ? 'active' : ''}`}>
      {manufacturerData ? (
        <div className="manufacturer-popup-content">
          <h2>{manufacturerData.Mfr_Name}</h2>
          <p>
            <strong>Registered Name:</strong> {manufacturerData.Mfr_CommonName}
          </p>
          <p>
            <strong>Current Head:</strong>{' '}
            {manufacturerData.Current_Designation && `${manufacturerData.Current_Designation} `}
            {manufacturerData.Current_Executive && `(${manufacturerData.Current_Executive})`}
          </p>
          <p>
            <strong>Address:</strong>{' '}
            {manufacturerData.Address1 && `${manufacturerData.Address1}, `}
            {manufacturerData.City && `${manufacturerData.City}, `}
            {manufacturerData.State && `${manufacturerData.State}, `}
            {manufacturerData.Country && `${manufacturerData.Country}, `}
            {manufacturerData.Zip && `${manufacturerData.Zip}`}
          </p>
          <p>
            <strong>State:</strong> {manufacturerData.State}
          </p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
      <button className="close-btn" onClick={() => setShowPopup(false)}>
        Close
      </button>
    </div>
  );
};

ManufacturerPopup.propTypes = {
  showPopup: PropTypes.bool.isRequired,
  setShowPopup: PropTypes.func.isRequired,
  manufacturerId: PropTypes.string.isRequired,
};

export default ManufacturerPopup;
