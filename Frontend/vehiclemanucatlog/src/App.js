import React, { useState, useEffect } from 'react';
import './App.css';
import ManufacturerTable from './ManufacturerTable';
import ManufacturerPopup from './ManufacturerPopup';
import axios from 'axios';

function App() {
  const [manufacturers, setManufacturers] = useState([]);
  const [filteredManufacturers, setFilteredManufacturers] = useState([]);
  const [types, setTypes] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get('https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers')
      .then(response => {
        const data = response.data.Results.filter(result => result.Country !== "");
        setManufacturers(data);
        setFilteredManufacturers(data);
        setTypes([...new Set(data.map(result => result.VehicleTypeName))]);
      })
      .catch(error => console.log(error));
  }, []);

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  }

  useEffect(() => {
    if (selectedType === "") {
      setFilteredManufacturers(manufacturers.filter(result => result.VehicleTypeName !== ""));
    } else {
      setFilteredManufacturers(manufacturers.filter(result => result.VehicleTypeName === selectedType));
    }
  }, [selectedType, manufacturers]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  }

  useEffect(() => {
    setFilteredManufacturers(manufacturers.filter(result =>
      result.Company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.Country.toLowerCase().includes(searchTerm.toLowerCase()) ||
      result.VehicleTypeName.toLowerCase().includes(searchTerm.toLowerCase())
    ));
  }, [searchTerm, manufacturers]);

  const handleRowClick = (id) => {
    axios.get(`https://vpic.nhtsa.dot.gov/api/vehicles/getmanufacturerdetails/${id}`)
      .then(response => {
        setSelectedManufacturer(response.data.Results[0]);
      })
      .catch(error => console.log(error));
  }

  const handlePopupClose = () => {
    setSelectedManufacturer(null);
  }

  return (
    <div className="App">
      <h1>Vehicle Manufacturer Catalog</h1>
      <div className="filter-container">
        <select value={selectedType} onChange={handleTypeChange}>
          <option value="">Filter by Vehicle Type</option>
          {types.map((type, index) => (
            <option key={index} value={type}>{type}</option>
          ))}
        </select>
        <input type="text" placeholder="Search" value={searchTerm} onChange={handleSearch} />
      </div>
      <ManufacturerTable manufacturers={filteredManufacturers} handleRowClick={handleRowClick} />
      {selectedManufacturer && <ManufacturerPopup manufacturer={selectedManufacturer} handleClose={handlePopupClose} />}
    </div>
  );
}

export default App;




// // import logo from './logo.svg';
// import './App.css';
// // import SearchBar from "./"

// import ManufacturerTable from './components/manufacturers/manu';
// // import ManufacturerCatalog from './components/catelog/catelog';
// import VehicleTypeFilter from "./components/vehicles/vehicles"


// function App() {
//   return (
//     <div className="App">
//       <h1>VEHICLE MANUFACTURERS </h1>
//       <ManufacturerTable/>
//       {/* <VehicleTypeFilter/> */}
//       {/* <ManufacturerCatalog/> */}

//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//     </div>
//   );
// }

// export default App;



// // import logo from './logo.svg';
// // import './App.css';
// import React, {useState, useEffect } from "react";
// import ManufacturerTable from "./components/manufacturers/manu";
// // import SearchBar from "./components/Search/searchBar";
// // import FilteredDropdown from "./components/Filtered/FilteredDropdoen";
// // import ManufacturerCatalog from "./components/catelog/catelog";
// import ManufacturerDetailsModel from "./components/manufacturerDetail/manufaturerDetails";
// import VehicleTypeFilter from "./components/vehicles/vehicles";
// function App() {
//   const [manufacturers, setManufacturers] = useState([]);
//   const [filteredManufacturers, setFilteredManufaturers] = useState([]);
//   const [selectedManufacturer, setSelectedManufacturer] = useState(null);
//   // const [filterType, setFilterType] = useState("");

//   useEffect(() => {
//     fetch("https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json")
//     .then((response) => response.json())
//     .then((data) => {
//       setManufacturers(data.Results);
//       setFilteredManufaturers(data.Results);
//     });
//   }, []);

//   const handleSearch = (event) => {
//     const query = event.target.value.toLowerCase();
//     const filteredData =manufacturers.filter(
//       (manufacturer) =>
//         manufacturer.Mfr_Name.toLowerCase().includes(query) ||
//         manufacturer.Country.toLowerCase().includes(query) ||
//         manufacturer.VehicleTypeName.toLowerCase().includes(query)
//     );
//     setFilteredManufaturers(filteredData);
//   };

//   // const handleFilter = (event) => {
//   //   const filterValue = event.target.value;
//   //   // setFilterType(filterValue);
//   //   if(filterValue === "all"){
//   //     setFilteredManufaturers(manufacturers);
//   //   } else {
//   //     const filteredData = manufacturers.filter(
//   //       (manufacturer) => manufacturer.VehicleTypeName === filterValue
//   //     );
//   //     setFilteredManufaturers(filteredData);
//   //   }
//   // };

//   const hanleRowClick = (event, manufacturer) => {
//     event.preventDefault();
//     fetch(
//       `https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers/${manufacturer.Mfr_ID}?format=json`
//     )
//     .then((response) => response.json())
//     .then((data) => {
//       setSelectedManufacturer({
//         ...manufacturer,
//         Address: data.Results[0].Mfr_Address,
//         State: data.Results[0].Mfr_StateProvince,
//         Head: data.Results[0].Mfr_PrincipalFirstNameName,
//         Designation: data.Results[0].Mfr_PrincipalPosition,
//       });
//     });
//   };

//   const handleClose = () => {
//     setSelectedManufacturer(null)
//   }
//   return (
//     <div className="App">
//       <h1>Vehicle Manufacturers</h1>
//       {/* <SearchBar handleSearch={handleSearch} /> */}
//       <VehicleTypeFilter handleSearch={handleSearch} />
//         <ManufacturerTable
//           manufacturers={filteredManufacturers}
//           hanleRowClick={hanleRowClick}
//         />
//       {selectedManufacturer && (
//         <ManufacturerDetailsModel
//           manufacturer={selectedManufacturer}
//           handleClose={handleClose}
//         />
//       )}
//     </div>
//   );
// }

// export default App;