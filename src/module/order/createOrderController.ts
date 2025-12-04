import { Request, Response } from 'express';
import { CreateOrderUseCase } from './createOrderUseCase';
import { OrderRepository } from './orderRepository';

const express = require('express');
const router = express.Router();

router.post('/order', async (request: Request, response: Response) => {
    const { productIds, totalPrice } = request.body as { productIds: number[]; totalPrice: number };

    const orderRepository = new OrderRepository();
    const createOrderUseCase = new CreateOrderUseCase(orderRepository);

    try {
        const order = await createOrderUseCase.execute(productIds, totalPrice);
        return response.status(201).json(order);
    } catch (error) {
        if (error instanceof Error) {
            return response.status(400).json({ message: error.message });
        }

        return response.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
