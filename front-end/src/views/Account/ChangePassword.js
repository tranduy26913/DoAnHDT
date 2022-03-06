import React, { useState } from 'react'

function ChangePassword() {

    const [currentPW,setCurrentPW] = useState("")
    const [newPW,setNewPW] = useState("")
    const [newCfPW,setNewCfPW] = useState("")

    const onChangeCurrentPW = (e)=>{
        
    }
    return (
        <div className="profile__main">
            <div className="group-info">
                <label htmlFor="" style={labelStyle}>Mật khẩu hiện tại</label>
                {<input onChange={onChangeName} value={currentPW} />}
            </div>
            <div className="group-info">
                <label htmlFor="" style={labelStyle}>Email</label>
                {<input readOnly value={newPW}></input>}
            </div>
            <div className="group-info">
                <label htmlFor="" style={labelStyle}>Ngày sinh</label>
                <input onChange={onChangeBirthDate} type="password" id="birthday" name="birthday" value={newCfPW}></input>
            </div>
            <div className="d-flex">
                <button onClick={handleEdit}>Cập nhật</button>
            </div>

        </div>
    )
}

export default ChangePassword