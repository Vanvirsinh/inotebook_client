import AuthContext from "./authContext";
import { useState } from "react";
import Cookies from 'js-cookie';

const host = "http://localhost:5000";

const AuthState = (props) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userLoading, setUserLoading] = useState(true);

    // Authetication Check
    const checkAuth = () => {
        const token = Cookies.get('token');
        if (token && isAuthenticated) {
            return true;
        } else {
            return getUser(token)
        }
    }

    // Get User 
    const getUser = async (token) => {
        if (token) {
            try {
                const response = await fetch(`${host}/api/auth/getUser`,
                    {
                        method: "GET",
                        headers: {
                            "auth-token": token
                        }
                    })
                if (response.status === 200) {
                    const user = await response.json();
                    setUser(user);
                    setIsAuthenticated(true);
                    setUserLoading(false);
                    return true;
                } else {
                    setUser(null);
                    setIsAuthenticated(false);
                    setUserLoading(false);
                    return false;
                }
            } catch {
                setUser(null);
                setIsAuthenticated(false);
                setUserLoading(false);
                return false;
            }
        } else {
            setUserLoading(false);
        }
    }

    // Register user
    const register = async ({ name, email, password }, cb) => {
        try {
            const response = await fetch(`${host}/api/auth/register`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ name, email, password })
                }
            )

            if (response.statusText === "OK") {
                const data = await response.json();
                const token = data.token;
                Cookies.set('token', token, { expires: 10 });
                setUser(data.newUser);
                setIsAuthenticated(true);
                cb({
                    type: "success",
                    message: "You've signed in successfully!"
                });
            } else {
                const error = await response.json();
                setUser(null);
                setIsAuthenticated(false);
                cb({
                    type: "error",
                    message: error.errors
                });
                console.log(error);
            }

        } catch {
            setUser(null);
            setIsAuthenticated(false);
            cb({
                type: "error",
                message: "Oops, Some Internal Error Occurred!"
            });
        }
    }

    // Login User
    const login = async ({ email, password }, cb) => {
        try {
            const response = await fetch(`${host}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ email, password })
                }
            )

            if (response.statusText === "OK") {
                const data = await response.json();
                const token = data.token;
                Cookies.set('token', token, { expires: 10 });
                setUser(data.user);
                setIsAuthenticated(true);
                cb({
                    type: "success",
                    message: "You've logged in successfully!"
                });
            } else {
                const error = await response.json();
                setUser(null);
                setIsAuthenticated(false);
                cb({
                    type: "error",
                    message: error.errors
                });
            }

        } catch {
            setUser(null);
            setIsAuthenticated(false);
            cb({
                type: "error",
                message: "Oops, Some Internal Error Occurred!"
            });
        }
    }

    // Logout User
    const logout = (cb) => {
        Cookies.remove('token');
        setUser(null);
        setIsAuthenticated(false);
        cb();
    }

    return (
        <AuthContext.Provider value={{ register, getUser, user, logout, login, isAuthenticated, checkAuth, userLoading }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthState;