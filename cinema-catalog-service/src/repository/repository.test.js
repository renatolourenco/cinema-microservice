const test = require('tape')
const repository = require('./repository')


function runTests() {

    let cityId = null
    let cinemaId = null
    let movieId = null

    test('Repository GetAllCities', (t) => {
        repository.getAllCities((err, cities) => {
            if (cities && cities.length > 0) cityId = cities[1]._id
            t.assert(!err && cities && cities.length > 0, "All Cities Returned")
            t.end()
        })
    })

    test('Repository GetCinemasByCityId', (t) => {
        repository.getCinemasByCityId(cityId, (err, cinemas) => {
            if (cinemas && cinemas.length > 0) cinemaId = cinemas[0]._id
            t.assert(!err && cinemas && cinemas.length > 0, "All Cinemas Returned By City Id")
            t.end()
        })
    })

    test('Repository GetMoviesByCinemaId', (t) => {
        repository.getMoviesByCinemaId(cinemaId, (err, movies) => {
            t.assert(!err && movies && movies.length > 0, "Movies By Cinema Id Returned")
            t.end()
        })
    })

    test('Repository GetMoviesByCityId', (t) => {
        repository.getMoviesByCityId(cityId, (err, movies) => {
            if (movies && movies.length > 0) movieId = movies[1].idFilme
            t.assert(!err && movies && movies.length > 0, "Movies By City Id Returned")
            t.end()
        })
    })

    test('Repository GetMovieSessionsByCityId', (t) => {
        repository.getMovieSessionsByCityId(movieId, cityId, (err, sessions) => {
            t.assert(!err && sessions && sessions.length > 0, "Movie Sessions By City Id Returned")
            t.end()
        })
    })

    test('Repository GetMovieSessionsByCinemaId', (t) => {
        repository.getMovieSessionsByCinemaId(movieId, cinemaId, (err, sessions) => {
            t.assert(!err && sessions && sessions.length > 0, "Movie Sessions By Cinema Id Returned")
            t.end()
        })
    })

    test('Repository Disconnect', (t) => {
        t.assert(repository.disconnect(), "Disconnect OK")
        t.end()
    })
}

module.exports = {
    runTests
}