import {create} from "zustand"

// this file essentially connects to our backend methods to manipulate data on the server

interface MyState {
    userID : string,
    currentDay : number,
}

export const useUserStore = create<MyState>(() => ({
    userID: "6814ef4fc67cf8e436f477b9",
    currentDay : new Date().getDay(), // 0 is Sunday, 1 is Monday, etc.
})) // this is a callback ( the brackets mean we are returning an object)