

function Reading(props) {
  const data=props.data
  return (
    <div className="reading-card">
      <div className="reading-card__img-wrap">
        <img src={data.hinhanh} alt="" />
      </div>
      <div className="reading-card__content">
        <div className="reading-card__title">
          {data.tentruyen}
        </div>
        <div className="reading-card__chap">
          Đã đọc: {data.dadoc}
        </div>
      </div>
    </div>
  )
}

export default Reading