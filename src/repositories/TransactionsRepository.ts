import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const incomes = this.transactions
      .filter(({ type }) => type === 'income')
      .reduce((acc, curr) => {
        return acc + curr.value;
      }, 0);
    const outcomes = this.transactions
      .filter(({ type }) => type === 'outcome')
      .reduce((acc, curr) => {
        return acc + curr.value;
      }, 0);
    const balance = {
      income: incomes,
      outcome: outcomes,
      total: incomes - outcomes,
    };

    return balance;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
