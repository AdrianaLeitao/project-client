import React from 'react';
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function MemoriesPage() {

  return (    
  <><h3>Memories</h3>

<div class="w-64 carousel rounded-box">
  <div class="carousel-item w-full">
    <img src="/DSC_0142.JPG" class="w-full" alt="Tailwind CSS Carousel component" height="250px" />
    <Link to="/viewsGames">
    <div class="btn-group btn-group-vertical">
      <button class="btn btn-active">Games</button>
    </div>
    </Link>
  </div> 
</div>

<div class="w-64 carousel rounded-box">
  <div class="carousel-item w-full">
    <img src="/66780144_2437986126267928_1054547645218947072_n.jpg" class="w-full" alt="Tailwind CSS Carousel component" height="250px" />
    <Link to="/viewsDance">
    <div class="btn-group btn-group-vertical">
      <button class="btn btn-active">Dances</button>
    </div>
    </Link>
  </div> 
</div>
</>
  )
}

export default MemoriesPage