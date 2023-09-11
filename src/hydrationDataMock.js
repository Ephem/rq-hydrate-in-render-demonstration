export const firstState = {
  mutations: [],
  queries: [
    {
      state: {
        data: 100,
        dataUpdateCount: 1,
        dataUpdatedAt: Date.now() - 10,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: false,
        status: "success",
        fetchStatus: "idle"
      },
      queryKey: ["currentPrice"],
      queryHash: '["currentPrice"]'
    },
    {
      state: {
        data: 90,
        dataUpdateCount: 1,
        dataUpdatedAt: Date.now() - 10,
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: false,
        status: "success",
        fetchStatus: "idle"
      },
      queryKey: ["minPriceEver"],
      queryHash: '["minPriceEver"]'
    }
  ]
};

export const secondState = {
  mutations: [],
  queries: [
    {
      state: {
        data: 80,
        dataUpdateCount: 1,
        dataUpdatedAt: Date.now(),
        error: null,
        errorUpdateCount: 0,
        errorUpdatedAt: 0,
        fetchFailureCount: 0,
        fetchFailureReason: null,
        fetchMeta: null,
        isInvalidated: false,
        status: "success",
        fetchStatus: "idle"
      },
      queryKey: ["currentPrice"],
      queryHash: '["currentPrice"]'
    }
  ]
};
