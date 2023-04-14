const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    let total = blogs.reduce(
        (accumulator, currentValue) => accumulator + currentValue.likes,
        0,
    );

    return total;
};

const favoriteBlog = (blogs) => {
    const favorite = blogs.reduce((prev, current) => {
        return (prev.likes > current.y) ? prev : current;
    });

    return favorite;
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
};