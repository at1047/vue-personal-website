import { createRouter, createWebHistory } from 'vue-router'
import { waitForScroll } from '@/utils/scrollResolver';

import HomePage from '@/views/HomePage.vue'
import ProjectPage from '@/views/ProjectPage.vue'
// import ProjectIndexPage from '@/views/ProjectIndexPage.vue'
// import ProjectDetailsPage from '@/views/ProjectDetailsPage.vue'
// import EditorPage from '@/views/EditorPage.vue'
// import EditorMarkdownPage from '@/views/EditorMarkdownPage.vue'
import RecipePage from '@/views/RecipePage.vue'
import BlogPage from '@/views/BlogPage.vue'

import ProjectClarentPage from '@/views/projects/clarent.vue'
import ProjectClarentEngineeringDecisionsPage from '@/views/projects/clarent_engineering_decisions.vue'
import ProjectTripodPage from '@/views/projects/tripod.vue'
import ProjectCarwennanPage from '@/views/projects/carwennan.vue'
import ProjectHomeAutomationPage from '@/views/projects/home_automation.vue'
import ProjectJumpingLegPage from '@/views/projects/jumping_leg.vue'

import BlogProbabilityDistributionPage from '@/views/blog/probability-distribution.vue'
import BlogSettersMindsetPage from '@/views/blog/setters-mindset.vue'
import BlogDefiningVolleyballSetsPage from '@/views/blog/defining-volleyball-sets.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: HomePage,
        },
        // {
        //     path: '/editor',
        //     name: 'Editor',
        //     component: EditorPage,
        // },
        {
            path: '/projects',
            name: 'Projects',
            component: ProjectPage,
        },
        {
            path: '/recipes',
            name: 'Recipes',
            component: RecipePage,
        },
        {
            path: '/blog',
            name: 'Blog',
            component: BlogPage,
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
            path: '/projects/clarent/engineering_decisions',
            name: 'ProjectClarentEngineeringDecisions',
            component: ProjectClarentEngineeringDecisionsPage,
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
        {
            path: '/projects/jumping_leg',
            name: 'ProjectJumpingLeg',
            component: ProjectJumpingLegPage,
            meta: {
                home: "/",
                projects: "/projects",
            }
        },
    {
      path: '/blog/probability-distribution',
      name: 'BlogProbabilityDistribution',
      component: BlogProbabilityDistributionPage,
      meta: {
        home: "/",
        blog: "/blog",
      }
    },
    {
      path: '/blog/setters-mindset',
      name: 'BlogSettersMindset',
      component: BlogSettersMindsetPage,
      meta: {
        home: "/",
        blog: "/blog",
      }
    },
    {
      path: '/blog/defining-volleyball-sets',
      name: 'BlogDefiningVolleyballSets',
      component: BlogDefiningVolleyballSetsPage,
      meta: {
        home: "/",
        blog: "/blog",
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
  ],

  async scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      // 1. Wait for the component to say "I'm ready!"
      await waitForScroll();
      
      // 2. Optional: Add a tiny delay for the browser to paint the DOM
      // (sometimes the data is there, but the height hasn't updated yet)
      await new Promise(r => setTimeout(r, 50)); 

      return savedPosition;
    }
    
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' };
    }

    return { top: 0 };
  }
    
})

export default router
