import { useState, useEffect } from 'react';

async function postRecord(data) {
  const response = await fetch(`http://localhost:5000/landlord/add`, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    const message = `An error occurred: ${response.statusText}`;
    window.alert(message);
    return;
  }

  return response.json();
}

const AddAddress = () => {
  const [address, setAddress] = useState('455 S. Main St.');
  const [postcode, setPostcode] = useState('B36');
  const [area, setArea] = useState('Brampton');
  const [landlord, setLandlord] = useState('John Doe');

  const handleAddAddress = (address, postcode, area, landlord) => {
    postRecord({
      address: address,
      postcode: postcode,
      area: area,
      landlord: landlord,
      reviews: [],
    }).then((data) => {
      console.log(data);
    });
    console.log(address);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleAreaChange = (event) => {
    setArea(event.target.value);
  };

  const handlePostcodeChange = (event) => {
    setPostcode(event.target.value);
  };

  const handleLandlordChange = (event) => {
    setLandlord(event.target.value);
  };

  return (
    <div>
      <div>Add Address</div>
      <div>
        <p>Address</p>
        <input type={'text'} onChange={handleAddressChange} required></input>
      </div>
      <div>
        <p>Area</p>
        <input type={'text'} onChange={handleAreaChange} required></input>
      </div>
      <div>
        <p>Postcode</p>
        <input type={'text'} onChange={handlePostcodeChange} required></input>
      </div>
      <div>
        <p>Landlord</p>
        <input type={'text'} onChange={handleLandlordChange} required></input>
      </div>
      <button
        onClick={() => handleAddAddress(address, postcode, area, landlord)}
      >
        Add Address!
      </button>
    </div>
  );
};

export default AddAddress;
