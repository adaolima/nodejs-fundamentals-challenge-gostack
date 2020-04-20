import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface BalanceTransactions {
  transactions: Transaction[];
  balance: Balance;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): BalanceTransactions {
    const { transactions } = this;
    const balance = this.getBalance();
    const balanceTransactions = {
      transactions,
      balance,
    };
    return balanceTransactions;
  }

  public getBalance(): Balance {
    const reducer = (accumulator: number, currentValue: number): number =>
      accumulator + currentValue;
    const income = this.transactions
      .filter(item => item.type === 'income')
      .map(item => item.value)
      .reduce(reducer, 0);
    const outcome = this.transactions
      .filter(item => item.type === 'outcome')
      .map(item => item.value)
      .reduce(reducer, 0);
    const total = income - outcome;
    const balance = {
      income,
      outcome,
      total,
    };
    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
