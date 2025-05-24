import swaggerJSDoc from "swagger-jsdoc";

/**
 * @openapi
 * components:
 *   schemas:
 *     Accommodation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Hotel Central"
 *         address:
 *           type: string
 *           example: "Rua das Flores, 123"
 *         description:
 *           type: string
 *           example: "Acomodação confortável no centro da cidade."
 *         availability:
 *           type: boolean
 *           example: true
 *       required:
 *         - name
 *         - address
 *         - description
 *         - availability
 *       example:
 *         name: "Hotel Central"
 *         address: "Rua das Flores, 123"
 *         description: "Acomodação confortável no centro da cidade."
 *         availability: true
 *     EmergencyService:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Hospital Municipal"
 *         phone:
 *           type: string
 *           example: "(11) 99999-9999"
 *         address:
 *           type: string
 *           example: "Av. Saúde, 456"
 *       required:
 *         - name
 *         - phone
 *         - address
 *       example:
 *         name: "Hospital Municipal"
 *         phone: "(11) 99999-9999"
 *         address: "Av. Saúde, 456"
 *     Event:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         title:
 *           type: string
 *           example: "Feira de Profissões"
 *         description:
 *           type: string
 *           example: "Evento para apresentação de cursos."
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-06-01T10:00:00Z"
 *         location:
 *           type: string
 *           example: "Auditório Principal"
 *       required:
 *         - title
 *         - description
 *         - date
 *         - location
 *       example:
 *         title: "Feira de Profissões"
 *         description: "Evento para apresentação de cursos."
 *         date: "2025-06-01T10:00:00Z"
 *         location: "Auditório Principal"
 *     Feedback:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         userId:
 *           type: integer
 *           example: 2
 *         message:
 *           type: string
 *           example: "Ótimo atendimento!"
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: "2025-05-24T12:00:00Z"
 *       required:
 *         - userId
 *         - message
 *       example:
 *         userId: 2
 *         message: "Ótimo atendimento!"
 *     Translation:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         key:
 *           type: string
 *           example: "welcome_message"
 *         value:
 *           type: string
 *           example: "Bem-vindo ao sistema!"
 *         language:
 *           type: string
 *           example: "pt-BR"
 *       required:
 *         - key
 *         - value
 *         - language
 *       example:
 *         key: "welcome_message"
 *         value: "Bem-vindo ao sistema!"
 *         language: "pt-BR"
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "João Silva"
 *         email:
 *           type: string
 *           example: "joao@email.com"
 *         role:
 *           type: string
 *           enum: [admin, user]
 *           example: "user"
 *         userType:
 *           type: string
 *           enum: [normal, student]
 *           example: "student"
 *         isActive:
 *           type: boolean
 *           example: true
 *       required:
 *         - name
 *         - email
 *         - role
 *         - userType
 *       example:
 *         name: "João Silva"
 *         email: "joao@email.com"
 *         role: "user"
 *         userType: "student"
 *     Login:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "joao@email.com"
 *         password:
 *           type: string
 *           example: "senha123"
 *       required:
 *         - email
 *         - password
 *       example:
 *         email: "joao@email.com"
 *         password: "senha123"
 */

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Guidex API",
      version: "1.0.0",
      description: "Documentação da API REST Guidex",
    },
    servers: [
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: [
    "./src/routes/**/*.ts",
    "./src/controllers/**/*.ts",
    "./src/dtos/**/*.ts"
  ],
};

export const swaggerSpec = swaggerJSDoc(options);
