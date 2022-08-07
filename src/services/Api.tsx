import { User } from "../components/pages/Account/Account";

const baseUrl: string = "http://localhost:4000";


export default class Api {

    static async get<T>(path: string): Promise<T> {
        const response = await fetch(`${baseUrl}/${path}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        return await response.json();
    }

    static async getAll<T>(path: string): Promise<T[]> {
        const response = await fetch(`${baseUrl}/${path}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        return await response.json();
    }

    static async getById<T>(path: string, id: string): Promise<T> {
        const response = await fetch(`${baseUrl}/${path}/${id}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        return await response.json();
    }

    static async create<T>(path: string, body?: User): Promise<T> {
        const response = await fetch(`${baseUrl}/${path}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return await response.json();
    }

    static async change<T>(path: string, id: string, body: User): Promise<T> {
        const response = await fetch(`${baseUrl}/${path}/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });
        return await response.json();
    }

    static async delete<T>(path: string, id: string): Promise<T[]> {
        const response = await fetch(`${baseUrl}/${path}/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        });
        return await response.json();
    }
}
