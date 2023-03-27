import React, { useState, useEffect } from 'react';
import ManufacturerTable from './components/manufacturers/manu';
import VehicleTypeFilter from './components/vehicles/vehicles';
import ManufacturerDetailsModel from './components/manufacturerDetail/manufaturerDetails';

function ManufacturerCatalog() {
  const [manufacturers, setManufacturers] = useEffect([]);
  const [selectedManufacturerId, setSelectedManufacturerId] = useState(null);
  const [filteredVehicleType, setFilteredVehicleType] = useState("");

  useEffect(()=> {
    fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers")
    .then((res) => res.json())
    .then((data) => {
      setManufacturers(data.Results)
    })
    .catch((err) => console.log(err));
  }, []);

  const filteredManufacturers =  manufacturers.filter(
    (m) =>
      m.Mfr_Name &&
      m.Country &&
      m.VehicleTypes &&
    (!filteredVehicleType || m.VehicleTypes.includes(filteredVehicleType))
  );

  return (
    <>
    <VehicleTypeFilter
      manufacturers={manufacturers}
      onFilter={setFilteredVehicleType}
    />
    <ManufacturerTable
      manufacturers={filteredManufacturers}
      onFilter={setSelectedManufacturerId}
    />
    <ManufacturerDetailsModel
      manufacturers={selectedManufacturerId}
      onFilter={setSelectedManufacturerId(null)}
    />
    </>
  );
}

export default ManufacturerCatalog;