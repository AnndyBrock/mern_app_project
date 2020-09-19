import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import 'materialize-css';


function App() {
    const {token, userId, logIn, logOut} =  useAuth();
    const isAuth = !!token;
    const routes = useRoutes(isAuth);
    return (
        <AuthContext.Provider value={{
            token, userId, logIn, logOut, isAuth
        }}>
            <BrowserRouter>
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
  )
}

export default App;
