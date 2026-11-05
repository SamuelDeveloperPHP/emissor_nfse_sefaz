import React, { useEffect } from "react";
import { Button, Row } from "react-bootstrap";

const Pagination = ({ data, currentPage, setCurrentPage, perPageData }:any) => {


    const handleClick = (e:any) => {
        setCurrentPage(e);
    };

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data?.length / perPageData); i++) {
        pageNumbers.push(i);
    }
    const handleprevPage = () => {
        let prevPage = currentPage - 1;
        setCurrentPage(prevPage);
    };
    const handlenextPage = () => {
        let nextPage = currentPage + 1;
        setCurrentPage(nextPage);
    };

    useEffect(() => {
        if (pageNumbers.length && pageNumbers.length < currentPage) {
            setCurrentPage(pageNumbers.length)
        }
    }, [pageNumbers.length, currentPage, setCurrentPage])
    return (
        <React.Fragment>
            <Row className="g-0 justify-content-end mb-4">
                <div className="col-sm-auto">
                    <ul className="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                        {currentPage <= 1 ? (
                             <Button variant="link" className="page-item pagination-prev disabled">
                             Previous
                         </Button>
                        ) :
                            <li className={currentPage <= 1 ? "page-item disabled" : "page-item"}>
                                  <Button variant="link" className="page-link" onClick={handleprevPage}>Previous</Button>
                            </li>
                        }
                        {pageNumbers.map((item, key) => (
                            <React.Fragment key={key}>
                                <li className="page-item">
                                <Button variant="link" className={currentPage === item ? "page-link active" : "page-link"} onClick={() => handleClick(item)}>{item}</Button>
                                </li>
                            </React.Fragment>
                        ))}
                        {currentPage >= pageNumbers.length ? (
                            <Button variant="link" className="page-item pagination-next disabled">

                            Next
                        </Button>
                        ) :
                            <li className={currentPage <= 1 ? "page-item disabled" : "page-item"}>
                                <Button variant="link" className="page-link" onClick={handlenextPage}>Next</Button>
                            </li>
                        }
                    </ul>
                </div>
            </Row>
        </React.Fragment>
    );
}

export default Pagination;