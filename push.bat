@echo off
git init
git add .
git commit -m "feat: complete LMS backend initial architecture"
git branch -M main
git remote remove origin 2>nul
git remote add origin https://github.com/khuong1201/courses.git
git push -u origin main
