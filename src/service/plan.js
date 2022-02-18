import api from './api';

export default {
  plan: {
    fetchAll: () => api.get("/v1/plans"),
    fetchAllFeatures: () => api.get("/v1/plan/features"),
  },
};
