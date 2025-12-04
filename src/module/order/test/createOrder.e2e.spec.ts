import { afterAll, beforeAll, describe, expect, test } from '@jest/globals';
import { PostgreSqlContainer, StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { DataSource } from 'typeorm';
import request from 'supertest';
import { Express } from 'express';
import { buildApp } from '../../../config/app';
import { Order, OrderStatus } from '../Order';

describe('US-2 : Créer une commande - E2E', () => {
    let container: StartedPostgreSqlContainer;
    let dataSource: DataSource;
    let app: Express;

    beforeAll(async () => {
        container = await new PostgreSqlContainer('postgres:16').withExposedPorts(5432).start();

        dataSource = new DataSource({
            type: 'postgres',
            host: container.getHost(),
            port: container.getPort(),
            username: container.getUsername(),
            password: container.getPassword(),
            database: container.getDatabase(),
            logging: false,
            entities: [Order],
            synchronize: true,
            entitySkipConstructor: true
        });

        await dataSource.initialize();

        const AppDataSource = require('../../../config/db.config').default;
        Object.assign(AppDataSource, dataSource);

        app = buildApp();
    });

    afterAll(async () => {
        if (dataSource?.isInitialized) {
            await dataSource.destroy();
        }
        if (container) {
            await container.stop();
        }
    });

    test('Scénario 1 : création réussie', async () => {
        await dataSource.getRepository(Order).clear();

        const response = await request(app)
            .post('/api/order')
            .send({
                productIds: [1, 2, 3],
                totalPrice: 150
            })
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(201);
        const orders = await dataSource.getRepository(Order).find();
        expect(orders).toHaveLength(1);
        expect(orders[0].productIds).toEqual(['1', '2', '3']);
        expect(orders[0].totalPrice).toBe(150);
        expect(orders[0].status).toBe(OrderStatus.PENDING);
    });

    test('Scénario 2 : échec, plus de 5 produits', async () => {
        await dataSource.getRepository(Order).clear();

        const response = await request(app)
            .post('/api/order')
            .send({
                productIds: [1, 2, 3, 4, 5, 6],
                totalPrice: 200
            })
            .set('Content-Type', 'application/json');

        expect(response.status).toBe(400);
        expect(response.body.message).toBe('An order must contain between 1 and 5 products.');

        const orders = await dataSource.getRepository(Order).find();
        expect(orders).toHaveLength(0);
    });
});
