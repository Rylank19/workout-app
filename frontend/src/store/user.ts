import {create} from "zustand"

// this file essentially connects to our backend methods to manipulate data on the server

interface MyState {
    userID : string,
}

export const useUserStore = create<MyState>(() => ({
    userID: "6814ef4fc67cf8e436f477b9",
})) // this is a callback ( the brackets mean we are returning an object)