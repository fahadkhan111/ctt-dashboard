import { useState } from "react";
import { complaintsData } from "../../dummyData/complaintsData";

function Complaint() {
  const [postsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const showData = () => {
    const indexOfLastPage = currentPage * postsPerPage;
    const indexOfFirstPage = indexOfLastPage - postsPerPage;
    const currentPosts = complaintsData.slice(
      indexOfFirstPage,
      indexOfLastPage
    );

    try {
      return currentPosts.map((item, index) => (
        <tbody key={index}>
          <tr className={` border-b  text-sm `}>
            <td className="px-6 py-4">
              {item.complaintId ? item.complaintId : "-"}
            </td>
            <td className="px-6 py-4">{item.category ? item.category : "-"}</td>
            <td className="px-6 py-4">
              {item.subCategory ? item.subCategory.toString() : "-"}
            </td>
            <td className="px-6 py-4">
              {item.createdOn ? item.createdOn.toString() : "-"}
            </td>
            <td className="px-6 py-4">
              {item.createdBy ? item.createdBy.toString() : "-"}
            </td>
            <td className="px-6">
              {item.source ? item.source.toString() : "-"}
            </td>
            <td className="px-6 py-4">
              <h3
                className={`rounded-3xl px-2 py-1 text-xs text-center font-bold text-white ${
                  item.Status === "Pending"
                    ? "bg-red"
                    : item.Status === "In Process"
                    ? "bg-yellow-500"
                    : item.Status === "Resolved"
                    ? "bg-green-500"
                    : "bg-gray-500" // Default color for unknown statuses
                }`}
              >
                {item.Status ? item.Status.toString() : "-"}
              </h3>
            </td>
          </tr>
        </tbody>
      ));
    } catch (e) {
      alert(e.message);
    }
  };

  const showPagination = () => {
    const pageNumbers = [];
    const totalPosts = complaintsData.length;
    const maxPageNumbers = 4; // Maximum number of page numbers to display
    const numbersBeforeEllipsis = Math.floor((maxPageNumbers - 2) / 2);
    const numbersAfterEllipsis = Math.ceil((maxPageNumbers - 2) / 2);

    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }

    const pagination = (number) => {
      setCurrentPage(number);
    };

    const goToNextPage = () => {
      if (currentPage < pageNumbers.length) {
        setCurrentPage(currentPage + 1);
      }
    };

    const goToPreviousPage = () => {
      if (currentPage > 1) {
        setCurrentPage(currentPage - 1);
      }
    };

    // Determine which page numbers to display
    let displayedPageNumbers = [];
    if (pageNumbers.length <= maxPageNumbers) {
      displayedPageNumbers = pageNumbers;
    } else {
      if (currentPage <= numbersBeforeEllipsis + 1) {
        displayedPageNumbers = [
          ...pageNumbers.slice(0, maxPageNumbers - 1),
          "...",
          pageNumbers.length,
        ];
      } else if (currentPage >= pageNumbers.length - numbersAfterEllipsis) {
        displayedPageNumbers = [
          1,
          "...",
          ...pageNumbers.slice(pageNumbers.length - (maxPageNumbers - 2)),
        ];
      } else {
        const startIndex = currentPage - numbersBeforeEllipsis - 1;
        const endIndex = currentPage + numbersAfterEllipsis - 1;
        displayedPageNumbers = [
          1,
          "...",
          ...pageNumbers.slice(startIndex, endIndex),
          "...",
          pageNumbers.length,
        ];
      }
    }

    return (
      <nav aria-label="Page navigation example">
        <ul className="flex items-center  -space-x-px h-8 text-sm">
          <li onClick={goToPreviousPage}>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 "
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </a>
          </li>
          {displayedPageNumbers.map((number, index) => (
            <li
              key={index}
              onClick={() => pagination(number)}
              className={
                currentPage === number
                  ? "flex items-center justify-center px-3 h-8 bg-gray-100 text-gray-700 cursor-pointer border border-gray-300"
                  : number === "..."
                  ? "flex items-center justify-center px-3 h-8 cursor-pointer border border-gray-300"
                  : "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 cursor-pointer"
              }
            >
              {number === "..." ? (
                <span>...</span>
              ) : (
                <button className="page-link"> {number} </button>
              )}
            </li>
          ))}
          <li onClick={goToNextPage}>
            <a
              href="#"
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 "
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-2.5 h-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </a>
          </li>
        </ul>
      </nav>
    );
  };

  return (
   <>
    <div
      className={`relative overflow-x-auto shadow-md sm:rounded-lg grid gap-3 text-gray-700`}
    >
      <table className="w-full text-sm text-left  min-w-[1000px]">
        <thead className="text-xs  ">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-sm text-[#7E7E7E] font-medium"
            >
              Complaint ID
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center text-sm text-[#7E7E7E] font-medium">
                <a href="#">
                  <svg
                    className="w-3 h-3 ml-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
                Category
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center text-sm text-[#7E7E7E] font-medium">
                <a href="#">
                  <svg
                    className="w-3 h-3 ml-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
                Sub-Category
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center text-sm text-[#7E7E7E] font-medium">
                {" "}
                <a href="#">
                  <svg
                    className="w-3 h-3 ml-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
                Created On
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center text-sm text-[#7E7E7E] font-medium">
                {" "}
                <a href="#">
                  <svg
                    className="w-3 h-3 ml-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
                Created By
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center text-sm text-[#7E7E7E] font-medium">
                <a href="#">
                  <svg
                    className="w-3 h-3 ml-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
                Source
              </div>
            </th>
            <th scope="col" className="px-6 py-3">
              <div className="flex items-center text-sm text-[#7E7E7E] font-medium">
                {" "}
                <a href="#">
                  <svg
                    className="w-3 h-3 ml-1.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                  </svg>
                </a>
                Status
              </div>
            </th>
          </tr>
        </thead>
        {showData()}
      </table>
    </div>
      <div className="py-10 px-5 w-full flex flex-col gap-5 mx-auto">
        <p className="pl-2 text-sm text-[#7E7E7E]">
          {complaintsData.length} Dashboards
        </p>

        <div className="">{showPagination()}</div>
      </div>
   </>
  );
}

export default Complaint;
