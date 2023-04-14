const listHelper = require('../utils/list_helper');
const mockBlogList = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f9',
        title: 'Go To Statement Considered Harmful',
        author: 'Pancho Perez',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 6,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f4',
        title: 'Go To Statement Considered Harmful',
        author: 'June Michelle',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 15,
        __v: 0
    },
    {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Go To Statement Considered Harmful',
        author: 'Rasmus Parsi',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 12,
        __v: 0
    }
];

test("Dummy returns one", () => {
    const blogs = [];

    const result = listHelper.dummy(blogs);
    expect(result).toBe(1);
});

describe('Total likes', () => {
    test('When the list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes([mockBlogList[0]]);
        expect(result).toBe(5);
    });

    test('When the list has more than one blog, returns the sum', () => {
        const result = listHelper.totalLikes(mockBlogList);

        expect(result).toBe(38);
    });

    test('When there is no items on the blog list, returns 0', () => {
        const result = listHelper.totalLikes([]);

        expect(result).toBe(0);
    })
});

describe('Favorite Blog', () => {
    test('Returns the favorite blog based on likes', () => {
        let mockFavoriteBlog = {
            _id: '5a422aa71b54a676234d17f2',
            title: 'Go To Statement Considered Harmful',
            author: 'Rasmus Parsi',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 12,
            __v: 0
        };

        const favoriteBlog = listHelper.favoriteBlog(mockBlogList);

        expect(favoriteBlog).toEqual(mockFavoriteBlog);
    })
})