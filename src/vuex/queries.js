export default {
  namespaced: true,
  state: {
    queryItems: [
      {
        id: 0,
        name: 'foo',
        method: 'GET',
        url: 'https://ddg.gg/',
      },
      {
        id: 1,
        name: 'bar',
        method: 'GET',
        url: 'https://stackoverflow.com/',
      },
    ],
    selectedId: 0,
    responses: [
      {
        queryItemId: 0,
        status: 'OK',
        statusCode: 200,
        responseTimeMs: 42,
        body: 'qux',
      },
    ],
  },
  getters: {
    currentQueryItem(store) {
      return store.queryItems.find(i => i.id === store.selectedId)
    },
    currentResponse(store) {
      return store.responses.find(i => i.queryItemId === store.selectedId)
    },
  },
  mutations: {
    setSelectedId(store, value) {
      store.selectedId = value
    },
  },
}