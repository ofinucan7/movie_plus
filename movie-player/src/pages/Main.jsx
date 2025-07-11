import React from 'react'
import Header from '../components/Header'
import SlidingIcons from '../components/SlidingIcons'
import Greeter from '../components/Greeter'
import FeaturedMovie from '../components/FeaturedMovie'
import MainFooter from '../components/MainFooter'

const Main = () => {
  const user = localStorage.getItem("username");

  return (
    <div>
      <Header isLoggedIn={true} />
      <Greeter username={user} />
      <FeaturedMovie />
      <SlidingIcons section_message="Popular Now" category="popular" img_height={250} />
      <SlidingIcons section_message="Top Rated" category="top_rated" img_height={200} />
      <SlidingIcons section_message="Upcoming" category="upcoming" img_height={175} />
      <SlidingIcons section_message="Now Playing" category="now_playing" img_height={225} />
      <MainFooter />
    </div>
  );
};

export default Main;
