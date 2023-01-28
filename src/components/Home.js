import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';


export default function Home(){
   let [users, getUsers] = useState([]);
   let navigate = useNavigate();
   useEffect(
    ()=>{
        axios.get("https://63d3f1efa93a149755b6945d.mockapi.io/api/users")
    .then(res=>{getUsers(res.data)})
    .catch(e=>alert(e))
    }
   ,[])

   const onClick=(e)=>{
        e.target.id ? navigate(`/edit/${e.target.id}`): navigate(`/add`)
   }
    
   const onDelete=(e)=>{
        if(window.confirm(`Bạn có chắc chắn muốn xóa : ${e.target.name}`)){
            axios.delete(`https://63d3f1efa93a149755b6945d.mockapi.io/api/users/${e.target.id}`)
            .then(res=>getUsers(users.filter(user=>user.id!==res.data.id)))
            .catch(e=>alert(e))
   }}

    return(
        <div className='container p-5'>
            <h4 className='d-inline-block'>Users</h4>
            <button onClick={onClick} 
                    className='btn btn-success float-end'>Add Contact</button>
            <div className='container mt-5'>
                <table 
                    className="table 
                                table-striped table-inverse 
                                table-responsive">
                    <thead className="thead-inverse">
                        <tr>
                            <th className='w-50 text-center'>Name</th>
                           
                            <th  
                                className='text-center'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map(user=>(
                                <tr key={user.id}>
                                    <td 
                                        className='' >
                                        <img 
                                            style={{marginLeft:"12vw"}}
                                            className='rounded-5'
                                            width="35px" 
                                            height="35px" 
                                            src={user.image}
                                            alt="" />
                                            {user.name}
                                    </td>
                                    <td  
                                        className='
                                                d-flex flex-row 
                                                justify-content-center'>
                                        <div className=' btn-group' 
                                            style={{marginRight:"1vw"}}>
                                            <button id={user.id} 
                                                onClick={onClick}
                                                className=' btn btn-warning '>
                                                Edit
                                            </button>
                                            <button
                                                    name={user.name}
                                                    id={user.id} 
                                                    onClick={onDelete}
                                                    className=' btn btn-danger'
                                                    >Delete
                                            </button>
                                        </div>
                                      
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                
                </table>
            </div>
        </div>
    )
}