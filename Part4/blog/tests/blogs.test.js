const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blogs');

const initialBlogs = [
    {
        title: 'Testing post creation 1',
        author: 'Itzuki',
        url: 'http://pancho.com',
        likes: 5
    },
    {
        title: 'Testing post creation 2',
        author: 'Itzuki',
        url: 'http://pancho.com',
        likes: 4
    }
];

beforeEach(async () => {
    await Blog.deleteMany({});

    let blogObject = new Blog(initialBlogs[0]);
    await blogObject.save();

    blogObject = new Blog(initialBlogs[1]);
    await blogObject.save();
})

describe('Blogs API tests', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/);
    });

    test('there are two blogs saved', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body).toHaveLength(initialBlogs.length);
    });

    test('The property id is right formatted', async () => {
        const response = await api.get('/api/blogs');

        expect(response.body[0]).toHaveProperty("id");
    });

    test('A post is saved successfully', async () => {
        let newPost = {
            title: 'Testing post creation 3',
            author: 'Itzuki',
            url: 'http://pancho.com',
            likes: 0
        };

        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(201)
            .expect('Content-type', 'application\/json; charset=utf-8');

        const response = await api.get('/api/blogs');

        const contents = response.body.map(r => r.title);

        expect(response.body).toHaveLength(initialBlogs.length + 1);
        expect(contents).toContain(
            'Testing post creation 3'
        );
    });

    test('A post is saved without likes property', async () => {
        let newPost = {
            title: 'Testing post creation 3',
            author: 'Itzuki',
            url: 'http://pancho.com'
        };

        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(201)
            .expect('Content-type', 'application\/json; charset=utf-8');

        const response = await api.get('/api/blogs');

        const contents = response.body[2];

        expect(response.body).toHaveLength(initialBlogs.length + 1);
        expect(contents.likes).toEqual(0);
    });

    test('A save request returns error when the post does not have title or url', async () => {
        let newPost = {
            author: 'Itzuki',
            likes: 5
        };

        await api
            .post('/api/blogs')
            .send(newPost)
            .expect(400)
            .expect('Content-type', 'application\/json; charset=utf-8');

        const response = await api.get('/api/blogs');
        expect(response.body).toHaveLength(initialBlogs.length);
    });
})


afterAll(() => {
    mongoose.connection.close()
})