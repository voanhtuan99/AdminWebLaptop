import { BrowserRouter, Switch, Route } from "react-router-dom";
import Admin from "./components/Layout/admin";
import LoginPage from "./components/Layout/login/login"
export default function Control() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/">
                    <LoginPage />
                </Route>
                <Route path="/login">
                    <LoginPage />
                </Route>
                <Route path="/admin">
                    <Admin />
                </Route>
                <Route path="/user">
                    <div>user</div>
                </Route>
            </Switch>
        </BrowserRouter>
    )
}