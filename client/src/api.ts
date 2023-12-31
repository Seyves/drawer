import { WSMessage } from "./definitions"

const apipath = `http://${import.meta.env.VITE_SERVER_URL}/api`
const apipathws = `ws://${import.meta.env.VITE_SERVER_URL}/api`

export async function getUsers(name: string) {
    const resp = await fetch(`${apipath}/users`)

    const json = await resp.json() as Record<string, string>

    delete json[name]

    return json
}

export async function getUsersColor(name: string) {
    const resp = await fetch(`${apipath}/color/${name}`)

    return await resp.text() as string
}

export async function getExistingDraws() {
    const resp = await fetch(`${apipath}/draws`)

    return await resp.json() as Record<string, WSMessage[]>
}

export async function getLastPositions(name: string) {
    const resp = await fetch(`${apipath}/last-positions`)

    const json = await resp.json() as Record<string, WSMessage>

    delete json[name]

    return json
}

export class WebsocketClient {
    connection: WebSocket

    constructor(myName: string) {
        this.connection = new WebSocket(`${apipathws}/ws?name=${myName}`)
    }

    send(obj: WSMessage) {
        this.connection.send(JSON.stringify(obj))
    }
}
