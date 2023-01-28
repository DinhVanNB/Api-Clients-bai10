import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import {useEffect,useState} from 'react';


export default function Edit(){
    let navigate = useNavigate();
    let [user,setUser]= useState({});
    let [article, setArticle] = useState({});
    let {userId,articleId } = useParams();
    let [listArticle,setListArticle] =useState([]);
    useEffect(()=>{
        if(userId){
            axios.get('https://63d3f1efa93a149755b6945d.mockapi.io/api/articles')
            .then(res=>
                setListArticle(res.data.filter(re=>+re.userId===+userId))
            )
            .catch(e=>alert(e))            
            axios.get(`https://63d3f1efa93a149755b6945d.mockapi.io/api/users/${userId}`)
            .then(res=>setUser(res.data)
            )
            .catch(e=>alert(e))
           
        }
        if(articleId){
            axios.get(`https://63d3f1efa93a149755b6945d.mockapi.io/api/articles/${articleId}`)
            .then(res=>setArticle(res.data))
            .catch(e=>alert(e))
        }
    }
    ,[navigate])

    const onChange=({target})=>{
            if(target.name==='article'){
                setArticle({...article,"article":target.value})
            }else{
                setUser({...user,[target.name]:target.value});
            }
    }


    const onClick=({target})=>{
        if(target.name==='btnName'){
            axios.put(`https://63d3f1efa93a149755b6945d.mockapi.io/api/users/${userId}`,user)
            .then(res=>alert(`Sửa thành công tên : ${res.data.name}`)
            )
            .catch(e=>console.log(e))
        }
        else{

            !articleId ?
            axios.post('https://63d3f1efa93a149755b6945d.mockapi.io/api/articles',{...article,'userId':userId,})
            .then(res=>setListArticle(rev=>[...rev,res.data]))
            .catch(e=>alert(e))
        :
            axios.put(`https://63d3f1efa93a149755b6945d.mockapi.io/api/articles/${articleId}`,
            article)
            .then(res=>alert(`Sửa thành công tên bài viết thành: ${res.data.article}`))
            .catch(e=>alert(e))
        }
       
    }

    const onDelete =({target})=>{
        window.confirm(`Bạn có chắc chắn muốn xóa ${target.name}`)?
           axios.delete(`https://63d3f1efa93a149755b6945d.mockapi.io/api/articles/${target.id}`)
        .then(res=>setListArticle(listArticle.filter(article=>article.id!==res.data.id)))
        .catch(e=>console.log(e)): console.log('hủy xóa');
    }
    const onEdit =({target})=>{
        navigate(`/edit/${userId}/${target.id}`)
    }

    let element = 
        listArticle.map(article=>
            <tr key={article.id}>
                <td>
                 {article.article}
                </td>
                <td  
                    className='
                            d-flex flex-row 
                            justify-content-center'>
                    <div className=' btn-group' 
                        style={{marginRight:"1vw"}}>
                        <button id={article.id} 
                            onClick={onEdit}
                            className=' btn btn-warning '>
                            Edit
                        </button>
                        <button
                                name={article.article}
                                id={article.id} 
                                onClick={onDelete}
                                className=' btn btn-danger'
                                >Delete
                        </button>
                    </div>
                  
                </td>
            </tr>
    );

    return(
        <div className='container pt-5'>
            <div className='  d-flex flex-row 
                    justify-content-between'>
                <h3>{articleId? 'Edit': 'User Detail'}</h3>
                <h5 role="button" className='text-primary' 
                onClick={()=>navigate('/')}>Back to Home</h5>
            </div>
            <div className='w-25 mt-5'>
              
                    <label className='mt-3'>Name</label>
                    <br></br>
                        <input 
                            onChange={onChange}
                            name="name"
                            required  
                            type="text" 
                            defaultValue={ user.name||''} 
                            className="form-control w-auto d-inline-block" />
                        <button
                             onClick={onClick} 
                            name='btnName' 
                            className='btn mx-2 w-auto btn-success' 
                            type='submit'>
                            {!userId? 'Add':'Update'}
                        </button>
                        <br></br>
                      <label className='mt-3'>Article</label>
                        <br></br>
                        <input 
                            defaultValue={articleId? article.article:'' }
                            onChange={onChange}
                            name="article"
                            required  
                            type="text" 
                            className="form-control w-auto d-inline-block" 
                            />
                        <button 
                        onClick={onClick}
                            name="btnArticle"
                            className='btn mx-2 w-25 btn-success' 
                            type='submit'>
                            {!articleId? 'Add':'Update'}
                        </button>
                        {
                           
                                articleId?
                                <div className='mx-4'>
                                <br></br>
                                <button 
                                onClick={()=>navigate(`/edit/${userId}`)}
                                className='btn mx-2 w-25 btn-warning' 
                                type='button'>
                                Cancel
                            </button>
                                </div>
                               :''
                        }
            </div>
            <br></br>  
            <hr></hr>
            <div>
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
                       {!articleId? element :<></>}
                    </tbody>
                </table>
            </div>
        </div>
    )
}