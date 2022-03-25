import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

function Pagination({ totalPage, currentPage, handleSetPage }) {
    const [item, setItem] = useState([])
    

    useEffect(() => {
        if (totalPage > 0) {
            let temp;
            if (totalPage < 8) {
                let i = 1
                temp = (new Array(totalPage)).fill().map(() => { return i++; })
            }
            else {
                if (currentPage < 5) {
                    temp = [1, 2, 3, 4, 5].concat(['...', totalPage]);
                }
                else if (currentPage > (totalPage - 4)) {
                    let i = totalPage - 5 + 1
                    temp = [1, '...'].concat((new Array(5)).fill().map(() => { return i++; }))
                }
                else {
                    temp = [1, '...'].concat([currentPage - 1, currentPage, currentPage + 1]).concat(['...', totalPage])
                }
            }
            setItem(temp)
        }
    }, [currentPage])


    const onClickPage = (e) => {
        if (Number(e.target.name))
            handleSetPage(Number(e.target.name))
    }

    const onClickPre = (e) => {
        if (currentPage)
            handleSetPage(currentPage - 1 < 1 ? 1 : currentPage - 1)
    }
    const onClickNext = (e) => {
        if (currentPage)
            handleSetPage(currentPage + 1 > totalPage ? totalPage : currentPage + 1)
    }

    return (
        <div className='d-flex' style={{"margin":"20px auto","justifyContent":"center"}}>
            <button data={item} name={item} onClick={onClickPre} className={`btn-pagination btn-pagination__page `} ><i class="fa-solid fa-angle-left"></i></button>
            {
                item.map((item, index) => {
                    return <button data={item} name={item} onClick={onClickPage} className={`btn-pagination ${item !== '...' ? 'btn-pagination__page' : ''} ${currentPage === item ? 'page-active' : ''}`} key={index}>{item}</button>
                })
            }
            <button data={item} name={item} onClick={onClickNext} className={`btn-pagination btn-pagination__page`} ><i class="fa-solid fa-angle-right"></i></button>
        </div>
    )
}

Pagination.propTypes = {

}

export default Pagination
