import "./Pagination.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

function Pagination({
  currentPage,
  totalPage,
  handlePageChange,
  totalProducts,
  query,
  filtro,
  category,
}) {
  return (
    <div className="pagination-page">
      <div className="pagination">
        <button
          className="prev-pagination"
          onClick={() =>
            handlePageChange(currentPage - 1, query, category, filtro)
          }
          disabled={currentPage === 0}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>

        {Array.from({ length: totalPage }, (_, i) => i + 1)
          .filter(
            (n) =>
              n === 1 ||
              n === totalPage ||
              (n >= currentPage + 1 - 2 && n <= currentPage + 1 + 2)
          )
          .map((n, i, arr) => {
            const prev = arr[i - 1];
            const showDots = prev && n - prev > 1;

            return (
              <span key={n}>
                {showDots && <span className="dots-pagination">...</span>}
                <button
                  className="numbers-pagination"
                  onClick={() =>
                    handlePageChange(n - 1, query, category, filtro)
                  }
                  style={{
                    backgroundColor:
                      n === currentPage + 1 ? "#007bff" : "transparent",
                    color: n === currentPage + 1 ? "#fff" : "#000",
                  }}
                >
                  {n}
                </button>
              </span>
            );
          })}

        <button
          className="next-pagination"
          onClick={() =>
            handlePageChange(currentPage + 1, query, category, filtro)
          }
          disabled={currentPage + 1 === totalPage}
        >
          <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>

      <div className="total-products">
        <p>Total de produtos: {totalProducts}</p>
      </div>
    </div>
  );
}

export default Pagination;
