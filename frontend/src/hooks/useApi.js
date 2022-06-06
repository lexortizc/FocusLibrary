import axios from 'axios'
import { useContext } from 'react';
import AppContext from '../helpers/context';
import env from '../config';

const useApi = () => {
    const { session } = useContext(AppContext);

    return axios.create({
        baseURL: env.baseURL,
        timeout: 1000,
        headers: {
            Authorization : session.token
        }
    })
}

export default useApi