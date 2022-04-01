import React, { useEffect } from 'react'
import Section, { SectionBody, SectionHeading } from '../../components/section'

function NewestChapter() {
  //chưa viết xong
  return (
    <div className='d-flex'>
      <Section>
        <SectionHeading>
          <h4 className='section-title'>Mới cập nhật</h4>
          <Link to="tat-ca">Xem tất cả</Link>
        </SectionHeading>
        <SectionBody>
          <table>
            <tbody>

            </tbody>
          </table>
        </SectionBody>
      </Section>
    </div>
  )
}

export default NewestChapter