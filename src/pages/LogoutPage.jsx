import { redirect } from "react-router-dom";
import { clearToken } from "../utils/auth";

export async function action() {
    clearToken();
    return redirect('/');
}