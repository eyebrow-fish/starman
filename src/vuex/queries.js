export default {
  namespaced: true,
  state: {
    queryItemId: {
      id: 0,
      name: '',
      method: 'GET',
      url: '',
      editing: false,
    },
    queryItems: [],
    selectedId: 0,
  },
  getters: {
    currentQueryItem(store) {
      return store.queryItems.find(i => i.id === store.selectedId)
    },
  },
  mutations: {
    setSelectedId(store, value) {
      store.selectedId = value
    },
    newQueryItem(store) {
      const item = {
        ...store.queryItemId,
        id: store.queryItems.length,
        name: 'New query',
        editing: true,
      }
      store.queryItems.push(item)
      return item
    },
  },
}
