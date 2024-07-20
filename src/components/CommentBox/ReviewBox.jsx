import React from 'react'
import './ReviewBox.css'
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';


function ReviewBox() {
  return (
    <div className='review-box-container'>
        <p className='review-heading simple-heading'>Reviews</p>
        <div className="review-box">
          <div className="reviewer-photo">
            <Avatar 
              alt="Remy Sharp" 
              src="/static/images/avatar/1.jpg"
              sx={{ width: 60, height: 60 }}

            />
          </div>
          <div className="reviewer-details">
            <div className="name-and-time">
              <p className="reviewer-name">
                Hanna
              </p>
              <p className="review-time">
                5 Years ago
              </p>
            </div>
              <div className="reviewer-rating">
              <Box
              sx={{
                '& > legend': { mt: 3 },
                '.MuiRating-iconEmpty': {
                  color: '#f2f2f2',
                },
                '.MuiRating-iconFilled': {
                  color: '#e16120',
                },
              }}
            >
              <Rating
                name="read-only"
                value={4}
                readOnly
                precision={0.1}
              />
            </Box>
              </div>
            <p className='reviewer-comment'>
              Delicious and easy to make!! Will be making it again!
            </p>
          </div>
        </div>
    </div>
  )
}

export default ReviewBox