import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect,useState} from 'react';


export default function Add(){
    let navigate = useNavigate();
    let [user,setUser]= useState({});
    let [article, setArticle] = useState();
    let [listArticle, setListArticle] = useState([]);
    let {userId} = useParams();
    useEffect(()=>{
        if(userId){
            axios.get(`https://63d3f1efa93a149755b6945d.mockapi.io/api/users/${userId}`)
            .then(res=>setUser(res.data))
            .catch(e=>alert(e))
            axios.get(`https://63d3f1efa93a149755b6945d.mockapi.io/api/articles`)
            .then(res=>setListArticle(res.data))
            .catch(e=>alert(e))
        }
    }
    ,[])

    const onChange=({target})=>{
            if(target.name==='article'){
                setArticle(target.value)
            }else{
                setUser({...user,[target.name]:target.value});
            }
    }
    const onClick=(e)=>{
        if(userId){
            if(e.target.name==="btnName"){            axios.put(`https://63d3f1efa93a149755b6945d.mockapi.io/api/users/${userId}`,user)
            .then(res=>alert(`Sửa thành công tên : ${res.data.name}`)
            )
            .catch(e=>console.log(e))}
        else{
        axios.post('https://63d3f1efa93a149755b6945d.mockapi.io/api/articles',{'userId':userId,'article':article})
        .then(res=>alert(`Thêm thành công sách `)
        )
        .catch(e=>console.log(e))
    }}
        else{
            axios.post('https://63d3f1efa93a149755b6945d.mockapi.io/api/users/',user)
            .then(res=>{alert(`Thêm mới thành công : "${res.data.name}"`)
                navigate(`/add/${res.data.id}`)
            })
            .catch(e=>console.log(e))
        }
    }

   

    return(
        <div className='container pt-5'>
            <div className='  d-flex flex-row 
                    justify-content-between'>
                <h3>{userId? 'User Detail': 'Add User'}</h3>
                <h5 role="button" className='text-primary' 
                onClick={()=>navigate('/')}>Back to Home</h5>
            </div>
            <div className='w-25 mt-5'>
                <form  >
                    <label className='mt-3'>Name</label>
                    <br></br>
                        <input 
                            onChange={onChange}
                            name="name"
                            required  
                            type="text" 
                            defaultValue={userId? user.name:''} 
                            className="form-control w-auto d-inline-block" />
                        <button 
                            name='btnName'
                            onClick={onClick}
                            className='btn mx-2 w-auto btn-success' 
                            type='button'>
                            {!userId? 'Add':'Update'}
                        </button>
                        <br></br>
                        {userId? 
                            (<div>
                                    <label className='mt-3'>Article</label>
                                <br></br>
                                <input 
                                    defaultValue={`Aticle ${userId}`}
                                    onChange={onChange}
                                    name="article"
                                    required  
                                    type="text" 
                                    className="form-control w-auto d-inline-block" 
                                    />
                                <button 
                                     name='btnArticle'
                                    onClick={onClick}
                                    className='btn mx-2 w-25 btn-success' 
                                    type='button'>
                                    Add
                                </button>
                            </div>):""
                        }
                    <br></br>  
                </form>
            </div>
        </div>
    )
}