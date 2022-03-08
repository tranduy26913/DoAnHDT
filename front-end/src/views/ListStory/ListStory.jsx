import { useEffect,useState } from 'react'
import apiMain from '../../api/apiMain';
import Reading from '../../components/Reading';
import Section, {SectionHeading,SectionBody} from '../../components/section';
import Story from '../../components/Story';
import './ListStory.scss'

function ListStory() {

    const [datas,setData]=useState([]);
    const [readings,setReadings]=useState([
      {
        id:"1",
        tentruyen:"Test 12",
        hinhanh:"https://static.8cache.com/cover/o/eJzLyTDR183ISImMtAj1M0vO1g_zyfQMc8o3Tw711HeEgpzCSH2L8KTKcguXMrPIbP1yI0NT3QxjIyMAXosSvw==/ban-long.jpg",
        dadoc:"0/250"
      },
      {
        id:"2",
        tentruyen:"Test 12",
        hinhanh:"https://static.8cache.com/cover/o/eJzLyTDR183ISImMtAj1M0vO1g_zyfQMc8o3Tw711HeEgpzCSH2L8KTKcguXMrPIbP1yI0NT3QxjIyMAXosSvw==/ban-long.jpg",
        dadoc:"0/250"
      },
      {
        id:'3',
        tentruyen:"Test 12",
        hinhanh:"https://static.8cache.com/cover/o/eJzLyTDR183ISImMtAj1M0vO1g_zyfQMc8o3Tw711HeEgpzCSH2L8KTKcguXMrPIbP1yI0NT3QxjIyMAXosSvw==/ban-long.jpg",
        dadoc:"0/250"
      }
    ])

    useEffect(()=>{
        const getStory = async()=>{
          const res = await apiMain.getStorys({size:6});
          
          setData(res);
        }
        getStory();

    },[])
  return (
    <>
    <div className='d-flex'>
        <div className='col-8'>
          <Section>
             <SectionHeading>
              <h4 className='section-title'>Biên tập viên đề cử</h4>
              <a>Xem tất cả</a>
            </SectionHeading>
            <SectionBody>
              <div className='list-story'>
               { datas.map((data,index)=><Story key={index} data={data}/>)}
            </div>
            </SectionBody>
          </Section>
              
        </div>

        <div className='col-4'>
          <Section>
            <SectionHeading>
            <h4 className='section-title'>Đang đọc</h4>
            <a>Xem tất cả</a>
            </SectionHeading>
            <SectionBody>
              <div className='list-reading'>
              {readings.map(reading=><Reading key={reading.id} data={reading}/>)}
            </div>
            </SectionBody>
          </Section>
          
        </div>
    </div>
    </>

  )
}

export default ListStory