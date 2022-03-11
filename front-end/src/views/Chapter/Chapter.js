import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import apiMain from '../../api/apiMain'
import getData from '../../api/getData'
import Layout from '../../components/Layout'
import { loginSuccess } from '../../redux/authSlice'

function Chapter(props) {
    const {chapnum ,url}= useParams()
    const [chapter,setChapter] = useState({})
    const [fontsize,setFontsize] = useState(14);
    const user = useSelector(state => state.auth.login?.user)
    const dispatch = useDispatch()
    useEffect(async()=>{
        if(user){
            const params = {
                url,chapNumber:chapnum
            }
            apiMain.setReading(params,user,dispatch,loginSuccess).then(res=>{
                console.log(res)
            })
            .catch(err=>{console.log(err)})
        }
    },[])

    useEffect(async()=>{
        apiMain.getChapterByNumber(url,chapnum).then(res=>{
            setChapter(getData(res))
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return (<>
    <Layout >
      <div className="main-content">
          <div className="d-lex">
        <input placeholder='Font size' value={fontsize} onChange={(e)=>{setFontsize(e.target.value)}}></input>
          <h1 className='chapter-name'>{chapter?.tenchap}</h1>
          <div className={`fs-${fontsize}`}>
          <>{chapter?.content?.split('\n').map(item=>{return item==" "||item=='.'||item.lenght===0||item=='. '||item==' .'?<br/>: <p>{item}</p>})}</>
          </div>
        
            </div>
        </div>
    </Layout>
        

        
    </>)
}

export default Chapter