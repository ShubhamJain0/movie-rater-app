import { useState, useEffect } from "react";
import { API } from '../api-service';

export function useFetch() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    useEffect( () => {
        async function fetchData(){
            setLoading(true);
            setError();
            const data = await API.getMovies()
            .catch( err => setError(err))
            setData(data)
            setLoading(false);
        }

        fetchData();
    }, []);
    return [data, loading, error]
}