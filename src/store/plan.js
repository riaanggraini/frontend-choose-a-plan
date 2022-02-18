import { makeObservable, observable, computed, action } from "mobx";
import api from "../service/plan";

class PlanStore {
  plans = [];
  features = [];
  error = null;
  pendingRequests = 0;

  constructor() {
    makeObservable(this, {
      plans: observable,
      error: observable,
      features: observable,
      pendingRequests: observable,
      allPlans: computed,
      allFeatures: computed,
      getPlans: action,
      getPlanFeatures: action,
    });
  }

  getPlans = async () => {
    try {
      const response = await api.plan.fetchAll();
      const data = response.data.data;

      const features = [];

      this.features.map((el) => {
        features.push(el.name);
      });

      const result = await Promise.all(
        data.map((el) => {
          const feature = el.features;
          const rewritedFeatures = [];
          features.map((feat, index) => {
            const data = {
              name: feat,
              availability:
                feature[index] && features.includes(feature[index].name)
                  ? true
                  : false,
            };
            rewritedFeatures.push(data);
          });
          el.features = rewritedFeatures;
          return el;
        })
      );

      this.plans = result;
    } catch (error) {
      this.error = error;
    }
  };

  getPlanFeatures = async () => {
    try {
      const response = await api.plan.fetchAllFeatures();
      this.features = response.data.data;
    } catch (error) {
      this.error = error;
    }
  };

  get allPlans() {
    return this.plans;
  }

  get allFeatures() {
    return this.features;
  }
}

export const planStore = new PlanStore();
