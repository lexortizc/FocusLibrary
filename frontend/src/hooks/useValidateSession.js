import { useContext } from 'react';
import AppContext from '../helpers/context';

const useValidateSession = (roles) => {
    const { session } = useContext(AppContext);

    return roles.includes(session.role)
}

export default useValidateSession;