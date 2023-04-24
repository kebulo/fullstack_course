import { useState } from "react";

const CreateBlog = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const addBlog = (event) => {
        event.preventDefault();

        createBlog({
            title: title,
            author: author,
            url: url
        })
    }

    return (
        <div>
            <form onSubmit={addBlog}>
                <div>
                    <label>Title</label>
                    <input type="text" placeholder="" value={title} onChange={e => setTitle(e.target.value)} />
                </div>

                <div>
                    <label>Author</label>
                    <input type="text" placeholder="" value={author} onChange={e => setAuthor(e.target.value)} />
                </div>

                <div>
                    <label>URL</label>
                    <input type="text" placeholder="" value={url} onChange={e => setUrl(e.target.value)} />
                </div>

                <div>
                    <button>Save</button>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;