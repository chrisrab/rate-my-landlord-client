import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HiStar } from 'react-icons/hi';

const AddressPage = () => {
  const { id } = useParams();
  const [fetched, setFetched] = useState(false);
  const [record, setRecord] = useState([]);
  const [sliceNumber, setSliceNumber] = useState(5);

  useEffect(() => {
    async function getRecord() {
      const response = await fetch(`http://localhost:5000/landlord/${id}`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const record = await response.json();
      setRecord(record);
      setFetched(true);
    }

    getRecord();

    return;
  }, [record.length]);

  const changeSlice = () => {
    setSliceNumber(sliceNumber + 10);
  };

  console.log(id);
  console.log(record);
  console.log(sliceNumber);

  if (!fetched) {
    return <div></div>;
  } else {
    return (
      <div className="page-container">
        <h2>{record.address}</h2>
        <h2>{record.area}</h2>
        <h1>pictures</h1>
        <button>Add a Review</button>
        <h3>Most Recent Reviews</h3>
        {/* <div>
          {record.reviews.slice(0, sliceNumber).map((review) => (
            <p>
              <span style={{ fontWeight: '500' }}>{review.username}</span> says: "{review.review}"{' '}
              <HiStar style={{ fontSize: '16px' }} />
              {review.score}
            </p>
          ))}
        </div> */}
        <button onClick={changeSlice}>Show More Reviews</button>
      </div>
    );
  }
};

export default AddressPage;
