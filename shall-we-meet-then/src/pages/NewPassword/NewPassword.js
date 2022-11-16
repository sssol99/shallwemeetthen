import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Swal from "sweetalert2";
function NewPassword() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const navigate = useNavigate();
  const { uuid } = useParams();


  const passwordUpdate = () => {
    console.log(uuid)

    if (password === passwordCheck) {
      axios({
        method: 'put',
        url: 'http://k7d105.p.ssafy.io/members/password',
        headers: {
          'Content-Type': 'application/json',
        },
        data: {
          email:email,
          nextPassword: password,
          uuid:uuid
        },
      }).then(r=>{
        console.log(r)

        Swal.fire({
          icon: "success",
          title: "비밀번호 수정 완료!",
          showConfirmButton: false,
          timer: 1300,
        });
        
        navigate('/')
      })
    }
    else {
      // alert('비밀번호가 다릅니다.')
      Swal.fire({
        icon: "error",
        title: "비밀번호가 다릅니다",
        // text: "이메일을 입력해주세요",
      });
    }

  }


  return (
    <div className="landing__bg" >
      <div className="login-page">
        <div className="form">
          <div className="login-form">
            <input type='emil' placeholder="email" value={email}
              onChange={(e) => { setEmail(e.target.value) }} />
            <input type='password' placeholder="new_password" value={password}
              onChange={(e) => { setPassword(e.target.value) }} />
            <input type='password' placeholder="check_password" value={passwordCheck}
              onChange={(e) => { setPasswordCheck(e.target.value) }} />
            <button onClick={passwordUpdate}>비밀번호 수정</button>
          </div>
        </div>
      </div>
    </div>




  )
}

export default NewPassword