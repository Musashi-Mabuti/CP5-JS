import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";

const _user = {
    name: "Ana Alface",
    username: "anaalface",
    email: "ana@ana.com",
    urlPhoto: "https://picsum.photos/200/300"
}

export default function FakeUser() {
    const [user, setUser] = useState(_user)

    async function loadUser() {
        try {
            let resp = await fetch("https://randomuser.me/api/")
            let data = await resp.json()
            let fakeUser = data.results[0]
            let _user = {
                name: fakeUser.name.first + " " + fakeUser.name.last,
                email: fakeUser.email,
                username: fakeUser.login.username,
                urlPhoto: fakeUser.picture.medium
            }
            setUser(_user)
        } catch (error) {
            console.error("Erro ao carregar usuário:", error)
        }
    }

    useEffect(() => {
        loadUser()
    }, [])

    return (
        <>
            <div className="flex items-center justify-between gap-1 bg-gray-200 my-1 p-2 rounded">
                <div className="flex items-center gap-2">
                    <div>
                        <img src={user.urlPhoto} alt="" className="w-16 h-16 rounded-lg" />
                    </div>
                    <div className="leading-5">
                        <div className="font-semibold">
                            {user.name}
                        </div>
                        <div>
                            @{user.username}
                        </div>
                        <div className="text-gray-500">
                            {user.email}
                        </div>
                    </div>
                </div>
                <div
                    className="bg-gray-400 p-1 rounded-lg flex items-center cursor-pointer hover:bg-gray-500"
                    onClick={loadUser}
                >
                    <Icon icon="mdi-refresh" className="text-black text-3xl" />
                </div>
            </div>
        </>
    )
}
