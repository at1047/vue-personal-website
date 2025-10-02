<template>
  <div class="projects-container">
    <div class="section-headers">
      <h2 class="section-title">Blog</h2>
    </div>

    <div class="all-projects">
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
                // Fetch markdown by id from public/blog/{id}.md
                this.markdown = await fetchMarkdown(`blog/${post.id}`);
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
<!-- 
<style scope>
.menu-item {
  background-color: var(--color-menu-item);
  border-radius: 5px;
  margin-top: 0;
  padding: 7px 15px;
  transition: background-color 100ms ease-out;
  display: flex;
  align-items: flex-start;
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
  /* color: var(--color-text-tertiary); */
  font-weight: 600;
}

.card {
  margin-left: var(--bias-left, 0%);
  margin-right: var(--bias-right, 0%);
  position: relative;
  border-radius: 0px;
  padding: .5rem;
}

.text-h3 {
  font-size: 20px;
  color: var(--color-text-tertiary);
  margin: 0;
  font-weight: 600;
}

.menu-item .right-content p {
  font-size: 14px;
  color: var(--color-text-light-gray);
  margin: 0;
  line-height: 1.3;
}

/* Popup Modal Styles (reuse from projects) */
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  backdrop-filter: blur(2px);
}

.popup-content {
  background-color: var(--color-card-background);
  border-radius: 10px;
  padding: 0;
  width: 80%;
  height: 80%;
  max-width: none;
  max-height: none;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid var(--color-background-light);
}

.dark-mode .popup-content {
  box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  border-bottom: 1px solid var(--color-background-light);
  background-color: var(--color-menu-item);
  border-radius: 10px 10px 0 0;
}

.popup-header h2 {
  margin: 0;
  color: var(--color-text-tertiary);
  font-size: 24px;
  font-weight: 600;
}

.popup-close {
  background: none;
  border: none;
  font-size: 28px;
  color: var(--color-text-light);
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.2s ease;
}

.popup-close:hover {
  background-color: var(--color-menu-item-hover);
}

.popup-body {
  padding: 25px;
}

.popup-details-content {
  line-height: 1.6;
}

.popup-details-content p {
  margin: 0 0 15px 0;
  color: var(--color-text);
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
  .popup-content {
    width: 95%;
    height: 90%;
    margin: 20px;
  }
}

</style>

 -->
