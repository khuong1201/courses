const API_URL = 'http://localhost:3000/api/v1';

async function request(endpoint, method = 'GET', body = null, token = null) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const options = { method, headers };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${API_URL}${endpoint}`, options);
  const data = await res.json().catch(() => null);
  
  if (!res.ok) {
    throw new Error(`[${method}] ${endpoint} failed: ${res.status} - ${JSON.stringify(data)}`);
  }
  return data;
}

async function runTests() {
  console.log('--- STARTING E2E API TESTS ---\\n');

  try {
    const timestamp = Date.now();
    const instructorEmail = `instructor_${timestamp}@test.com`;
    const studentEmail = `student_${timestamp}@test.com`;

    // 1. Register Instructor
    console.log('1. Registering Instructor...');
    await request('/auth/register', 'POST', {
      email: instructorEmail,
      password: 'password123',
      fullName: 'Test Instructor',
      role: 'INSTRUCTOR'
    });

    // 2. Register Student
    console.log('2. Registering Student...');
    await request('/auth/register', 'POST', {
      email: studentEmail,
      password: 'password123',
      fullName: 'Test Student',
      role: 'STUDENT'
    });

    // 3. Login Instructor
    console.log('3. Logging in as Instructor...');
    const instructorLogin = await request('/auth/login', 'POST', {
      email: instructorEmail,
      password: 'password123'
    });
    const instructorToken = instructorLogin.access_token;

    // 4. Login Student
    console.log('4. Logging in as Student...');
    const studentLogin = await request('/auth/login', 'POST', {
      email: studentEmail,
      password: 'password123'
    });
    const studentToken = studentLogin.access_token;

    // 5. Create Course
    console.log('5. Creating Course (Draft)...');
    const course = await request('/courses', 'POST', {
      title: 'E2E Test Course',
      category: 'QA',
      price: 99
    }, instructorToken);
    const courseId = course.id;

    // 6. List My Courses (Instructor)
    console.log('6. Fetching Instructor Courses...');
    const myCourses = await request('/courses/my-courses', 'GET', null, instructorToken);
    if (!myCourses.some(c => c.id === courseId)) throw new Error('Course not found in my-courses');

    // 7. Create Module
    console.log('7. Creating Course Module...');
    const module = await request(`/curriculum/courses/${courseId}/modules`, 'POST', {
      title: 'Module 1: Getting Started',
      order: 1
    }, instructorToken);
    const moduleId = module.id;

    // 8. Create Lesson
    console.log('8. Creating Lesson in Module...');
    const lesson = await request(`/curriculum/modules/${moduleId}/lessons`, 'POST', {
      title: 'Lesson 1: Introduction',
      contentType: 'VIDEO',
      videoUrl: 'https://youtube.com/test',
      order: 1
    }, instructorToken);
    const lessonId = lesson.id;

    // 9. Update Course
    console.log('9. Updating Course Details...');
    await request(`/courses/${courseId}`, 'PATCH', {
      price: 149
    }, instructorToken);

    // 10. Publish Course
    console.log('10. Publishing Course...');
    await request(`/courses/${courseId}/publish`, 'PATCH', null, instructorToken);

    // 11. Public: Get Course Details
    console.log('11. Fetching Public Course details...');
    const publicCourse = await request(`/courses/${courseId}`, 'GET');
    if (publicCourse.status !== 'PUBLISHED') throw new Error('Course is not published');

    // 12. Student Enroll
    console.log('12. Student Enrolling in Course...');
    const enrollment = await request(`/enrollments/${courseId}`, 'POST', null, studentToken);
    const enrollmentId = enrollment.id;

    // 13. Student My Learning
    console.log('13. Fetching Student Learning List...');
    const myLearning = await request('/enrollments/my-learning', 'GET', null, studentToken);
    if (!myLearning.some(e => e.course_id === courseId)) throw new Error('Enrollment not found in my-learning');

    // 14. Mark Lesson Completed
    console.log('14. Student Marking Lesson as Completed...');
    await request(`/enrollments/${enrollmentId}/lessons/${lessonId}/complete`, 'POST', null, studentToken);

    console.log('\\n✅ ALL TESTS PASSED SUCCESSFULLY! ✅\\n');
  } catch (err) {
    console.error(`\\n❌ TEST FAILED: ${err.message}\\n`);
    process.exit(1);
  }
}

runTests();
