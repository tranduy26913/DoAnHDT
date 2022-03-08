import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import apiMain from '../../api/apiMain'
import Layout from '../../components/Layout'

function Chapter(props) {
    const {chapnum ,url}= useParams()
    const [chapter,setChapter] = useState({})

    useEffect(async()=>{
        apiMain.getChapterByNumber(url,chapnum).then(res=>{
            setChapter(res)
        })
        .catch(err=>{
            console.log(err)
        })
    },[])
    return (<>
    <Layout >
      <div className="main-content">
          <div className="d-lex">
          <h1 className='chapter-name'>{chapter?.tenchap}</h1>
        <>{chapter?.content?.split('\n').map(item=>{return item==" "||item=='.'||item.lenght===0||item=='. '||item==' .'?<br/>: <p>{item}</p>})}</>
              </div>
        </div>
    </Layout>
        

        
    </>)
}

export default Chapter