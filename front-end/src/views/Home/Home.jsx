import Layout from '../../components/Layout/Layout'
import ListStory from './ListStory/ListStory'
import NewestChapter from './NewestChapter/NewestChapter'
import StoryTopRate from './StoryTopRate/StoryTopRate'
import './Home.scss'

function Home() {
  return (
    <>
    <Layout>
      <div className="main-content">
             <ListStory/>
             <NewestChapter/>
             <StoryTopRate/>
      </div>
      
    </Layout>
    
           
    </>
    
  )
}

export default Home