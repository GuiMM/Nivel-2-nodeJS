import { uuid } from 'uuidv4';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}
interface TransactionDTO {
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

  private getSumTransaction(type: 'income' | 'outcome'): number {
    const filtered = this.transactions.filter(x => x.type === type);
    const sum = filtered.reduce((total, curr) => {
      return total + curr.value;
    }, 0);
    return sum;
  }

  public getBalance(): Balance {
    const incomeTransactions = this.getSumTransaction('income');
    const outcomeTransactions = this.getSumTransaction('outcome');
    const currBalance = {
      income: incomeTransactions,
      outcome: outcomeTransactions,
      total: incomeTransactions - outcomeTransactions,
    };
    return currBalance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const newTransaction = { id: uuid(), title, value, type };
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
