import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Signup from './Signup';
// export default function Signin() {
    // const [email, setEmail] = useState('')
    // const [password, setPassword] = useState('')
    // const endPoint = "http://localhost:4001/login"

    // function login(){
        // if (!(email && password)===null ||(email && password)==="false"){
                
        //         alert("You have not an account. Please sign up")
                // if (!fields["email"]) {
                //     formIsValid = false;
                //     errors["email"] = "Cannot be empty";
                //   }
              
                //   if (typeof fields["email"] !== "undefined") {
                //     let lastAtPos = fields["email"].lastIndexOf("@");
                //     let lastDotPos = fields["email"].lastIndexOf(".");
              
                //     if (
                //       !(
                //         lastAtPos < lastDotPos &&
                //         lastAtPos > 0 &&
                //         fields["email"].indexOf("@@") == -1 &&
                //         lastDotPos > 2 &&
                //         fields["email"].length - lastDotPos > 2
                //       )
                //     ) {
                //       formIsValid = false;
                //       errors["email"] = "Email is not valid";
                //     }
                //   }
              
                //   this.setState({ errors: errors });
                //   return formIsValid;
                // }
              
          
    // else {
    //     fetch(endPoint, {
    //         method: 'POST',
    //         headers: {
    //         'Content-Type': 'application/json'
    //         },
    //         body: JSON.stringify({email:email, password: password })
    //     }).then(data => data.json())
    //     .then(json=> {
    //         //sessionStorage
    //         sessionStorage.setItem("token", json.token) 
    //         //show main body
    //         window.location.reload();
    //     })   
    // }}

   
    // return (
//         <div class="container-fluid">
//             <p type="bold"> Please sign in</p>
//             <div class="form-group">
//                 <label>Email:<input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
//                 </label>
//                 <div class="form-group">
//                 <label>Password:<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
//                 </label>
//             </div>
//             <button  onClick = {()=> login ()}> Log in</button>
//             {/* <button  onClick = {()=> <Link href to ="/signup"> </Link>}>  Sign up  </button> */}
//          <a href="./Signup"> Sign up </a>
       
         
//             </div>

//             </div>
//     )
// }
class Signin extends React.Component {
    constructor(props) {
      super(props);
      //Khởi tạo state chứa giá trị của input
      this.state = {
        email: "",
        password: ""
      };
    }
    changeInputValue(e) {
        this.setState({
          [e.target.name]: e.target.value
        });
    }
    validationForm() {
        let returnData = {
          error : false,
          msg: ''
        }
        const {email, password} = this.state
        //Kiểm tra email
        const re = /\S+@\S+\.\S+/;
        if (!re.test(email)) {
          returnData = {
            error: true,
            msg: 'Không đúng định dạng email'
          }
        }
        //Kiểm tra password
        if(password.length < 3) {
          returnData = {
            error: true,
            msg: 'Mật khẩu phải lớn hơn 8 ký tự'
          }
        }
        return returnData;
      }
      submitForm(e) {
        //Chặn các event mặc định của form
        e.preventDefault();
     
       //Gọi hàm validationForm() dùng để kiểm tra form
        const validation = this.validationForm()
     
        //Kiểm tra lỗi của input trong form và hiển thị
        if (validation.error) {
          alert(validation.msg)
        }else{
                const endPoint = "http://localhost:4001/login"
                function login () {
            fetch(endPoint, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify({email:email, password: password })
            }).then(data => data.json())
            .then(json=> {
                //sessionStorage
                sessionStorage.setItem("token", json.token) 
                //show main body
                window.location.reload();
            })  
        }
      }
      }
render() {
    return (
      <div className="container" style={{ paddingTop: "5%" }}>
        <form
          onSubmit={e => {
            this.submitForm(e);
          }}
        >
          <div className="form-group">
            <label htmlFor="text">Email:</label>
            <input
              type="text"
              className="form-control"
              name="email"
              placeholder="Enter email"
              onChange={e => this.changeInputValue(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              className="form-control"
              name="password"
              placeholder="Enter password"
              onChange={e => this.changeInputValue(e)}
            />
          </div>
          {/* <button type="submit" className="btn btn-primary">
            Submit
          </button> */}
          <button type="submit" className="btn btn-primary" onClick = {()=> login ()}> Log in</button>
        </form>
        
      </div>
    );
  }
}
export default Signin;