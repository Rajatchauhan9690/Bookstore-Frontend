import React, { useEffect, useState } from "react";
import axios from "axios";
import Cards from "./Cards";

function Freebook({ searchTerm }) {
  const [book, setBook] = useState([]);

  useEffect(() => {
    const getBook = async () => {
      try {
        const res = await axios.get(
          "https://bookstorees-backend.onrender.com/api/v1/books/book",
        );
        // console.log(res);

        const data = res.data.filter((data) => data.category === "free");
        console.log(data);

        setBook(data);
      } catch (error) {
        console.log(error);
      }
    };
    getBook();
  }, []);

  const filteredBooks = book.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-screen-2xl container mx-auto md:px-20 px-4">
      <div>
        <h1 className="font-semibold text-xl pb-2">Free Offered Courses</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium
          veritatis alias pariatur ad dolor repudiandae eligendi corporis nulla
          non suscipit, iure neque earmm?
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-2">
        {filteredBooks.map((item) => (
          <Cards key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default Freebook;
