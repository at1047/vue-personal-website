<template>
  <div class="projects-container">
    <div class="section-headers">
      <h2 class="section-title">Blog</h2>
    </div>

    <div class="all-projects">
      <!-- Vue Component Links -->
      <div class="card">
        <router-link to="/blog/setters-mindset" class="menu-item">
          <h3 class="text text-h3">A Setter's Mindset</h3>
          <div class="right-content">
            <p>10-02-2025</p>
          </div>
        </router-link>
      </div>
      
      <div class="card">
        <router-link to="/blog/defining-volleyball-sets" class="menu-item">
          <h3 class="text text-h3">Defining Volleyball Sets</h3>
          <div class="right-content">
            <p>06-17-2025</p>
          </div>
        </router-link>
      </div>

      <!-- Popup-based posts (if any) -->
      <div 
        v-for="post in posts" 
        :key="post.id"
        class="card"
        :style="`--bias-left: ${post.biasLeft}; --bias-right: ${post.biasRight};`"
      >
        <div class="menu-item" @click="openPopup(post.id)">
          <h3 class="text text-h3">{{ post.title }}</h3>
          <div class="right-content">
            <p>{{ post.description }}</p>
            <p v-if="post.date">{{ post.date }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-if="showPopup" class="popup-overlay" @click="closePopup">
      <div class="popup-content" @click.stop>
        <div class="popup-header">
          <h2>{{ currentPost.title }}</h2>
          <button class="popup-close" @click="closePopup">&times;</button>
        </div>
        <div class="popup-body">
          <div class="popup-details-content markdown" v-html="markdownHtml"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

    import { defineComponent } from 'vue';
    import { markdownToHtml, fetchMarkdown } from '@/utils/markdownUtils.js';

    export default defineComponent({
        name: 'Blog',
        data() {
            return {
                posts: [],
                showPopup: false,
                currentPost: {
                    id: '',
                    title: '',
                    description: '',
                    date: ''
                },
                markdown: '',
                loading: true,
            };
        },
        computed: {
            markdownHtml() {
                return markdownToHtml(this.markdown);
            }
        },
        methods: {
            async openPopup(postId) {
                const post = this.posts.find(p => p.id === postId);
                if (!post) return;
                this.currentPost = post;
                // Fetch markdown by id from public/blog_md/{id}.md
                this.markdown = await fetchMarkdown(`blog_md/${post.id}`);
                this.showPopup = true;
            },
            closePopup() {
                this.showPopup = false;
                this.markdown = '';
            }
        },
        async created() {
            try {
                const response = await fetch('/popupBlogs.json');
                this.posts = await response.json();
            } catch (error) {
                console.error('Error loading blogs:', error);
                this.posts = [];
            }
            this.loading = false;
        },
    });

</script>
<style scoped>
.menu-item {
  background-color: var(--color-menu-item);
  border-radius: 5px;
  margin-top: 0;
  padding: 7px 15px;
  transition: background-color 100ms ease-out;
  display: flex;
  flex-direction: row;
  align-items: end;
  justify-content: space-between;
  min-height: 30px;
}

.menu-item:hover {
  background-color: var(--color-menu-item-hover);
}

.projects-container {
  position: relative;
  margin-bottom: 60px;
}

.section-headers {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
  position: relative;
  z-index: 3;
}

.all-projects {
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  z-index: 2;
}

.section-title {
  font-size: 32px;
  margin: 0;
  text-align: center;
  color: var(--color-h1);
  font-weight: 600;
}

.card {
  position: relative;
  border-radius: 0px;
  padding: .5rem;
}

.text-h3 {
  font-size: 20px;
  color: var(--color-h2);
  margin: 0;
  font-weight: 600;
}

.right-content {
  padding-bottom: 2px;
  padding-left: 10px;
}

@media (max-width: 768px) {
  .section-headers {
    flex-direction: column;
    gap: 20px;
    text-align: center;
  }
  .card {
    margin-left: 0 !important;
    margin-right: 0 !important;
  }
}

</style>
