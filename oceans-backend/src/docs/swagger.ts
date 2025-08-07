import swaggerJsdoc from 'swagger-jsdoc';

export const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Oceans Restaurant API',
      version: '1.0.0',
      description: 'Documentación de API para la prueba técnica',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      schemas: {
        Product: {
          type: 'object',
          required: ['name', 'price', 'quantity'],
          properties: {
            id: { type: 'string' },
            name: { type: 'string' },
            description: { type: 'string' },
            price: { type: 'number' },
            image: { type: 'string' },
            quantity: { type: 'number' },
          },
        },
        Order: {
          type: 'object',
          required: ['products', 'createdBy'],
          properties: {
            id: { type: 'string' },
            products: {
              type: 'array',
              items: { $ref: '#/components/schemas/Product' },
            },
            total: { type: 'number' },
            closed: { type: 'boolean' },
            createdBy: { type: 'string' },
            createdAt: { type: 'string' },
          },
        },
        User: {
          type: 'object',
          required: ['email', 'role', 'username'],
          properties: {
            id: { type: 'string' },
            email: { type: 'string' },
            role: { type: 'string' },
            username: { type: 'string' },
            password: { type: 'string' },
          },
        },
      },
    },
    servers: [{ url: 'http://localhost:3000', description: 'Servidor local' }],
    security: [{ bearerAuth: [] }],
  },
  apis: ['src/routes/*.ts'],
};
