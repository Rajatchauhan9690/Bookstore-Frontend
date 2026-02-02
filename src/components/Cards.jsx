import React from "react";

function Cards({ item }) {
  return (
    <div className="my-1 p-1">
      <div className="bg-base-100 shadow-lg hover:scale-102 duration-200 w-full max-w-md mx-auto rounded-2xl">
        <figure className="pt-4">
          <img
            src={item.image}
            alt={item.name}
            className="h-auto w-full object-cover sm:h-[80px] md:h-[150px] lg:h-[200px]"
          />
        </figure>
        <div className="card-body px-4 pb-4">
          <h2 className="card-title text-md font-semibold flex justify-between items-center">
            <span className="line-clamp-1">{item.name}</span>
            <div className="badge badge-secondary">{item.category}</div>
          </h2>

          <p className="text-sm line-clamp-1">{item.title}</p>
          <div className="card-actions justify-between mt-4 items-center">
            <div className="badge badge-outline text-sm">${item.price}</div>
            <button className="text-sm cursor-pointer badge badge-outline hover:bg-pink-500 hover:text-black hover:border hover:border-black">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cards;
