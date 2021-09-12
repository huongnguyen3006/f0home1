import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom";

export default function Exam() {
const [data, setData] = useState([]);
const endPoint = "http://localhost:4001/exams"
const endPointF0 = "/f0s"

const [temperature, setTemperature] = useState(0)
const [spo2, setSpo2] = useState(0)
const [id, setId] = useState('')
const [f0Info, setF0Info] = useState('')


const [keyword, setKeyword] = useState('')

const {f0} = useParams()

const save = () => {
 
    if (id===''){
       fetch(endPoint, {
           method: 'POST',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({f0: f0, temperature: temperature, spo2: spo2})
       }).then(data => load())
   }
   else{
       fetch(endPoint, {
           method: 'PUT',
           headers: {
           'Content-Type': 'application/json'
           },
           body: JSON.stringify({ id: id, f0: f0, temperature: temperature, spo2: spo2})
       }).then(data => load())
   }
 
   }
 
const deleteExam = (id) => {
   fetch(endPoint+"/"+id, {
       method: 'DELETE',
       headers: {
         'Content-Type': 'application/json'
       }
   }).then(data => load())
}
 
const editExam = (id, temperature, spo2) => {
   setId(id)
   setTemperature(temperature)
   setSpo2(spo2)
}
//get data from api
const load = () => {
  fetch(endPoint + "/f0/"+f0)
    .then(response => response.json())
    .then(data => setData(data));
}

//get data from api
const loadF0 = () => {
    fetch(endPointF0 +"/"+f0)
      .then(response => response.json())
      .then(data => {
          setF0Info(`Name: ${data.name}. Age: ${data.age}`)
      });
  }

function addnew(){
    setId('')
    setTemperature(0)
    setSpo2(0)
}

function search(){

  const pageSize = document.querySelector("#pageSize").value
  const pageNo = document.querySelector("#pageNo").value


  fetch(endPoint + "/search?keyword="+keyword+"&pageSize="+pageSize+"&pageNo="+pageNo)
  .then(response => response.json())
  .then(data => {
    populatePageNo(data.Size)
    setData(data.Items)
  }  
)}

function populatePageNo(size){

  const pageSize = document.querySelector("#pageSize").value
  const noPage = size/pageSize
  const pageNoSelect = document.querySelector("#pageNo")
  
  while (pageNoSelect.options.length > 1) {                
    pageNoSelect.remove(0);
  }     

  for (var i = 1; i<=noPage; i++){
    var opt = document.createElement('option');
    opt.value = i;
    opt.innerHTML = i;
    pageNoSelect.appendChild(opt);
}
}

//load data automatically
useEffect(() => {
  load()
  loadF0()
 }, [])
 
return (
  <div>
      <h2>Quản lý khám bệnh</h2>

      <div class="form-group">
      <label>F0 : {f0Info}</label>
        {}
      </div>

      <input type="hidden" className="form-control" value={id} onChange={(e)=>setId(e.target.value)}/>

      <div class="form-group">
      <label>Nhiệt độ:</label><input type="number" min="36" max="42" className="form-control" value={temperature} onChange={(e)=>setTemperature(e.target.value)}/>
      </div>

      <div class="form-group">
      <label>Spo2:</label><input type="number"  min="70" max="100" className="form-control" value={spo2} onChange={(e)=>setSpo2(e.target.value)}/> 
      </div>

      <button class="btn btn-primary" onClick={()=> save()}>Save</button>

      <button class="btn btn-primary" onClick={()=> addnew()}>Add new</button>

      <h2>Danh sách khám bệnh</h2>

        {/* <div class="row">
          <div class="col-md-8">
            <input type="text" value={keyword} onChange={(e)=>setKeyword(e.target.value)}/>
            <button onClick={()=>search()}>Search</button>
          </div>
          <div class="col-md-4">
            Page Number: 
            <select id="pageNo" onChange={()=>search()}>
              <option value="1">1</option>
            </select>
            Page Size 
              <select id="pageSize" onChange={()=>search()}>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              </select>
          </div>         
        </div> */}

       <table class="table table-striped">
       <thead>
      <tr>
        <th>Nhiệt độ</th>
        <th>Spo2</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>      
      {data.map(a => (
        <tr>
            <td>{a.temperature}</td>
            <td>{a.spo2}</td>
            <td><button className="btn btn-warning" onClick={()=> deleteExam(a._id)}>Delete</button>
            <button className="btn btn-warning" onClick={()=> editExam(a._id, a.temperature, a.spo2)}>Edit</button></td>
        </tr>
      ))}
      </tbody>
       </table>
      
  </div>
);
}
