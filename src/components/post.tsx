import * as React from 'react'
import { Link } from 'react-router-dom'
import { Post } from '../api/api'
import '../pages/style.css'
import AppProps from '../util/appProps'
import { isAuthenticated, stripHtml } from '../util/util'

interface PostProps {
    post: Post
    deletePost: (id) => void
    strip: boolean
    more: boolean
}

const PostComponent = (props: AppProps & PostProps) => {

    const { post } = props
    const auth = isAuthenticated()

    return (
        <div className="post">
            <a href={post.imageUrl}><img src={post.imageUrl} /></a>
            {post.text && <div id="text" className={props.strip && props.more ? 'text-s' : 'text-l'}>
                {props.strip && stripHtml(post.text)}
                {props.more && post.urlName && post.text.length > 200 && <Link className="view" to={`/${post.urlName}`} >more</Link>}
            </div>}
            <div className="control">
                {post.urlName && <Link className="view" to={`/${post.urlName}`} >link</Link>}
                {auth && <div className="delete" onClick={() => props.deletePost(post._id)}>delete</div>}
                {auth && <Link className="edit" to={`/edit/${post._id}`} >edit</Link>}
            </div>
        </div>
    )
}

export default PostComponent