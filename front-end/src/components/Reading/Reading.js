
import { useLocation, useNavigate,Link} from 'react-router-dom'
import './ListReading.scss'
function Reading(props) {
  const data=props.data
  return (
    <div className="reading-card">
      <div className="reading-card__img-wrap">
        <img src={data.hinhanh} alt="" />
      </div>
      <div className="reading-card__content">
        <Link to={`/truyen/${data?.url}`} className="reading-card__title">
          {data.tentruyen}
        </Link>
        <div className="reading-card__chap">
          Đã đọc: {data.dadoc}/{data?.total}
        </div>
      </div>
    </div>
  )
}

export default Reading