
import React, { useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEye, faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import './ReusableTable.css';

const ReusableTable = ({
  headers,
  data,
  onEdit,
  onUpdate,
  update,
  onDelete,
  onAddMenu,
  onViewDetails
}) => {
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortedColumn, setSortedColumn] = useState(null);
  // const handleSort = (column) => {
  //   setSortOrder(
  //     column === sortedColumn ? (sortOrder === 'asc' ? 'desc' : 'asc') : 'asc'
  //   );
  //   setSortedColumn(column);
  // };

  // Newly added the HandleSort:---------------- Refer the above code if any issue in HandleSort:;----

  const handleSort = (column) => {
    let newSortOrder;

    if (column === sortedColumn) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    } else {
      newSortOrder = 'asc';
    }
    setSortOrder(newSortOrder);
    setSortedColumn(column);
  };
  const mapHeaderToProperty = (header) => {
    switch (header) {
      case 'Menu Name':
        return 'name';
      case 'Name':
        return 'name';
      case 'Price':
        return 'price';
      case 'Customer':
        return 'customer';
      case 'Restaurant ID':
        return '_id';
      case 'Restaurant Branch':
        return 'restaurantBranch';
      default:
        return header.toLowerCase();
    }
  };
  const renderTableData = () => {
    const sortedData = data.slice().sort((a, b) => {
      if (sortedColumn === 'name') {
        const fullNameA = `${a.name} ${a.lastName}`;
        const fullNameB = `${b.name} ${b.lastName}`;
        return sortOrder === 'asc'
          ? fullNameA.localeCompare(fullNameB)
          : fullNameB.localeCompare(fullNameA);
      }
      if (sortedColumn === 'price') {
        return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
      }
      // if (sortedColumn === 'restaurantBranch') {
      //   return sortOrder === 'asc'
      //     ? a.restaurantBranch.localeCompare(b.restaurantBranch)
      //     : b.restaurantBranch.localeCompare(a.restaurantBranch);
      // }
      if (sortedColumn === 'customer') {
        return sortOrder === 'asc'
          ? a.shipping.name.localeCompare(b.shipping.name)
          : b.shipping.name.localeCompare(a.shipping.name);
      }
      if (sortedColumn === 'role') {
        return sortOrder === 'asc'
          ? a.role.localeCompare(b.role)
          : b.role.localeCompare(a.role);
      }
      return 0;
    });

    return sortedData.map((item, i) => (
      <tr className='bg-white' style={{ backgroundColor: 'white' }} key={item._id}>
        {headers.map((header) => {
          if (header === 'Sl No') {
            return (
              <td key={header}>
                <p className='text-black' id="CardText">{i + 1}</p>
              </td>
            );
          }
          if (header === 'Restaurant Address') {
            return (
              <td key={header}>
                <p  className='text-black' id="CardText">
                  {item.address.line1}, {item.address.line2},{' '}
                  {item.address.city}, {item.address.state},{' '}
                  {item.address.postalCode}, {item.address.country}
                </p>
              </td>
            );
          }
          if (header === 'Order ID') {
            return (
              <td key={header}>
                <p  className='text-black' id="CardText">{item.orderId}</p>
              </td>
            );
          }
          if (header === 'Carousal Image') {
            return (
              <td key={header}>
                <img
                  src={item.images[0].image}
                  alt="Carousel"
                  style={{ width: '75px', height: 'auto' }}
                />
              </td>
            );
          }
          if (header === 'Carousal Text') {
            return (
              <td key={header}>
                {' '}
                <p  className='text-black' id="CardText">{item.text}</p>
              </td>
            );
          }
          if (header === 'Branch ID') {
            return (
              <td key={header}>
                {' '}
                <p  className='text-black' id="CardText">{item.restaurantId}</p>
              </td>
            );
          }
          if (header === 'Restaurant Branch ID') {
            return (
              <td key={header}>
                {' '}
                <p  className='text-black' id="CardText">{item.restaurantName}</p>
              </td>
            );
          }
          if (header === 'Opening Hours') {
            return (
              <td key={header}>
                {' '}
                <p  className='text-black' id="CardText">{item.openingHours}</p>
              </td>
            );
          }
          if (header === 'Restaurant Branch') {
            return (
              <td key={header} onClick={() => handleSort('restaurantBranch')}>
                <p  className='text-black' id="CardText">{item.restaurantBranch} </p>
              </td>
            );
          }
          if (header === 'User ID') {
            return (
              <td key={header}>
                {' '}
                <p  className='text-black' id="CardText">{item._id}</p>
              </td>
            );
          }
          if (header === 'Status') {
            return (
              <td key={header}>
                {' '}
                <p  className='text-black' id="CardText">{item.orderStatus}</p>{' '}
              </td>
            );
          }
          if (header === 'Pickup/Delivery Time') {
            return (
              <td key={header}>
                {' '}
                <p  className='text-black' id="CardText">{item.selectedTimeSlot}</p>
              </td>
            );
          }
          if (header === 'Order Date') {
            return (
              <td key={header}>
                {' '}
                <p  className='text-black' id="CardText">{item.createdAt}</p>
              </td>
            );
          }
          if (header === 'Phone No') {
            return (
              <td key={header}>
                {' '}
                <p  className='text-black' id="CardText">{item.shipping.phone}</p>
              </td>
            );
          }
          if (header === 'Email Address') {
            return (
              <td key={header}>
                {' '}
                <p  className='text-black' id="CardText">{item.shipping.email}</p>
              </td>
            );
          }
          if (header === 'Category') {
            return (
              <td key={header}>
                <p  className='text-black' id="CardText">
                  {' '}
                  <b>MealType: </b> {item.mealTypeCategory},
                </p>
                <p  className='text-black' id="CardText">
                  {' '}
                  <b>Dietary Preference: </b> {item.dietaryPreferenceCategory}
                </p>
              </td>
            );
          }
          if (header === 'Menu Name') {
            return (
              <td key={header} onClick={() => handleSort('name')}>
                <p className='text-black' id="CardText"> {item.name} </p>
              </td>
            );
          }
          if (header === 'Name') {
            return (
              <div
                style={{
                  backgroundColor: 'white',
                  border: 'none',
                  display: 'flex',
                  justifyContent: 'center'
                }}
              >
                <td
                  style={{ border: 'none', width: '100px' }}
                  key={header}
                  onClick={() => handleSort('name')}
                >
                  <p id="CardText">
                    {' '}
                    {item.name} {item.lastName}
                  </p>
                </td>
              </div>
            );
          }
          if (header === 'Role') {
            return (
              <td key={header} onClick={() => handleSort('role')}>
                <p id="CardText"> {item.role} </p>
              </td>
            );
          }
          if (header === 'Customer') {
            return (
              <td key={header} onClick={() => handleSort('customer')}>
                <p id="CardText"> {item.shipping.name} </p>
              </td>
            );
          }
          // return <td key={header}> <p id="CardText">{item[header.toLowerCase()] || 'N/A'}</p></td>;
          return (
            <td key={header}>
              <p id="CardText">{item[header.toLowerCase()] || 'N/A'}</p>
            </td>
          );
        })}
        {onUpdate && (
          <td>
            <Button
              className=" btn my-3 px-4 btn border border-danger rounded bg-white text-black "
              onClick={() => onUpdate(item._id)}
            >
              <FontAwesomeIcon icon={faEdit} />
            </Button>
          </td>
        )}
        {update && (
          <td>
            <Button
              className="btn my-3 px-4 btn border border-danger rounded bg-white text-black"
              onClick={() => update(item._id)}
            >
              Update
            </Button>
          </td>
        )}
        {onEdit && (
          <td>
            <Button
              className="btn my-3 px-4 btn border border-danger rounded bg-white text-black"
              onClick={() => onEdit(item._id)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </td>
        )}

        {onDelete && (
          <td>
            <Button
              className="btn my-3 px-4 btn border border-danger rounded bg-white text-black"
              onClick={() => onDelete(item._id)}
            >
              <FontAwesomeIcon icon={faTrash} />
            </Button>
          </td>
        )}
        {onViewDetails && (
          <td>
            <Button
              className="btn my-3 px-4 btn border border-danger rounded bg-white text-black"
              onClick={() => onViewDetails(item._id)}
            >
              <FontAwesomeIcon icon={faEye} />
            </Button>
          </td>
        )}
        {onAddMenu && (
          <td>
            <Button
              className="btn my-3 px-4 btn border border-danger rounded bg-white text-black"
              onClick={() => onAddMenu(item._id)}
            >
              Add Menu
            </Button>
          </td>
        )}
      </tr>
    ));
  };

  return (
    <div>
      <Table bordered responsive className=" mt-4 text-center w-100 Cardimg123">
        <thead className="table-head bg-white">
          <tr>
            {headers.map((header) => (
              <th
                id="CardText "
                key={header}
                onClick={() => handleSort(mapHeaderToProperty(header))}
              >
                {header}
              </th>
            ))}
            {onEdit && <th>Update</th>}
            {onUpdate && <th> Update</th>}
            {update && <th> View</th>}
            {onViewDetails && <th> View</th>}
            {onDelete && <th>Delete</th>}
            {onAddMenu && <th>Add Menu</th>}
          </tr>
        </thead>
        <tbody>{renderTableData()}</tbody>
      </Table>
    </div>
  );
};
ReusableTable.propTypes = {
  headers: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  onEdit: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onAddMenu: PropTypes.func.isRequired,
  onViewDetails: PropTypes.func.isRequired
};
export default ReusableTable;
