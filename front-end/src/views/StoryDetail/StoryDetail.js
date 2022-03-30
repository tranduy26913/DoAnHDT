import { useCallback, useEffect, useLayoutEffect, useState } from 'react'
import Layout from '../../components/Layout/Layout'
import './StoryDetail.scss'
import { useParams, Link } from 'react-router-dom'
import apiMain from '../../api/apiMain'
import LoadingData from '../../components/LoadingData/LoadingData'
import Grid from '../../components/Grid/Grid'
import Comment from '../../components/Comment/Comment'
import Pagination from '../../components/Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import { loginSuccess } from '../../redux/authSlice'
import { toast } from 'react-toastify'
import Loading from '../../components/Loading/Loading'

const nav = [//navigate
  {
    path: 'about',
    display: 'Giới thiệu'
  },
  {
    path: 'rate',
    display: 'Đánh giá'
  },
  {
    path: 'chapter',
    display: 'Ds Chương'
  },
  {
    path: 'comment',
    display: 'Bình luận'
  },
  {
    path: 'donate',
    display: 'Hâm mộ'
  }
]

function StoryDetail() {
  const { url } = useParams()
  const [truyen, setTruyen] = useState(null);
  const [catGiu, setCatGiu] = useState(100)
  const [main, setMain] = useState(null)
  const [tab, setTab] = useState('')
  const active = nav.findIndex(e => e.path === tab)
  const [loadingData, setLoadingData] = useState(true)
  const [handling, setHandling] = useState(false)
  const [saved, setSaved] = useState(false)
  const user = useSelector(state=>state.auth.login?.user)
  const dispatch = useDispatch();

  useEffect(() => {//load truyện
    const getStory = async () => {
      let params = { url }
      apiMain.getStory(params).then(res => {
        setTruyen(res)
        setTab('about')//set tab mặc định là About
        setLoadingData(false)
      })
    }
    getStory()
  }, [url])

  useEffect(() => {//xử lý đổi tab
    switch (tab) {
      case 'about':
        setMain(<About key={'about'} truyen={truyen} />)
        break
      case 'rate':
        setMain(<Rate key={'rate'} />)
        break
      case 'chapter':
        setMain(<ListChapter key={'chapter'} url={truyen.url} />)
        break
      case 'comment':
        setMain(<Comment key={'comment'} url={truyen.url} />)
        break
      default:
        setMain(<Donate key={'donate'} />)
    }
  }, [tab])


useEffect(()=>{
  const checkSaved = async()=>{
    setHandling(true)
    if(user){
      apiMain.checkSaved(user,dispatch,loginSuccess, {url})
        .then(res=>{
          setSaved(res.saved || false)  
        })
        .finally(()=>{setHandling(false)})
    }
  }
  checkSaved();
},[user])
  const onClickTab = async (e) => {
    setTab(e.target.name)
  }
  const onClickSaved = async(e)=>{
    if(user){
      setHandling(true)
      
      apiMain.savedStory(user,dispatch,loginSuccess,{url})
        .then(res=>{
          setSaved(true)
        })
        .finally(()=>{setHandling(false)})
    }else{
      toast.warning("Vui lòng đăng nhập để lưu truyện")
    }
  }


  const onClickUnsaved = async(e)=>{
    if(user){
      setHandling(true)
      try {
        const response = await apiMain.unsavedStory(user,dispatch,loginSuccess,{url})
        if(response){
          setSaved(false)
        }
      } catch (error) {
        
      }
      finally{setHandling(false)}
      
    }else{
      toast.warning("Vui lòng đăng nhập để lưu truyện")
    }
  }
  //style
  const liClass = "border-primary rounded-2 color-primary"
  return (
    <Layout >
      <div className="main-content">
        {loadingData ? <LoadingData />
          :
          <>
            <div className="heroSide d-flex">
              <div className='heroSide__img'>
                <div className="img-wrap">
                <img src={truyen?.hinhanh} alt="" />
              </div>
              </div>
              
              <div className="heroSide__main">
                <h2 className='mb-1'>{truyen?.tentruyen}</h2>
                <ul className=''>
                  <li className={liClass}>{truyen?.tacgia}</li>
                  <li className={liClass}>{truyen?.trangthai}</li>
                  <li className={liClass}>{truyen?.theloai}</li>
                </ul>
                <ul className="heroSide__info">
                  <li>
                    <span className='fs-16 bold'>{truyen?.sochap || '0'}</span>
                    <br />
                    <span>Chương</span>
                  </li>
                  <li>
                    <span className='fs-16 bold'>{truyen?.luotdoc || '0'}</span>
                    <br />
                    <span>Lượt đọc</span>
                  </li>

                  <li>
                    <span className='fs-16 bold'>{catGiu || '0'}</span>
                    <br />
                    <span>Cất giữ</span>
                  </li>

                </ul>

                <div className="heroSide__rate">
                  <span className={`fa fa-star ${truyen?.danhgia >= 1 ? 'checked' : ''}`}></span>
                  <span className={`fa fa-star ${truyen?.danhgia >= 2 ? 'checked' : ''}`}></span>
                  <span className={`fa fa-star ${truyen?.danhgia >= 3 ? 'checked' : ''}`}></span>
                  <span className={`fa fa-star ${truyen?.danhgia >= 4 ? 'checked' : ''}`}></span>
                  <span className={`fa fa-star ${truyen?.danhgia >= 5 ? 'checked' : ''}`}></span>
                  <span>&nbsp;{truyen?.danhgia}/5   ({truyen?.soluongdanhgia} đánh giá)</span>
                </div>
                <div className=''>
                  <button className='btn-primary mr-1'>Đọc truyện</button>
                  {
                    saved?
                    <button onClick={onClickUnsaved} className='btn-outline mr-1'>
                      {
                        handling?<Loading/>:<><i className="fa-solid fa-bookmark" style={{"marginRight":"4px"}}></i> Đã lưu</>
                      }
                      </button>
                    :
                    <button onClick={onClickSaved} className='btn-outline mr-1'>
                      {
                        handling?<Loading/> : <><i className="fa-regular fa-bookmark" style={{"marginRight":"4px"}}></i> Đánh dấu</>
                      }</button>
}
                  <button className='btn-outline'>Đề cử</button>
                </div>

              </div>
            </div>

            <div className="story-detail">
              <div className="navigate">
                {
                  nav.map((item, index) => {
                    return (
                      <a className={`navigate__tab fs-20 bold ${active === index ? 'tab_active' : ''}`}
                        key={index}
                        name={item.path}
                        onClick={onClickTab}
                      >{item.display}</a>)
                  })
                }
              </div>
            </div>

            <div className="story-detail__tab__main">
              {main}
            </div>
          </>
        }
      </div>
    </Layout>
  )
}


const About = props => {
  return (<>
    <p>
      {props.truyen?.noidung}
    </p>
  </>)
}

const Rate = props => {
  return (
    <h1>Đánh giá</h1>
  )
}

export const ListChapter = props => {
  const [chapters, setChapters] = useState([])
  const [loadingData, setLoadingData] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const url = props.url
  useEffect(() => {
    const loadList = async () => {//xử lý gọi API danh sách truyện
      const params = {//payload
        page: currentPage - 1,
        size: 20
      }

      apiMain.getNameChapters(props.url, params).then(res => {
        setChapters(res)
        setLoadingData(false)
      })
    }
    loadList()//gọi hàm
  }, [props.url, currentPage])

  const handleSetPage = useCallback((value) => {//hàm xử lý set lại trang hiện tại trong phân trang
    setCurrentPage(Number(value))
  })

  return (
    <>
      <h3>Danh sách chương</h3>
      {
        loadingData ? <LoadingData /> :
          <Grid gap={15} col={props.col || 3} snCol={1}>
            {
              chapters.map((item, index) => {
                return <Link to={`/truyen/${url}/${item.chapnumber}`}
                  key={index} className='text-overflow-1-lines'
                  style={{ "fontSize": `${props.fontsize || 16}px` }}>{item.tenchap}</Link>
              })
            }
          </Grid>
      }
      <Pagination totalPage={10} currentPage={currentPage} handleSetPage={handleSetPage} />

    </>
  )
}


const Donate = props => {
  return (
    <h1>Hâm mộ</h1>
  )
}
export default StoryDetail