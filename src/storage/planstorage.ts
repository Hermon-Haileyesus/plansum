import AsyncStorage from "@react-native-async-storage/async-storage";

export type PlanItem = {
  id: string;
  name: string;
  price: number;
};

export type Plan = {
  id: string;
  name: string;
  items: PlanItem[];
  createdAt: string;
};

export type BudgetData = {
  totalMoney: number;
  plans: Plan[];
};

//STORAGE KEY

const BUDGET_KEY = "budget-data";

// LOAD DATA

export const getBudgetData = async (): Promise<BudgetData> => {
  const data = await AsyncStorage.getItem(BUDGET_KEY);

  return data
    ? JSON.parse(data)
    : {
        totalMoney: 0,
        plans: [],
      };
};

//SAVE DATA

export const saveBudgetData = async (data: BudgetData) => {
  await AsyncStorage.setItem(BUDGET_KEY, JSON.stringify(data));
};

// SET TOTAL MONEY

export const setTotalMoney = async (value: number) => {
  const data = await getBudgetData();
  const updated = { ...data, totalMoney: value };
  await saveBudgetData(updated);
};

// ADD PLAN

export const addPlan = async (name: string): Promise<Plan> => {
  const data = await getBudgetData();

  const newPlan: Plan = {
    id: Date.now().toString(),
    name,
    items: [],
    createdAt: new Date().toISOString(),
  };

  const updated = {
    ...data,
    plans: [newPlan, ...data.plans],
  };

  await saveBudgetData(updated);
  return newPlan;
};

// ADD ITEM TO PLAN

export const addItemToPlan = async (
  planId: string,
  itemName: string,
  price: number,
): Promise<PlanItem> => {
  const data = await getBudgetData();

  const newItem: PlanItem = {
    id: Date.now().toString(),
    name: itemName,
    price,
  };

  const updatedPlans = data.plans.map(
    (plan) =>
      plan.id === planId ? { ...plan, items: [newItem, ...plan.items] } : plan, // NEWEST FIRST
  );

  await saveBudgetData({ ...data, plans: updatedPlans });

  return newItem;
};
export const updatePlanName = async (planId: string, newName: string) => {
  const data = await getBudgetData();

  const updatedPlans = data.plans.map((plan) =>
    plan.id === planId ? { ...plan, name: newName } : plan,
  );

  await saveBudgetData({ ...data, plans: updatedPlans });
};

export const updateItemInPlan = async (
  planId: string,
  itemId: string,
  name: string,
  price: number,
) => {
  const data = await getBudgetData();

  const updatedPlans = data.plans.map((plan) =>
    plan.id === planId
      ? {
          ...plan,
          items: plan.items.map((item) =>
            item.id === itemId ? { ...item, name, price } : item,
          ),
        }
      : plan,
  );

  await saveBudgetData({ ...data, plans: updatedPlans });
};

// DELETE ITEM

export const deleteItemFromPlan = async (planId: string, itemId: string) => {
  const data = await getBudgetData();

  const updatedPlans = data.plans.map((plan) =>
    plan.id === planId
      ? { ...plan, items: plan.items.filter((item) => item.id !== itemId) }
      : plan,
  );

  await saveBudgetData({ ...data, plans: updatedPlans });
};

// DELETE PLAN

export const deletePlan = async (planId: string) => {
  const data = await getBudgetData();

  const updatedPlans = data.plans.filter((plan) => plan.id !== planId);

  await saveBudgetData({ ...data, plans: updatedPlans });
};
