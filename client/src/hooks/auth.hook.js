import {useState, useCallback, useEffect} from 'react'

const storage = 'userData';

export const useAuth =  () =>{
    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);

    const logIn = useCallback((jwtToken, id)=>{
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storage, JSON.stringify({
            userId:id, token:jwtToken
        }))
    },[]);
    const logOut = useCallback(()=>{
        setToken(null);
        setUserId(null);
        localStorage.removeItem(storage)
    },[]);


    useEffect(()=>{
        const data = JSON.parse(localStorage.getItem(storage));
        
        if (data && data.token) {
            logIn(data.token, data.userId)
        }
    },[logIn]);

    return {logIn, logOut, token, userId}
};