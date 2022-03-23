import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiStar } from 'react-icons/hi';

const Search = () => {
  const [records, setRecords] = useState([]);
  const [fetched, setFetched] = useState(false);
  // const [hidden, setHidden] = useState('none')

  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`http://localhost:5000/landlord/`);

      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        window.alert(message);
        return;
      }

      const records = await response.json();

      if (Array.isArray(records)) {
        setRecords(records);
      } else {
        setRecords([records]);
      }

      setFetched(true);
    }

    getRecords();

    return;
  }, [records.length]);

  const average = (array) => array.reduce((a, b) => a + b) / array.length;

  const getReviewScore = (reviews) => {
    console.log(reviews);
    let arrayScore = [];
    reviews.forEach((element) => {
      arrayScore.push(element.score);
    });
    return average(arrayScore);
  };

  // const changeHidden = () => {
  //   if (hidden === 'none') {
  //     setHidden('inline')
  //   } else {
  //     setHidden('none')
  //   }
  // }

  // const changeShowReviews = () => {
  //   if (hidden === 'none') {
  //     return 'Show Reviews'
  //   } else {
  //     return 'Hide Reviews'
  //   }
  // }

  // if (fetched) {
  //   console.log(getReviews(records[0].reviews))
  // }

  // console.log(getReviews(records[0].reviews))

  if (!fetched) {
    return <div></div>;
  } else {
    return (
      <div>
        <div>
          <input type="text"></input>
        </div>
        {records.map((record) => (
          <div>
            <Link
              to={`/${record._id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <div className="record-card" key={record._id}>
                <p className="card-text">{record.address}</p>
                <p className="card-text">{record.postcode}</p>
                <p className="card-text">{record.area}</p>
                <p className="card-text">
                  <HiStar style={{ fontSize: '16px' }} />
                  {getReviewScore(record.reviews)}
                </p>
              </div>
            </Link>
            {/* <div>
                <button onClick={changeHidden} className="show-btn">
                  {changeShowReviews()}
                </button>
              </div>
              <div style={{ display: hidden }}>
                <p className="card-text">
                  Username: {record.reviews[0].username}, Length of Stay: {record.reviews[0].length_of_stay}, Date Moved
                  Out: {record.reviews[0].end_date}
                </p>
              </div> */}
          </div>
        ))}
      </div>
    );
  }
};

export default Search;
