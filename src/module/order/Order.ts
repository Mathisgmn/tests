import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum OrderStatus {
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELLED = 'CANCELLED'
}

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column('simple-array')
    public productIds: number[];

    @Column({ type: 'float' })
    public totalPrice: number;

    @CreateDateColumn({ type: 'timestamptz' })
    public createdAt: Date;

    @Column({ type: 'enum', enum: OrderStatus, default: OrderStatus.PENDING })
    public status: OrderStatus;

    constructor(productsIds: number[], totalPrice: number) {
        if (productsIds.length < 1 || productsIds.length > 5) {
            throw new Error('An order must contain between 1 and 5 products.');
        }

        if (totalPrice < 2 || totalPrice > 500) {
            throw new Error('Total price must be between 2 and 500.');
        }

        this.status = OrderStatus.PENDING;
        this.totalPrice = totalPrice;
        this.productIds = productsIds;
    }
}
