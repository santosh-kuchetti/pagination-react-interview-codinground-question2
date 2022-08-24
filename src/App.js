import "./styles.css";
import { useEffect, useState } from "react";
import axios from "axios";
export default function App() {
  const [todos, setTodos] = useState([]);
  /*
    todosPerPage here means we want to show some number of data.

  */
  const [todosPerPage, setPages] = useState(10);
  /*
    totalPages are the number of pages.
    so that we can have trackon page numbers.
  */
  const totalPages = Math.ceil(todos.length / todosPerPage);
  /*
    Array(totalPages) means Array(20).
    it will create an array of size 10 and all values are undefined.
    index starting from 0-9 means 10 elements.
    to our convinient we add 1 to the todosPerPage sothat
    the index in range b/w 0-10. 
    Array(todosPerPage + 1).keys() will give us an array
    Array(todosPerPage + 1) gives [undefined,undefined..........,undefined]. indeses are randing from 0-11;
    
    in the above array values are undefines but the keys are index values.
    Array(todosPerPage + 1).keys() will give us indexes of the array will give us the indexes as values

    we are spreading them in an array with finally gives us [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    we need 1-10 values for showing our pages.
    for that we slice fron index 1 which finally gives us [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
    now, pages = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
  */
  const pages = [...Array(totalPages + 1).keys()].slice(1);
  const [currentPage, setCurrentPage] = useState(1);
  /*
    we will have two indexes,
    lets say we clicked page 4, then we should have the the todos between
    30-40 so, lastIndex = currentPage * todosPerPage
    and lastIndex = (currentPage * todosPerPage) - todosPerPage
  */
  const lastIndex = currentPage * todosPerPage;
  const firstIndex = lastIndex - todosPerPage;
  /*
    getting the array from between firstIndex and lastIndex is achieved by slicing from the todos array.
  */
  const visibleArr = todos.slice(firstIndex, lastIndex);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((res) => setTodos(res.data));
  }, []);

  const handlePrev = (e) => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = (e) => {
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <select
        onChange={(e) => {
          setPages(e.target.value);
        }}
      >
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="30">30</option>
      </select>

      <div className="App">
        <br />
        {visibleArr.map((ele, i) => (
          <div key={i}>{ele.title}</div>
        ))}
        <br />
        <span onClick={handlePrev}>{`${currentPage === 1 ? "" : "Prev"}`}</span>
        <div>
          {pages.map((ele) => (
            <span
              key={ele}
              className={`${currentPage === ele ? "active" : ""}`}
              onClick={() => {
                setCurrentPage(ele);
              }}
            >{`${ele} | `}</span>
          ))}
        </div>
        <span onClick={handleNext}>{`${
          currentPage === totalPages ? "" : "Next"
        }`}</span>
      </div>
    </>
  );
}
