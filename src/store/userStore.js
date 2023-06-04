import { create } from 'zustand'

import { devtools, persist } from 'zustand/middleware'

const userStore = (set) => ({
  user: null,
  setUser: (user) => {
    set(() => ({
      user: user
    }))
  },
  removeUser: () => {
    set(() => ({
      user: null
    }))
  }
})

const useUserStore = create(
  devtools(
    persist(userStore, {
      name: 'user'
    })
  )
)

export default useUserStore
