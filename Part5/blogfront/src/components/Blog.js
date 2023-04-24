import { useState } from "react";

const Blog = ({ blog, updateBlog, deleteBlog, userId }) => {
    const [viewBlogDetail, setBlogDetail] = useState(false);
    const canManageBlog = (userId == blog.user_id) ? true : false;

    const likeBlog = (event) => {
        event.preventDefault();
        updateBlog(blog);
    }

    const handleDeleteBlog = (event) => {
        event.preventDefault();
        deleteBlog(blog.id);
    }

    return (
        <div>
            {blog.title} <button onClick={e => setBlogDetail(!viewBlogDetail)}>{!viewBlogDetail ? 'View' : 'Hide'}</button>

            {
                viewBlogDetail
                    ? <div id="details">
                        {blog.url} <br />
                        Likes {blog.likes} <button onClick={likeBlog}>Like</button> <br />
                        {blog.author} <br />
                        {canManageBlog ? <button onClick={handleDeleteBlog}>Delete</button> : ''}
                    </div>
                    : ''
            }

        </div>
    );
}

export default Blog;