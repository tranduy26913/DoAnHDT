import { useEffect, useState } from 'react'
import apiMain from '../../../api/apiMain';
import Reading from '../../../components/Reading/Reading';
import Section, { SectionHeading, SectionBody } from '../../../components/Section/Section';
import Story from '../../../components/Story/Story';
import getData from '../../../api/getData';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
import { loginSuccess } from '../../../redux/authSlice'
import './ListStory.scss'

function ListStory() {

  const [datas, setData] = useState(Array.from(Array(6).keys(), i=>{return {}}));
  const [readings, setReadings] = useState(Array.from(Array(6).keys(), i=>{return {}}))
  const user = useSelector(state => state.auth.login.user)
  const dispatch = useDispatch()
console.log(datas)
  useEffect(() => {
    const getReadings = async () => {//Xử lý gọi API thông tin đang đọc
      if (user) {
        apiMain.getReadings(user, dispatch, loginSuccess)
          .then(res => {
            setReadings(res)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
    getReadings();//gọi hàm
  }, [user, dispatch])

  useEffect(() => {
    const getStory = async () => {//xử lý gọi hàm load truyện
      const res = getData(await apiMain.getStorys({ size: 6 }));
      setData(res);
    }
    getStory();
  }, [])
  return (
    <>
      <div className='row'>
        <div className='col-8 col-md-12 col-sm-12'>
          <Section>
            <SectionHeading>
              <h4 className='section-title'>Biên tập viên đề cử</h4>
              <Link to='tat-ca'>Xem tất cả</Link>
            </SectionHeading>
            <SectionBody>
              <div className='list-story' style={{marginTop:-24}}>
                {datas.map((data, index) => <Story key={index} data={data} />)}
              </div>
            </SectionBody>
          </Section>

        </div>

        <div className='col-4 col-md-12 col-sm-12'>
          <Section>
            <SectionHeading>
              <h4 className='section-title'>Đang đọc</h4>
              <Link to="tat-ca">Xem tất cả</Link>
            </SectionHeading>
            <SectionBody>
              <div className='list-reading'>
                {readings.map((item, i) => <Reading key={i} data={{
                  tentruyen: item.tentruyen,
                  hinhanh: item.hinhanh,
                  dadoc: item.chapnumber,
                  total: item.sochap,
                  url: item.url
                }} />)}
              </div>
            </SectionBody>
          </Section>

        </div>
      </div>
    </>

  )
}

export default ListStory