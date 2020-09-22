import React from 'react';
import {BrowserRouter} from 'react-router-dom'
import {useRoutes} from "./routes";
import {useAuth} from "./hooks/auth.hook";
import {AuthContext} from "./context/AuthContext";
import {Navbar} from "./components/Navbar";
import 'materialize-css';
import {Loader} from "./components/Loader";


function App() {
    const {token, userId, logIn, logOut, loading} =  useAuth();
    const isAuth = !!token;
    const routes = useRoutes(isAuth);
    
    if (!loading) {
        return <Loader/>
    }
    
    return (
        <AuthContext.Provider value={{
            token, userId, logIn, logOut, isAuth
        }}>
            <BrowserRouter>
                {isAuth ? <Navbar/>  : null}
                <div className="container">
                    {routes}
                </div>
            </BrowserRouter>
        </AuthContext.Provider>
  )
}

export default App;