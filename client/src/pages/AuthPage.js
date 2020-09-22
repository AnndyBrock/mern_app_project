import React, {useContext, useEffect, useState} from 'react';
import {useHttp} from "../hooks/http.hooks";
import {useMessage} from "../hooks/message.hook";
import {AuthContext} from "../context/AuthContext";

export const AuthPage = () => {
    const auth = useContext(AuthContext);
    const msg = useMessage();
    const {loading, error, request, clearError} = useHttp();
    const [form, setForm]  = useState({
        email:'',
        password:''
    });

    useEffect(()=>{
        msg(error);
        clearError()
    },[error, msg, clearError]);

    useEffect(()=> {
        window.M.updateTextFields()
    },[]);

    const changeHandler = event => {
        setForm({...form, [event.target.name]:event.target.value})
    };

    const registerHandler = async () =>{
        try {
            const data = await request('/api/auth/register', 'POST', {...form});
            msg(data.message);
            auth.logIn(data.token, data.userId)
        }catch (e) {
            console.log(e)
        }
    };

    const loginrHandler = async () =>{
        try {
            const data = await request('/api/auth/login', 'POST', {...form});
            auth.logIn(data.token, data.userId)
        }catch (e) {
            console.log(e)
        }
    };

    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <h2>Reduce links</h2>
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Authorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    className="yellow-input"
                                    placeholder="Please, enter your email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    value={form.email}
                                    onChange={changeHandler} required/>
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    className="yellow-input"
                                    placeholder="Please, enter your password"
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={form.password}
                                    onChange={changeHandler} required/>
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                       <button
                           className="btn yellow darken-4"
                           style={{marginRight:10}}
                           disabled={loading}
                           onClick={loginrHandler}
                       >
                           Log In
                       </button>
                       <button
                           className="btn grey lighten-1 black-text"
                           onClick={registerHandler}
                           disabled={loading}
                       >
                           Register
                       </button>
                    </div>
                </div>
            </div>
        </div>
    )
}