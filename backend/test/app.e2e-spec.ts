import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('LMS Backend E2E (app.e2e-spec.ts)', () => {
  let app: INestApplication;
  let instructorToken: string;
  let studentToken: string;
  let courseId: string;
  let moduleId: string;
  let lessonId: string;
  let enrollmentId: string;

  const timestamp = Date.now();
  const instructorEmail = `instructor${timestamp}@test.com`;
  const studentEmail = `student${timestamp}@test.com`;
  const password = 'password123';

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
      }),
    );
    app.setGlobalPrefix('api/v1');
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('1. Authentication (/api/v1/auth)', () => {
    it('should register an Instructor', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: instructorEmail,
          password: password,
          fullName: 'Test Instructor',
          role: 'INSTRUCTOR',
        })
        .expect(201)
        .then((res) => {
          expect(res.body.email).toEqual(instructorEmail);
        });
    });

    it('should register a Student', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/register')
        .send({
          email: studentEmail,
          password: password,
          fullName: 'Test Student',
          role: 'STUDENT',
        })
        .expect(201);
    });

    it('should login Instructor and get access token', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: instructorEmail,
          password: password,
        })
        .expect(201)
        .then((res) => {
          expect(res.body.access_token).toBeDefined();
          instructorToken = res.body.access_token;
        });
    });

    it('should login Student and get access token', () => {
      return request(app.getHttpServer())
        .post('/api/v1/auth/login')
        .send({
          email: studentEmail,
          password: password,
        })
        .expect(201)
        .then((res) => {
          studentToken = res.body.access_token;
        });
    });
  });

  describe('2. Courses Management (/api/v1/courses)', () => {
    it('Instructor creates a course', () => {
      return request(app.getHttpServer())
        .post('/api/v1/courses')
        .set('Authorization', `Bearer ${instructorToken}`)
        .send({
          title: 'E2E Testing Masterclass',
          category: 'Software Engineering',
          price: 50,
        })
        .expect(201)
        .then((res) => {
          expect(res.body.id).toBeDefined();
          courseId = res.body.id;
        });
    });

    it('Instructor sees their course in my-courses', () => {
      return request(app.getHttpServer())
        .get('/api/v1/courses/my-courses')
        .set('Authorization', `Bearer ${instructorToken}`)
        .expect(200)
        .then((res) => {
          expect(Array.isArray(res.body)).toBe(true);
          const found = res.body.find((c: any) => c.id === courseId);
          expect(found).toBeDefined();
        });
    });

    it('Student cannot update the course (Forbidden)', () => {
      return request(app.getHttpServer())
        .patch(`/api/v1/courses/${courseId}`)
        .set('Authorization', `Bearer ${studentToken}`)
        .send({ price: 100 })
        .expect(403);
    });
    
    it('Instructor updates their course info', () => {
      return request(app.getHttpServer())
        .patch(`/api/v1/courses/${courseId}`)
        .set('Authorization', `Bearer ${instructorToken}`)
        .send({ price: 100 })
        .expect(200)
        .then((res) => {
          expect(res.body.price).toEqual(100);
        });
    });
  });

  describe('3. Curriculum Management (/api/v1/curriculum)', () => {
    it('Instructor adds a module to course', () => {
      return request(app.getHttpServer())
        .post(`/api/v1/curriculum/courses/${courseId}/modules`)
        .set('Authorization', `Bearer ${instructorToken}`)
        .send({
          title: 'Module 1: Intro to E2E',
          order: 1,
        })
        .expect(201)
        .then((res) => {
          expect(res.body.id).toBeDefined();
          moduleId = res.body.id;
        });
    });

    it('Instructor adds a lesson to the module', () => {
      return request(app.getHttpServer())
        .post(`/api/v1/curriculum/modules/${moduleId}/lessons`)
        .set('Authorization', `Bearer ${instructorToken}`)
        .send({
          title: 'Lesson 1: The Basics',
          contentType: 'VIDEO',
          videoUrl: 'http://example.com/vid',
          order: 1,
        })
        .expect(201)
        .then((res) => {
          expect(res.body.id).toBeDefined();
          lessonId = res.body.id;
        });
    });
  });

  describe('4. Finalizing Course', () => {
    it('Instructor publishes the course', () => {
      return request(app.getHttpServer())
        .patch(`/api/v1/courses/${courseId}/publish`)
        .set('Authorization', `Bearer ${instructorToken}`)
        .expect(200)
        .then((res) => {
          expect(res.body.status).toEqual('PUBLISHED');
        });
    });

    it('Anyone can list the published course', () => {
      return request(app.getHttpServer())
        .get('/api/v1/courses')
        .expect(200)
        .then((res) => {
          const found = res.body.find((c: any) => c.id === courseId);
          expect(found).toBeDefined();
        });
    });
  });

  describe('5. Enrollments & Progress (/api/v1/enrollments)', () => {
    it('Student enrolls into the course', () => {
      return request(app.getHttpServer())
        .post(`/api/v1/enrollments/${courseId}`)
        .set('Authorization', `Bearer ${studentToken}`)
        .expect(201)
        .then((res) => {
          expect(res.body.id).toBeDefined();
          enrollmentId = res.body.id;
        });
    });

    it('Student fetches their learning list', () => {
      return request(app.getHttpServer())
        .get('/api/v1/enrollments/my-learning')
        .set('Authorization', `Bearer ${studentToken}`)
        .expect(200)
        .then((res) => {
          const found = res.body.find((e: any) => e.course_id === courseId);
          expect(found).toBeDefined();
        });
    });

    it('Student marks lesson as completed', () => {
      return request(app.getHttpServer())
        .post(`/api/v1/enrollments/${enrollmentId}/lessons/${lessonId}/complete`)
        .set('Authorization', `Bearer ${studentToken}`)
        .expect(201)
        .then((res) => {
          expect(res.body.success).toBe(true);
        });
    });
    
    it('Student cannot mark lesson of someone else enrollment (IDOR defense check)', () => {
      // Create a spoof token 
      // But actually just try to hit another person's enrollment with instructor's token
      return request(app.getHttpServer())
        .post(`/api/v1/enrollments/${enrollmentId}/lessons/${lessonId}/complete`)
        .set('Authorization', `Bearer ${instructorToken}`) // Instructor isn't the student
        .expect(403);
    });
  });
});
