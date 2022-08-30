import React from 'react';
import { Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

function MemoriesPage() {
  return (    
  <><h3>Memories</h3>

  <div class="card w-96 bg-base-100 shadow-xl image-full">
  <figure><img src="../public/66780144_2437986126267928_1054547645218947072_n.jpg" alt="traditional-games" /></figure>
  <div class="card-body">
    <div class="card-actions justify-end">
        <Link to="/api/games">
          <button class="btn btn-primary">Games</button>
        </Link>
    </div>
  </div>
</div>

  <div class="card w-96 bg-base-100 shadow-xl image-full">
  <figure><img src="../public/66780144_2437986126267928_1054547645218947072_n.jpg" alt="traditional-dances" /></figure>
  <div class="card-body">
    <div class="card-actions justify-end">
        <Link to="/api/dance">
          <button class="btn btn-primary">Dances</button>
        </Link>
    </div>
  </div>
</div>
</>
  )
}

export default MemoriesPage