import AppDataSource from '../../config/db.config';
import { Order } from './Order';

export class OrderRepository {
    async save(order: Order): Promise<Order> {
        const typeOrmRepository = AppDataSource.getRepository<Order>(Order);
        return typeOrmRepository.save(order);
    }
}
