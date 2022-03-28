import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiStar } from 'react-icons/hi';

const Search = () => {
  const [records, setRecords] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [searchPosted, setSearchPosted] = useState(false);
  const [search, setSearch] = useState('');

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
      setSearchPosted(false);
    }

    getRecords();

    return;
  }, [searchPosted, records.length]);

  //Post search param to backend
  async function postSearch() {
    const response = await fetch(`http://localhost:5000/landlord/search`, {
      method: 'POST',
      body: JSON.stringify({ search: search }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    // if (!response.ok) {
    //   const message = `An error occurred: ${response.statusText}`;
    //   window.alert(message);
    //   return;
    // }

    // return response.json();
  }

  console.log(searchPosted);

  // const average = (array) => array.reduce((a, b) => a + b) / array.length;

  // const getReviewScore = (reviews) => {
  //   console.log(reviews);
  //   let arrayScore = [];
  //   reviews.forEach((element) => {
  //     arrayScore.push(element.score);
  //   });
  //   return average(arrayScore);
  // };

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

  const handleSearch = () => {
    postSearch();
    setSearchPosted(true);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  if (!fetched) {
    return <div></div>;
  } else {
    return (
      <div>
        <div>
          <input type="text" onChange={handleSearchChange}></input>{' '}
          <button onClick={handleSearch}>Search</button>
        </div>
        {records.map((record) => (
          <div key={record._id}>
            <Link
              to={`/${record._id}`}
              style={{ textDecoration: 'none', color: 'black' }}
            >
              <div className="record-card">
                <p className="card-text">{record.address}</p>
                <p className="card-text">{record.postcode}</p>
                <p className="card-text">{record.area}</p>
                <p className="card-text">{record.landlord}</p>
                {/* <p className="card-text">
                  <HiStar style={{ fontSize: '16px' }} />
                  {getReviewScore(record.reviews)}
                </p> */}
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
