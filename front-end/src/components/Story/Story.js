import {Link } from 'react-router-dom'
import './Story.scss'
function Story(props) {
    const data=props.data;
  return (
    <>
    <div className='story-card'>
        <div className='story-card__img-wrap'>
            <img src={data.hinhanh} alt=""/>
        </div>
        <div className='story-card__content'>
            <h2 className='story-card__tilte'><Link to={`truyen/${data.url}`}>{data['tentruyen']}</Link></h2>
            <div className='story-card__description text-secondary'>{data.noidung}</div>
            <div className='story-card__info'>
              <div className='story-card__author text-overflow-1-lines text-secondary'><i style={{marginRight:'0.25rem'}} className='bx bx-edit-alt'></i>{data.tacgia}</div>
              <span className='story-card__type border border-primary color-primary fs-12 text-overflow-1-lines' style={{padding:4+'px'}}>{data.theloai}</span>
            </div>
        </div>
    </div>
    </>
    
  )
}

export default Story