import { create } from 'zustand'

type EditedTask = {
    id: number,
    title: string,
}

type State = {
    editedTask: EditedTask
    updatedEditedTask: (payload: EditedTask) => void
    resetEditedTask: () => void
}

const useStore = create<State>((set) => ({
    editedTask: {id: 0, title: ''},
    updatedEditedTask: (payload) =>
        set({
            editedTask: payload,
        }),
    resetEditedTask: () => set({editedTask: {id: 0, title: ''}}
    ),
}))

export default useStore