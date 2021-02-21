export class API {
    static getMovies() {
        return  fetch('http://192.168.29.235:8000/api/movies/',{
                method: 'GET',
                headers: {
                    'Authorization': `Token e8c90d228fda87e3605f18ec8a52f2bcbea180b8`
                }
            })
            .then(resp => resp.json())
        }
}