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
  const [previewSource, setPreviewSource] = useState('');
  const [currentPhoto, setCurrentPhoto] = useState('');
  const [photoCounter, setPhotoCounter] = useState(0);

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
      if (record.photos) {
        setCurrentPhoto(record.photos[photoCounter]);
      }
    }

    getRecord();

    return;
  }, [record.length, photoCounter]);

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

  // const uploadImage = async (base64EncodedImage, address) => {
  //   try {
  //     await fetch(`http://localhost:5000/landlord/upload`, {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         data: base64EncodedImage,
  //         // address: record.address,
  //       }),
  //       headers: { 'Content-type': 'application/json' },
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

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

  const handleAddReview = (
    username,
    review,
    score,
    dateMovedOut,
    base64EncodedImage
  ) => {
    const newReview = {
      photos: base64EncodedImage,
      review: {
        username: username,
        review: review,
        score: score,
        dateMovedOut: dateMovedOut,
      },
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
    return;
  };

  const addPhotoCounter = () => {
    if (photoCounter < record.photos.length - 1) {
      setPhotoCounter(photoCounter + 1);
    }
  };

  const subtractPhotoCounter = () => {
    if (photoCounter > 0) {
      setPhotoCounter(photoCounter - 1);
    }
  };

  if (fetched) {
    console.log(currentPhoto);
  }

  if (!fetched) {
    return <div></div>;
  } else {
    return (
      <div className="page-container">
        <h2>{record.address}</h2>
        <h2>{record.area}</h2>
        <h2>{record.postcode}</h2>
        {record.photos ? (
          <div className="pictures-container">
            <p onClick={subtractPhotoCounter} className="prev">
              &#10094;
            </p>
            <AdvancedImage cldImg={myImage} />
            <p onClick={addPhotoCounter} className="next">
              &#10095;
            </p>
          </div>
        ) : (
          <div>
            <h2 className="no-pics">
              No pictures, add a review and attach a picture
            </h2>
          </div>
        )}
        <button onClick={changeDisplay} className="add-rev-btn">
          Add a Review
        </button>
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
            <div className="input-item">
              <label htmlFor="review" className="review-label">
                {' '}
                Review:{' '}
                <textarea
                  type={'text'}
                  required
                  onChange={handleReviewChange}
                  rows={'3'}
                  cols={'50'}
                  id="review"
                  className="review-input"
                ></textarea>
              </label>
            </div>
            <div className="input-item">
              <label>
                {' '}
                Stars:{' '}
                <input
                  type={'number'}
                  min={1}
                  max={5}
                  onChange={handleScoreChange}
                  required
                ></input>
              </label>
            </div>
            <div className="input-item">
              <label>
                {' '}
                Date Moved Out:{' '}
                <input
                  type={'date'}
                  onChange={handleDateMovedOutChange}
                ></input>
              </label>
            </div>
            <div className="input-item">
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
                handleAddReview(
                  username,
                  review,
                  score,
                  dateMovedOut,
                  previewSource
                )
              }
              className="submit-btn"
              type="submit"
            >
              Submit Review
            </button>
          </form>
          {previewSource && (
            <div className="selected-pics-container">
              <p>Selected Pictures: </p>
              <img
                src={previewSource}
                alt="chosen file"
                style={{ height: '300px' }}
              />
            </div>
          )}
        </div>
        <h3>Most Recent Reviews</h3>

        {record.reviews[0] ? (
          <div className="review-container">
            {record.reviews.slice(0, sliceNumber).map((review) => (
              <p key={review.username}>
                <span style={{ fontWeight: '700' }}>{review.username}</span>{' '}
                says: "{review.review}" {review.score}
                <HiStar style={{ fontSize: '16px', color: 'gold' }} />
              </p>
            ))}
            <button onClick={changeSlice}>Show More Reviews</button>
          </div>
        ) : (
          <h3>No Reviews Yet</h3>
        )}
      </div>
    );
  }
};

export default AddressPage;
