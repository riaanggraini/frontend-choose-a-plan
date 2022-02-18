import { makeObservable, observable, computed, action } from "mobx";
import api from "../service/plan";

class PlanStore {
  plans = [];
  features = [];
  error = null;
  success = null;

  constructor() {
    makeObservable(this, {
      plans: observable,
      error: observable,
      features: observable,
      success: observable,
      allPlans: computed,
      allFeatures: computed,
      successMessage: computed,
      getPlans: action,
      getPlanFeatures: action,
      suscribePlan: action,
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
      this.error = error.response.data.message;
    }
  };

  getPlanFeatures = async () => {
    try {
      const response = await api.plan.fetchAllFeatures();
      this.features = response.data.data;
    } catch (error) {
      this.error = error.response.data.message;
    }
  };

  suscribePlan = async (id) => {
    try {
      const data = { plan_id: id };
      const resp = await api.plan.subscribePlan(data);
      this.success = resp.data.message;
    } catch (error) {
      this.error = error.response.data.message;
    }
  };

  get allPlans() {
    return this.plans;
  }

  get allFeatures() {
    return this.features;
  }

  get errorMessage() {
    return this.error;
  }

  get successMessage() {
    return this.success;
  }
}

export const planStore = new PlanStore();
