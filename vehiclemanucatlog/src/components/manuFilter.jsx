import React from 'react';
import './manuFilter.css';

const ManufacturerFilter = (props) => {
  const { handleFilter } = props;
  const uniqueVehicleTypes = [...new Set(props.vehicleTypes)]; // Get unique vehicle types

  return (
    <div className="manufacturer-filter">
      <label htmlFor="vehicle-type">Filter by Vehicle Type:</label>
      <select id="vehicle-type" onChange={handleFilter}>
        <option value="all">All</option>
        {uniqueVehicleTypes.map((vehicleType) => (
          <option key={vehicleType} value={vehicleType}>
            {vehicleType}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ManufacturerFilter;
