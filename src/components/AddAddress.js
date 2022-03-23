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
  const handleAddAddress = () => {
    postRecord({ address: 'Chris' }).then((data) => {
      console.log(data);
    });
  };

  return (
    <div>
      <div>Add Address</div>
      <button onClick={handleAddAddress}>Add Address!</button>
    </div>
  );
};

export default AddAddress;
