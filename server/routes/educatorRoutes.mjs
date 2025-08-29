import express from 'express'
import {addCourse, updateRoleToEducator,getEducatorCourses, educatorDashboardData, getEnrolledStudentsData} from '../controllers/educatorController.mjs'
import upload from '../configs/multer.mjs'
import { protectEducator } from '../middlewares/authmiddleware.mjs'


const educatorRouter=express.Router()

educatorRouter.get('/update-role',updateRoleToEducator)
educatorRouter.post('/add-course',upload.single('image'),protectEducator,addCourse)
educatorRouter.get('/courses',protectEducator,getEducatorCourses)
educatorRouter.get('/dashboard',protectEducator,educatorDashboardData);
educatorRouter.get('/enrolled-students',protectEducator,getEnrolledStudentsData);

export default educatorRouter