import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import ProjectPage from '@/views/ProjectPage.vue'
// import ProjectIndexPage from '@/views/ProjectIndexPage.vue'
// import ProjectDetailsPage from '@/views/ProjectDetailsPage.vue'
// import EditorPage from '@/views/EditorPage.vue'
// import EditorMarkdownPage from '@/views/EditorMarkdownPage.vue'
import RecipePage from '@/views/RecipePage.vue'

import ProjectClarentPage from '@/views/projects/clarent.vue'
import ProjectTripodPage from '@/views/projects/tripod.vue'
import ProjectCarwennanPage from '@/views/projects/carwennan.vue'
import ProjectHomeAutomationPage from '@/views/projects/home_automation.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage,
        },
        {
            path: '/projects',
            name: 'Projects',
            component: ProjectPage,
        },
        // {
        //     path: '/editor',
        //     name: 'Editor',
        //     component: EditorPage,
        // },
        {
            path: '/recipes',
            name: 'Recipes',
            component: RecipePage,
        },
        // {
        //     path: '/projects/:projectName',
        //     name: 'ProjectIndex',
        //     component: ProjectIndexPage,
        //     meta: {
        //         home: "/",
        //         projects: "/projects",
        //     }
        // },
        {
            path: '/projects/clarent',
            name: 'ProjectClarent',
            component: ProjectClarentPage,
            meta: {
                home: "/",
                projects: "/projects",
            }
        },
        {
            path: '/projects/tripod',
            name: 'ProjectTripod',
            component: ProjectTripodPage,
            meta: {
                home: "/",
                projects: "/projects",
            }
        },
        {
            path: '/projects/carwennan',
            name: 'ProjectCarwennan',
            component: ProjectCarwennanPage,
            meta: {
                home: "/",
                projects: "/projects",
            }
        },
        {
            path: '/projects/home_automation',
            name: 'ProjectHomeAutomation',
            component: ProjectHomeAutomationPage,
            meta: {
                home: "/",
                projects: "/projects",
            }
        },
        // {
        //     path: '/projects/:projectName/:blogName',
        //     name: 'ProjectDetails',
        //     component: ProjectDetailsPage,
        //     meta: {
        //         home: "/",
        //         projects: "/projects",
        //     }
        // },
        // {
        //     path: '/projects/:projectName/clarent',
        //     name: 'Clarent',
        //     component: ProjectDetailsPage,
        //     meta: {
        //         home: "/",
        //         projects: "/projects",
        //     }
        // },
        // {
        //     path: '/editor/markdown',
        //     name: 'EditorMarkdownPage',
        //     component: EditorMarkdownPage,
        //     //meta: {
        //     //    home: "/",
        //     //    projects: "/projects",
        //     //}
        // },
        //{
        //    path: '/editor/blogs/:blogName',
        //    name: 'EditorBlogs',
        //    component: ProjectIndexPage,
        //    meta: {
        //        home: "/",
        //        projects: "/projects",
        //    }
        //},
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (About.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import('../views/AboutView.vue')
        // }
    ]
})

export default router
