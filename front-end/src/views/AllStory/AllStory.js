import React, { useEffect, useState } from 'react'
import apiMain from '../../api/apiMain'
import Story from '../../components/Story'
import Section, { SectionHeading, SectionBody } from '../../components/section'


function AllStory() {
    const [datas, setDatas] = useState([])

    useEffect(() => {
        const loadData = async () => {//hàm gọi API load tất cả truyện có phân trang
            try {
                const response = await apiMain.getStorys({ page: 1, size: 20 })
                if (response) {
                    setDatas(response)
                }
            } catch (error) {
                console.log(error)
            }
        }
        loadData();
    }, [])

    //còn thiếu phần phân trang
    return (
        <>
            <a><span
                className='imgHero'>
            </span></a>

            <div className="main">
                <div className="container">
                    <div className="main-content">
                        <div className='d-flex'>
                            <Section>
                                <SectionHeading>
                                    <h4 className='section-title'>Tất cả</h4>
                                </SectionHeading>
                                <SectionBody>
                                    <div className='list-story'>
                                        {datas.map((data, index) => <Story key={index} data={data} />)}
                                    </div>
                                </SectionBody>
                            </Section>

                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default AllStory