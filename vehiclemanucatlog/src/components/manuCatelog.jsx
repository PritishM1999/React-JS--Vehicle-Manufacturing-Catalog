import React, { useState, useEffect } from "react";
import ManufacturerTable from "./ManufacturerTable";
import ManufacturerPopup from "./ManufacturerPopup";
import ManufacturerFilter from "./manuFilter";
import './manuCatelog.css';


const ManufacturerCatalog = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [filteredManufacturers, setFilteredManufacturers] = useState([]);
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState("");

  useEffect(() => {
    const fetchManufacturers = async () => {
      try {
        const response = await fetch(
          "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json"
        );
        const data = await response.json();
        setManufacturers(data.Results);
        setFilteredManufacturers(data.Results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchManufacturers();
  }, []);

  const handleRowClick = async (manufacturerId) => {
    try {
      const response = await fetch(
        `https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${manufacturerId}?format=json`
      );
      const data = await response.json();
      setSelectedManufacturer(data.Results[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    const filteredData = manufacturers.filter((manufacturer) => {
      return (
        manufacturer.Mfr_Name.toLowerCase().includes(event.target.value.toLowerCase()) ||
        manufacturer.Country.toLowerCase().includes(event.target.value.toLowerCase()) ||
        manufacturer.VehicleTypes.toLowerCase().includes(event.target.value.toLowerCase())
      );
    });
    setFilteredManufacturers(filteredData);
  };

  const handleFilterChange = (event) => {
    setVehicleTypeFilter(event.target.value);
    if (event.target.value === "") {
      setFilteredManufacturers(manufacturers);
    } else {
      const filteredData = manufacturers.filter((manufacturer) => {
        return manufacturer.VehicleTypes.toLowerCase().includes(event.target.value.toLowerCase());
      });
      setFilteredManufacturers(filteredData);
    }
  };

  return (
    <div className="manufacturer-catalog">
      <h1 className="catalog-heading">Vehicle Manufacturer Catalog</h1>
      <ManufacturerFilter
        vehicleTypes={getVehicleTypes(manufacturers)}
        vehicleTypeFilter={vehicleTypeFilter}
        onFilterChange={handleFilterChange}
      />
      <input
        type="text"
        placeholder="Search by name, country, or vehicle type..."
        value={searchTerm}
        onChange={handleSearch}
        className="search-input"
      />
      <ManufacturerTable manufacturers={filteredManufacturers} onRowClick={handleRowClick} />
      {selectedManufacturer && (
        <ManufacturerPopup
          manufacturer={selectedManufacturer}
          onClose={() => setSelectedManufacturer(null)}
        />
      )}
    </div>
  );
};

const getVehicleTypes = (manufacturers) => {
  const vehicleTypes = new Set();
  manufacturers.forEach((manufacturer) => {
    const types = manufacturer.VehicleTypes.split(",");
    types.forEach((type) => vehicleTypes.add(type.trim()));
  });
  return Array.from(vehicleTypes).sort();
};

export default ManufacturerCatalog;
