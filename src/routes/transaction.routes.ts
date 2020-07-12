import { Router, json } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

const transactionRouter = Router();
transactionRouter.use(json());
const transactionsRepository = new TransactionsRepository();

transactionRouter.get('/', (request, response) => {
  try {
    const allTransactions = transactionsRepository.all();
    const transactionWithBalance = {
      transactions: allTransactions,
      balance: transactionsRepository.getBalance(),
    };
    return response.status(200).json(transactionWithBalance);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const createTransactionService = new CreateTransactionService(
      transactionsRepository,
    );
    const transaction = createTransactionService.execute({
      title,
      value,
      type,
    });
    return response.status(200).json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
