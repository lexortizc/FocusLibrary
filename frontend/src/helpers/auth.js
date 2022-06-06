import jwt from 'jwt-decode';

const decodeToken = (token) => {
    const tokenPayload = jwt(token);

    return {
        id: tokenPayload.id,
        username: `${tokenPayload.first_name} ${tokenPayload.last_name}`,
        email: tokenPayload.email,
        role: tokenPayload.role_id,
        token
    }
}

export default decodeToken;