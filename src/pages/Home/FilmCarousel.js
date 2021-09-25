import React from 'react';
import { Carousel } from 'antd';

export default function FilmCarousel() {
  const contentStyle = {
    height: '500px',
    color: '#fff',
    lineHeight: '500px',
    textAlign: 'center',
    background: '#364d79',
  };
  return (
    <Carousel autoplay={true} effect="fade">
      <div>
        <h3 style={contentStyle}>
          <img
            style={{ width: '100%', height: '500px' }}
            src="https://sg-test-11.slatic.net/shop/ea1703609f4ca9c77790f45097185cdd.jpeg"
            alt=""
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img
            style={{ width: '100%', height: '500px' }}
            src="https://cdn.shopify.com/s/files/1/0318/9977/9205/files/banner-it.jpg"
            alt=""
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img
            style={{ width: '100%', height: '500px' }}
            src="https://photo-cms-nghenhinvietnam.zadn.vn/Uploaded/trunghieu/2021_07_30/Aquaman_and_the_Lost_Kingdom_Title_Explained_SR_AZUP.jpg"
            alt=""
          />
        </h3>
      </div>
      <div>
        <h3 style={contentStyle}>
          <img
            style={{ width: '100%', height: '500px' }}
            src="https://film-book.com/wp-content/uploads/2011/05/x-men-first-class-x-men-hellfire-club-movie-banner-01.jpg"
            alt=""
          />
        </h3>
      </div>
    </Carousel>
  );
}
