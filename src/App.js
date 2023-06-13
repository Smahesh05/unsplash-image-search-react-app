import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";
import { Button, Form } from "react-bootstrap";
import Image from "./components/Image";

const URL_API = "https://api.unsplash.com/search/photos";
const IMAGE_PER_PAGE = 20;

function App() {
  const searchRef = useRef(null);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [erroeMsg, setErrorMsg] = useState("");

  const getData = useCallback(async () => {
    try {
      if (searchRef.current.value) {
        setErrorMsg("");
        const data = await fetch(
          `${URL_API}?query=${searchRef.current.value}&page=${page}&per_page=${IMAGE_PER_PAGE}&client_id=${process.env.REACT_APP_API}`
        );
        const res = await data.json();
        setImages(res.results);
        console.log(res.results);
        setTotalPage(res.total_pages);
      }
    } catch (error) {
      setErrorMsg("failed to loadData");
      console.log(error);
    }
  }, [page]);

  useEffect(() => {
    getData();
  }, [getData, page]);

  const resetSearch = () => {
    setPage(1);
    getData();
  };

  const onSubmit = (e) => {
    e.preventDefault();
    resetSearch();
  };

  const handleSelection = (selection) => {
    searchRef.current.value = selection;
    resetSearch();
  };

  return (
    <div className="container">
      <h1 className="title">Hello</h1>
      {erroeMsg && <p>{erroeMsg} </p>}
      <div className="search-section">
        <Form onSubmit={onSubmit}>
          <Form.Control
            type="search"
            ref={searchRef}
            className="search-input"
            placeholder="search image..."
          />
        </Form>
      </div>
      <div className="button-wrapper">
        <Button size={"sm"} onClick={() => handleSelection("nature")}>
          Nature
        </Button>
        <Button size={"sm"} onClick={() => handleSelection("birds")}>
          Birds
        </Button>
        <Button size="sm" onClick={() => handleSelection("cats")}>
          Cats
        </Button>
        <Button size={"sm"} onClick={() => handleSelection("shoes")}>
          Shoes
        </Button>
      </div>
      <div className="image-wrapper">
        {images.map((image) => (
          <Image key={image.id} image={image} />
        ))}
      </div>
      <div className="button-wrapper">
        {page > 1 && (
          <Button onClick={() => setPage(page - 1)}>Previous</Button>
        )}
        {page < totalPage && (
          <Button size="sm" onClick={() => setPage(page + 1)}>
            Next
          </Button>
        )}
      </div>
    </div>
  );
}

export default App;
