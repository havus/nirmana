import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import EditProject from '../views/projects/EditProjectView.vue'
import NewProject from '../views/projects/NewProjectView.vue'
import ProjectsListView from '../views/projects/ProjectsListView.vue'
import LoginView from '../views/auth/LoginView.vue'
import RegisterView from '../views/auth/RegisterView.vue'
import VerifyEmailView from '../views/auth/VerifyEmailView.vue'
import ProfileView from '../views/profiles/ProfileView.vue'
import ForgotPasswordView from '../views/auth/ForgotPasswordView.vue'
import ResetPasswordView from '../views/auth/ResetPasswordView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects/:id/edit',
      name: 'projects-edit',
      component: EditProject,
      props: true,
    },
    {
      path: '/projects/new',
      name: 'projects-new',
      component: NewProject,
    },
    {
      path: '/projects',
      name: 'projects',
      component: ProjectsListView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    },
    {
      path: '/verify-email',
      name: 'verify-email',
      component: VerifyEmailView,
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
    },
    {
      path: '/forgot-password',
      name: 'forgot-password',
      component: ForgotPasswordView,
    },
    {
      path: '/reset-password',
      name: 'reset-password',
      component: ResetPasswordView,
    },
  ],
})

export default router
