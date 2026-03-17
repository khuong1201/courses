import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ─── Global Validation Pipe ──────────────────────────────────────────────
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // Strip unknown properties
      forbidNonWhitelisted: true, // Throw error on unknown properties
      transform: true,        // Auto-cast params to DTO types
    }),
  );

  // ─── CORS ─────────────────────────────────────────────────────────────────
  app.enableCors();

  // ─── Global API Prefix ────────────────────────────────────────────────────
  app.setGlobalPrefix('api/v1');

  // ─── Swagger / OpenAPI ────────────────────────────────────────────────────
  const config = new DocumentBuilder()
    .setTitle('LMS Backend API')
    .setDescription(
      `## Learning Management System — REST API
      
#### Authentication
All protected endpoints require a Bearer token obtained from \`POST /api/v1/auth/login\`.
Click **Authorize** and enter: \`Bearer <your_token>\`

#### Roles
| Role | Access |
|------|--------|
| \`STUDENT\` | Browse & enroll in courses, track progress |
| \`INSTRUCTOR\` | Create & manage courses, modules, lessons |
| \`ADMIN\` | Full system access |
      `,
    )
    .setVersion('1.0.0')
    .addServer('http://localhost:3000', 'Local Development')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        description: 'Enter your JWT token obtained from POST /auth/login',
      },
      'JWT-auth',
    )
    .setContact('LMS Team', '', 'support@lms.example.com')
    .setLicense('MIT', 'https://opensource.org/licenses/MIT')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api/docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,   // Keep auth token across page refreshes
      docExpansion: 'list',         // Expand tag list on load
      filter: true,                 // Enable endpoint search bar
      showRequestDuration: true,    // Show request time
      defaultModelsExpandDepth: 2,  // Expand schema models
    },
    customSiteTitle: 'LMS API Docs',
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`\n🚀 Server running on http://localhost:${process.env.PORT ?? 3000}`);
  console.log(`📖 Swagger docs: http://localhost:${process.env.PORT ?? 3000}/api/docs\n`);
}
bootstrap();
