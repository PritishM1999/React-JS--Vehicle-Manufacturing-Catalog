import React from 'react';
import PropTypes from 'prop-types';
import './ManufacturerTable.css';

const ManufacturerTable = ({ manufacturers, handleRowClick }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Country</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {manufacturers.map(manufacturer => (
          <tr key={manufacturer.ID} onClick={() => handleRowClick(manufacturer.ID)}>
            <td>{manufacturer.Name}</td>
            <td>{manufacturer.Country}</td>
            <td>{manufacturer.Type}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

ManufacturerTable.propTypes = {
  manufacturers: PropTypes.array.isRequired,
  handleRowClick: PropTypes.func.isRequired,
};

export default ManufacturerTable;


// import React from 'react';
// import './ManufacturerTable.css';

// function ManufacturerTable({ manufacturers, handleRowClick }) {
//   return (
//     <table>
//       <thead>
//         <tr>
//           <th>Name</th>
//           <th>Country</th>
//           <th>Type</th>
//         </tr>
//       </thead>
//       <tbody>
//         {manufacturers.map((manufacturer) => (
//           <tr key={manufacturer.Mfr_ID} onClick={() => handleRowClick(manufacturer.Mfr_ID)}>
//             <td>{manufacturer.Mfr_Name}</td>
//             <td>{manufacturer.Country}</td>
//             <td>{manufacturer.VehicleTypeName}</td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   );
// }

// export default ManufacturerTable;
