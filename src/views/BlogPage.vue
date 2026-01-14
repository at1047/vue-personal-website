<template>
  <div class="projects-container">
    <div class="section-headers">
      <h2 class="section-title">Blog</h2>
    </div>

    <div class="all-projects">
      <!-- Vue Component Links -->
      <!--<div class="card">
        <router-link to="/blog/probability-distribution" class="menu-item">
          <h3 class="text text-h3">Volleyball: Probability Distribution</h3>
          <div class="right-content">
            <p>12-30-2025</p>
          </div>
        </router-link>
</div>-->

       <div class="card">
        <router-link to="/blog/setters-mindset" class="menu-item">
          <h3 class="text text-h3">Volleyball: Secret to Happiness</h3>
          <div class="right-content">
            <p>10-02-2025</p>
          </div>
        </router-link>
      </div>
      
      <div class="card">
        <router-link to="/blog/defining-volleyball-sets" class="menu-item">
          <h3 class="text text-h3">Volleyball: Defining Sets</h3>
          <div class="right-content">
            <p>06-17-2025</p>
          </div>
        </router-link>
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
  margin-bottom: 8px;
}

.text-h3 {
  font-size: 20px;
  color: var(--color-text);
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
