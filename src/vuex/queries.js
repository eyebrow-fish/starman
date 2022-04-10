export default {
  namespaced: true,
  state: {
    queryItems: [
      {
        id: 0,
        name: 'foo',
        method: 'GET',
        url: 'https://ddg.gg/',
        response: {
          status: 'OK',
          statusCode: 200,
          responseTimeMs: 42,
          body: 'qux',
        },
      },
      {
        id: 1,
        name: 'bar',
        method: 'GET',
        url: 'https://stackoverflow.com/',
      },
    ],
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
  },
}