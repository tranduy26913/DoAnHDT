import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import apiMain from '../api/apiMain';
import avt from '../assets/img/avt.png'
import { loginSuccess } from '../redux/authSlice';

function Comment(props) {
    const [count, setCount] = useState(100);
    const user = useSelector(state => state.auth.login?.user)
    const [comments, setComments] = useState([])
    const [content, setContent] = useState("")
    const url = props.url
    const dispatch = useDispatch()

    const onClickCreateComment = async (e) => {
        if (user) {
            const params = {
                url,
                content
            }
            apiMain.createComment(user, params, dispatch, loginSuccess)
                .then(res => {
                    setComments(pre => [res, ...pre])
                    setContent("")
                })
                .catch(err => {
                    console.log(err)
                })
        }
    }

    useEffect(async () => {
        const params = { url: url }
        apiMain.getCommentsByUrl(params)
            .then(res => {
                setComments(res)
                console.log(res)
            })
            .catch(err => {
                console.log(err)
            }
            )
    }, [])

    const calDate = (createdAt) => {
        let newDate = new Date()
        let createDate = new Date(createdAt)
                let diff = (newDate.getTime() - createDate.getTime()) / 60000

        if (diff / 60 >= 1) {
            if (diff / (60 * 24) >= 1) {
                if (diff / (60 * 24 * 30) >= 1) {
                    if (diff / (60 * 24 * 30*365)>=1){
                        return `${ (diff / (60 * 24 * 30*365)).toFixed(0)} năm trước`
                    }
                    return `${(diff / (60 * 24 * 30)).toFixed(0)} tháng trước`
                }
                return `${(diff / (60 * 24 )).toFixed(0)} ngày trước`
            }
            return `${(diff/60).toFixed(0)} giờ trước`
        }
        return `${diff.toFixed(0)} phút trước`

    }
    return (
        <div className="comment__wrap">
            <h1>Bình luận {count || 0}</h1>
            <div className="comment__form d-flex w100">
                <div className="avatar--45 mr-1">
                    <img src={user.image || avt} alt="" />
                </div>
                <div className="comment__input">
                    <textarea className='fs-14' value={content} onChange={e => { setContent(e.target.value) }}></textarea>
                    <span onClick={onClickCreateComment} className="comment__icon"><i className="fa-solid fa-comment"></i></span>
                </div>

            </div>
            <hr />
            <ul>
                {
                    comments.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <li className='d-flex'>
                                    <div className="comment__avatar ">
                                        <div className="avatar--45 mr-1">
                                            <img src={item.image || avt} alt="" />
                                        </div>

                                    </div>
                                    <div className="comment__body">
                                        <div className="comment__author__info">
                                            <h4>{item.tenhienthi}</h4>
                                            <span className='fs-12 fw-4 text-secondary'>
                                                {
                                                    calDate(item.createdAt)
                                                }
                                            </span>
                                        </div>
                                        <div className="comment__content mb-1">
                                            {item.content}
                                        </div>
                                        <div className="comment__nav">
                                            <a className='fs-14 text-secondary'><i className="fa-solid fa-reply"></i> Trả lời</a>
                                            <a className='fs-14 text-secondary'><i className="fa-solid fa-flag"></i> Báo xấu</a>
                                        </div>

                                    </div>

                                </li>
                                <hr />
                            </div>)
                    })
                }
            </ul>
        </div>
    )
}

export default Comment