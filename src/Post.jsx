import { nanoid } from 'nanoid';
import React from 'react'
import styled from 'styled-components'

const PostContainer = styled.div`
    width:500px;
    padding:20px;
    border: 2px solid;
    margin-bottom:20px;
    box-shadow: 7px 10px 16px 5px rgba(100,108,255,0.55);
        -webkit-box-shadow: 7px 10px 16px 5px rgba(100,108,255,0.55);
        -moz-box-shadow: 7px 10px 16px 5px rgba(100,108,255,0.55);
    text-align: left;
    & .button{
        display:flex;
        width:100%;
        justify-content:center;
        align-items:center;
        cursor:pointer;
    }
    & .delete-btn {
        background-color:rgba(255, 100, 100, 0.55);
        width:100%;
        text-align:center;
        padding:10px;
        font-weight:bolder;
        font-size:1.1rem;
        transition: transform 250ms ease-out;
    }
    & .delete-btn:hover {
        transform: translate(0px, 0px) scale(1.045, 1.045);
    }
`

const Post = ({ post, deletePost }) => {
    const { title, body, id, userId, postId } = post;
    console.log(id)

    return (
        <PostContainer>
            <h2 className="post-title">{title}</h2>
            <p className="post-body">{body}</p>
            <div className="button" onClick={() => {
                if(post?.postId) deletePost(postId)
                else if(post?.id) deletePost(id)
            }
            }>
                <div className="delete-btn" >Delete</div>
            </div>
        </PostContainer>
    )
}

export default Post