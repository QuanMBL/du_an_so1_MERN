import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import './search.scss'
const SearchPage = () => {
  const [results, setResults] = useState([]);
  const location = useLocation();

  const query = new URLSearchParams(location.search);
  const keyword = query.get("keyword");

  useEffect(() => {
    if (keyword) {
      // Gọi API tìm kiếm ở đây
      fetch(`http://localhost:7000/api/products/search?name=${keyword}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => console.error(err));
    }
  }, [keyword]);

  return (
    <div className="container">
      <h2>Kết quả tìm kiếm cho: {keyword}</h2>
      <div className="product-list">
        {results.length > 0 ? (
          results.map((product) => (
            <div key={product._id} className="product-card">
              <img src={`/${product.image}`} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.price} VND</p>
            </div>
          ))
        ) : (
          <p>Không tìm thấy sản phẩm nào.</p>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
