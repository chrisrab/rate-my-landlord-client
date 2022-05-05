import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { HiStar } from 'react-icons/hi';
import { Cloudinary } from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';
import { scale } from '@cloudinary/url-gen/actions/resize';

const AddressPage = () => {
  const { id } = useParams();
  const [fetched, setFetched] = useState(false);
  const [record, setRecord] = useState([]);
  const [sliceNumber, setSliceNumber] = useState(5);
  const [display, setDisplay] = useState('none');
  const [username, setUsername] = useState(null);
  const [review, setReview] = useState([]);
  const [score, setScore] = useState(null);
  const [dateMovedOut, setDateMovedOut] = useState(null);
  const [fileInput, setFileInput] = useState('');
  const [file, setFile] = useState('');
  const [previewSource, setPreviewSource] = useState('');
  const [currentPhoto, setCurrentPhoto] = useState('');

  //get individual address
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
      setCurrentPhoto(record.photos[0]);
    }

    getRecord();

    return;
  }, [record.length]);

  //Create cloudinary instance
  const cld = new Cloudinary({
    cloud: {
      cloudName: 'ratemylandlord',
    },
  });

  const myImage = cld.image(currentPhoto);

  myImage.resize(scale().width(600).height(300));

  //add review
  async function updateRecord(data) {
    const response = await fetch(
      `http://localhost:5000/landlord/update/${id}`,
      {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      }
    );

    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }

    return response.json();
  }

  const changeSlice = () => {
    setSliceNumber(sliceNumber + 10);
  };

  const changeDisplay = () => {
    if (display === 'none') {
      setDisplay('inline');
    } else {
      setDisplay('none');
    }
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleScoreChange = (event) => {
    setScore(event.target.value);
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleDateMovedOutChange = (event) => {
    setDateMovedOut(event.target.value);
  };

  const handleAddReview = (username, review, score, dateMovedOut) => {
    const newReview = {
      username: username,
      review: review,
      score: score,
      dateMovedOut: dateMovedOut,
    };

    updateRecord(newReview);
    console.log(previewSource);
  };

  const previewFile = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result);
    };
  };

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    previewFile(file);
  };

  const handleSubmitFile = (event) => {
    event.preventDefault();
    if (!previewSource) return;
    uploadImage(previewSource);
  };

  const uploadImage = async (base64EncodedImage, address) => {
    try {
      await fetch(`http://localhost:5000/landlord/upload`, {
        method: 'POST',
        body: JSON.stringify({
          data: base64EncodedImage,
          address: record.address,
        }),
        headers: { 'Content-type': 'application/json' },
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (fetched) {
    console.log(record.photos[0]);
  }

  if (!fetched) {
    return <div></div>;
  } else {
    return (
      <div className="page-container">
        <h2>{record.address}</h2>
        <h2>{record.area}</h2>
        <h2>{record.postcode}</h2>
        <div className="pictures-container">
          <AdvancedImage cldImg={myImage} />
        </div>
        <button onClick={changeDisplay}>Add a Review</button>
        <div style={{ display: display }}>
          <form onSubmit={handleSubmitFile}>
            <div>
              <label>
                {' '}
                Username:{' '}
                <input
                  type={'text'}
                  required
                  onChange={handleUsernameChange}
                ></input>
              </label>
            </div>
            <div>
              <label>
                {' '}
                Review:{' '}
                <input
                  type={'text'}
                  required
                  onChange={handleReviewChange}
                ></input>
              </label>
            </div>
            <div>
              <label>
                {' '}
                Score:{' '}
                <input
                  type={'number'}
                  min={1}
                  max={5}
                  onChange={handleScoreChange}
                  required
                ></input>
              </label>
            </div>
            <div>
              <label>
                {' '}
                Date Moved Out:{' '}
                <input
                  type={'date'}
                  onChange={handleDateMovedOutChange}
                ></input>
              </label>
            </div>
            <div>
              <label>
                {' '}
                Pictures:{' '}
                <input
                  type="file"
                  name="image"
                  onChange={handleFileInputChange}
                  value={fileInput}
                ></input>
              </label>
            </div>
            <button
              onClick={() =>
                handleAddReview(username, review, score, dateMovedOut)
              }
              type="submit"
            >
              Submit Review
            </button>
          </form>
          {previewSource && (
            <img
              src={previewSource}
              alt="chosen file"
              style={{ height: '300px' }}
            />
          )}
        </div>
        <h3>Most Recent Reviews</h3>
        <div>
          {record.reviews.slice(0, sliceNumber).map((review) => (
            <p key={review.username}>
              <span style={{ fontWeight: '500' }}>{review.username}</span> says:
              "{review.review}" {review.score}
              <HiStar style={{ fontSize: '16px' }} />
            </p>
          ))}
        </div>
        <button onClick={changeSlice}>Show More Reviews</button>
      </div>
    );
  }
};

export default AddressPage;
