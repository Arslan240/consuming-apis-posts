import { useEffect, useState } from 'react'
import './App.css'
import Post from './Post';
import axios from 'axios'
import {nanoid} from 'nanoid'


// const url = "https://jsonplaceholder.typicode.com/posts?_limit=10"
// const postUrl = "https://jsonplaceholder.typicode.com/posts"
const client = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com/posts/"
})

function App() {
  const [posts, setPosts] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [title, setTitle] = useState("")
  const [body, setBody] = useState("")

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // AXIOS
        let response = await client.get('?_limit=10');
        setPosts(response.data)

        // fetch API
        // const response = await fetch(url)
        // const data = await response.json()
        // setPosts(data)  
      } catch (err) {
        console.log(err.message)
      }
    }
    fetchPost();
  }, [])

  const addPosts = async (title, body) => {
    
    try {
      if(!title && !body){
        throw new Error("Title or body is empty.")
      }

      // AXIOS
      let response = await client.post('',{
        title:title,
        body:body,
        userId: Math.random().toString(36).slice(2),
        id: nanoid(),
        postId:nanoid(),
      })
      let {data} = response 
      console.log(data)
      // FETCH API
      // let response = await fetch(postUrl, {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     title,
      //     body,
      //     userId: Math.random().toString(36).slice(2),
      //   }),
      //   headers: {
      //     'Content-Type' : 'application/json; charset=UTF-8',
      //   },
      // })
      // let data = await response.json()

      setPosts(prevPosts => [data, ...prevPosts ])
      setTitle("")
      setBody("")
      
    } catch (err) {
      console.log(err.message)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    addPosts(title, body);
    setToggle(!toggle)
  }

  const deletePost = async (id) => {
    try {

      // Axios API
      let response = await client.delete(`${id}`)
      if(response.status){
        setPosts(prevPosts => (
          prevPosts.filter(post => {
            if(post?.postId){
              return post.postId !== id;
            }else if(post?.id){
              return post.id !== id;
            }
          })
        ))
      }

      // Fetch API
      // let response = await fetch(`${postUrl}/${id}`,{
      //   method: 'DELETE',
      // })
      // if(response.ok){
      //   setPosts(prevPosts => (
      //     prevPosts.filter(post => post.id !== id)
      //   ))
      // }

    } catch (err) {
      console.log(err.message)
    } 
  }

  return (
    <div className="App">
      <h1 className='hero-title'>Posts</h1>
      {toggle &&
        <div className="form">
          <form onSubmit={handleSubmit}>
            <input type="text" className="text"
              value={title}
              placeholder='Title...'
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea className="body"
              value={body}
              placeholder='Desc...'
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
            <button type='submit' className='submitButton'>Add Post</button>
          </form>
        </div>
      }
      
      {!toggle &&
        <div className="button">
          <button onClick={e => setToggle(!toggle)}>Add Post</button>
        </div>
      }

      {posts?.map((post) => {

        return (
          <Post post={post} key={post.id} deletePost={deletePost}/>
        )
      })}
    </div>
  )
}

export default App
