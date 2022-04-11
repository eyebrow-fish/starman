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
    currentQueryItem: store => store.queryItems.find(i => i.id === store.selectedId),
  },
  mutations: {
    setSelectedId: (store, value) => store.selectedId = value,
    newQueryItem(store, id) {
      store.queryItems.push({
        ...store.queryItemId,
        id,
        name: 'New query',
        editing: true,
      })
      store.selectedId = id
    },
    removeQueryItem(store, id) {
      store.queryItems.splice(store.queryItems.findIndex(i => i.id === id), 1)
    },
  },
}
