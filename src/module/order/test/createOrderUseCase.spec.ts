import { describe, expect, test } from '@jest/globals';
import { CreateOrderUseCase } from '../createOrderUseCase';
import { Order, OrderStatus } from '../Order';
import { OrderRepository } from '../orderRepository';

class InMemoryOrderRepository implements OrderRepository {
    async save(order: Order): Promise<Order> {
        order.id = 1;
        order.status = OrderStatus.PENDING;
        return order;
    }
}

describe('US-2 : Créer une commande', () => {
    test('Scénario 1 : création réussie', async () => {
        // Étant donné qu\'il n\'y a pas de commande enregistrée
        const orderRepository = new InMemoryOrderRepository();
        const createOrderUseCase = new CreateOrderUseCase(orderRepository);

        const orderCreated = await createOrderUseCase.execute([1, 2, 3], 150);

        // Alors la commande doit être créée avec les bons produits et le bon total
        expect(orderCreated.productIds).toEqual([1, 2, 3]);
        expect(orderCreated.totalPrice).toBe(150);
        expect(orderCreated.id).toBe(1);
        expect(orderCreated.status).toBe(OrderStatus.PENDING);
    });

    test('Scénario 2 : échec, plus de 5 produits', async () => {
        // Étant donné qu\'il n\'y a pas de commande enregistrée
        const orderRepository = new InMemoryOrderRepository();
        const createOrderUseCase = new CreateOrderUseCase(orderRepository);

        await expect(
            // Quand j\'envoie une liste d\'ids de produits avec 6 produits
            createOrderUseCase.execute([1, 2, 3, 4, 5, 6], 200)
            // Alors une erreur doit être renvoyée
        ).rejects.toThrow('An order must contain between 1 and 5 products.');
    });
});
