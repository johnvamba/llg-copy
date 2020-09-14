import React from 'react';
import { useSelector } from 'react-redux';

const Pagination = ({
    records = [],
    currentPage,
    onChangePage
}) => {
    const isFirstPage = () => {
        return currentPage > 1;
    };

    const isLastPage = () => {
        return currentPage + 1 <= records.length;
    };

    const dsplyBtn = () => {
        let n = records.length;
        let i = currentPage;

        if (n <= 9) {
            return (n => {
                const arr = Array(n);
                while (n) {
                    arr[n - 1] = n--;
                }

                return arr;
            })(n);
        }

        if (i <= 5) return [1, 2, 3, 4, 5, 6, 7, 0, n];
        if (i >= n - 4) return [1, 0, n - 6, n - 5, n - 4, n - 3, n - 2, n - 1, n];

        return [
            1, 0, currentPage - 2, currentPage - 1, currentPage, currentPage + 1,
            currentPage + 2, 0, n
        ];
    }

    const handleChangPage = page => {
        onChangePage(page);
    }

    return (
        <ul className="flex flex-row mt-4">
            {isFirstPage() &&
                <li>
                    <button className="px-2" onClick={() => handleChangPage(currentPage-1)}>
                        <i className="fa fa-arrow-left"></i>
                    </button>
                </li>
            }

            {dsplyBtn()
                .map((btn, index) => (
                    <li key={`${btn}.${index}`}>
                        {btn ? (
                            <button className={`px-2 ${currentPage == btn ? "text-blue-500" : ""}`} onClick={() => handleChangPage(btn)}>
                                {btn}
                            </button>
                        ) : (
                                <i className="font-semibold fas fa-ellipsis-h"></i>
                            )
                        }
                    </li>
                ))
            }

            {isLastPage() &&
                <li>
                    <button className="px-2" onClick={() => handleChangPage(currentPage + 1)}>
                        <i className="fa fa-arrow-right"></i>
                    </button>
                </li>
            }
        </ul>
    )
}

export default Pagination;