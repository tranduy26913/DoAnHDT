
import { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import apiMain from '../../../api/apiMain'
import moment from 'moment'
import Section, { SectionBody, SectionHeading } from '../../../components/Section/Section'
import './NewestChapter.scss'

function NewestChapter() {
const [newUpdate,setNewUpdate]  = useState([])
  useEffect(()=>{
    apiMain.getChapterNewUpdate({size:10})
      .then(res=>{
        setNewUpdate(res)
      })
      .catch(()=>{
        setNewUpdate([])
      })
  },[])

  return (
    <div className='row'>
      <div className="col-12">

        <Section>
          <SectionHeading>
            <h4 className='section-title'>Mới cập nhật</h4>
            <Link to="tat-ca">Xem tất cả</Link>
          </SectionHeading>
          <SectionBody>
            <table className='newest-chapter'>
              <tbody>
                {
                  newUpdate.map((item,i) => <tr key={i}>
                    <td><span className='text-overflow-1-lines text-secondary'>{item.theloai}</span></td>
                    <td className='w-25'><span className='text-overflow-1-lines fw-6'>{item.tentruyen}</span></td>
                    <td className='w-25'><span className='text-overflow-1-lines'>{item.tenchap}</span></td>
                    <td><span className='text-overflow-1-lines'>{item.tacgia}</span></td>
                    <td><span className='text-overflow-1-lines text-secondary'>{item.nguoinguoidang}</span></td>
                    <td><span className='text-overflow-1-lines text-secondary'>
                      {moment(item.createAt).fromNow()}</span></td>
                  </tr>)
                }
              </tbody>
            </table>
          </SectionBody>
        </Section>
      </div>
    </div>
  )
}
const newestChapter = [{
  theloai: "Đô thị",
  tentruyen: "Tên truyện",
  tenchap: "Chương 375: Chúng ta chính là Tần Hoài 8 kiều diễm ướt át ",
  tacgia: "Giang Công Tử A Bảo",
  tennguoidang: "Nhuyễn Manh Đích Kelly",
  createAt: "3 phút trước",
  url: 1
},
{
  theloai: "Đô thị",
  tentruyen: "Tên truyện",
  tenchap: "Chương 375: Chúng ta chính là Tần Hoài 8 kiều diễm ướt át ",
  tacgia: "Giang Công Tử A Bảo",
  tennguoidang: "Nhuyễn Manh Đích Kelly",
  createAt: "3 phút trước",
  url: 2
},
{
  theloai: "Đô thị",
  tentruyen: "Tên truyện",
  tenchap: "Chương 375: Chúng ta chính là Tần Hoài 8 kiều diễm ướt át ",
  tacgia: "Giang Công Tử A Bảo",
  tennguoidang: "Nhuyễn Manh Đích Kelly",
  createAt: "3 phút trước",
  url: 3
},
{
  theloai: "Đô thị",
  tentruyen: "Tên truyện",
  tenchap: "Chương 375: Chúng ta chính là Tần Hoài 8 kiều diễm ướt át ",
  tacgia: "Giang Công Tử A Bảo",
  tennguoidang: "Nhuyễn Manh Đích Kelly",
  createAt: "3 phút trước",
  url: 4
},
{
  theloai: "Đô thị",
  tentruyen: "Tên truyện",
  tenchap: "Chương 375: Chúng ta chính là Tần Hoài 8 kiều diễm ướt át ",
  tacgia: "Giang Công Tử A Bảo",
  tennguoidang: "Nhuyễn Manh Đích Kelly",
  createAt: "3 phút trước",
  url: 5
},
{
  theloai: "Đô thị",
  tentruyen: "Tên truyện",
  tenchap: "Chương 375: Chúng ta chính là Tần Hoài 8 kiều diễm ướt át ",
  tacgia: "Giang Công Tử A Bảo",
  tennguoidang: "Nhuyễn Manh Đích Kelly",
  createAt: "3 phút trước",
  url: 6
},
{
  theloai: "Đô thị",
  tentruyen: "Tên truyện",
  tenchap: "Chương 375: Chúng ta chính là Tần Hoài 8 kiều diễm ướt át ",
  tacgia: "Giang Công Tử A Bảo",
  tennguoidang: "Nhuyễn Manh Đích Kelly",
  createAt: "3 phút trước",
  url: 7
}]

export default NewestChapter