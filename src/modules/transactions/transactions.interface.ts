export interface Chart {
  amount: number;
  date: Date;
}

export interface Predict {
  date: string;
  amount?: number;
  sma?: number;
  predict?: number;
}

export interface Analytic {
  totalTransaction: number;
  totalAmount: number;
  totalCustomers: number;
  chart: Chart[];
}
