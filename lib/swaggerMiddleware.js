import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.4",
    info: {
      title: "NodeApp API",
      version: "1.0.0",
    },
  },
  apis: ["swagger.yaml"],
};

const specification = swaggerJSDoc(options);

export default [swaggerUi.serve, swaggerUi.setup(specification)];
