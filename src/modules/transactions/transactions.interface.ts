export interface Chart {
  amount: number;
  date: Date;
}

export interface Analytic {
  totalTransaction: number;
  totalAmount: number;
  totalCustomers: number;
  chart: Chart[];
}
