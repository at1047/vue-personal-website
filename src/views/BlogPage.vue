<template>
  <div class="blog-page">
    <!-- Page Header -->
    <header class="page-header">
      <h1 class="page-title">Blog</h1>
      <p class="page-description">
        Thoughts on robotics, volleyball, and engineering problems.
      </p>
    </header>

    <!-- Blog Posts List -->
    <div class="posts-list">
      <router-link 
        v-for="post in posts" 
        :key="post.to"
        :to="post.to" 
        class="post-item"
      >
        <div class="post-content">
          <h2 class="post-title">{{ post.title }}</h2>
          <p v-if="post.excerpt" class="post-excerpt">{{ post.excerpt }}</p>
        </div>
        <div class="post-meta">
          <time class="post-date mono">{{ post.date }}</time>
          <span class="post-arrow">→</span>
        </div>
      </router-link>
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
      posts: [
        {
          to: '/blog/setters-mindset',
          title: 'Volleyball: Secret to Happiness',
          excerpt: 'Reflections on mindset and mental game from a setter\'s perspective.',
          date: '2025-10-02'
        },
        {
          to: '/blog/defining-volleyball-sets',
          title: 'Volleyball: Defining Sets',
          excerpt: 'A systematic approach to categorizing and understanding set types.',
          date: '2025-06-17'
        }
      ],
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
      this.markdown = await fetchMarkdown(`blog_md/${post.id}`);
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
      this.markdown = '';
    }
  },
  async created() {
    this.loading = false;
  },
});
</script>

<style scoped>
.blog-page {
  padding-bottom: var(--space-16);
}

/* --- PAGE HEADER --- */
.page-header {
  padding: var(--space-4) 0 var(--space-3);
  border-bottom: 1px solid var(--color-border-subtle);
  margin-bottom: var(--space-6);
}

.page-title {
  font-size: var(--text-3xl);
  font-weight: 700;
  color: var(--color-h1);
  margin-bottom: var(--space-2);
}

.page-description {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  max-width: 500px;
  line-height: var(--leading-relaxed);
}

/* --- POSTS LIST --- */
.posts-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.post-item {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-5);
  background: var(--color-card-background);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-lg);
  transition: all var(--transition-base);
}

.post-item:hover {
  border-color: var(--color-border);
  background: var(--color-card-background-hover);
  transform: translateX(4px);
}

/* --- POST CONTENT --- */
.post-content {
  flex: 1;
  min-width: 0;
}

.post-title {
  font-size: var(--text-lg);
  font-weight: 600;
  color: var(--color-h2);
  margin: 0 0 var(--space-2) 0;
  line-height: var(--leading-tight);
}

.post-excerpt {
  font-size: var(--text-base);
  color: var(--color-text-secondary);
  line-height: var(--leading-relaxed);
  margin: 0;
}

/* --- POST META --- */
.post-meta {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-shrink: 0;
}

.post-date {
  font-size: var(--text-xs);
  color: var(--color-text-muted);
  white-space: nowrap;
}

.post-arrow {
  font-family: var(--font-mono);
  color: var(--color-text-muted);
  opacity: 0;
  transform: translateX(-4px);
  transition: all var(--transition-fast);
}

.post-item:hover .post-arrow {
  opacity: 1;
  transform: translateX(0);
  color: var(--color-accent-primary);
}

/* --- RESPONSIVE --- */
@media (max-width: 600px) {
  .post-item {
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .post-meta {
    width: 100%;
    justify-content: space-between;
  }
  
  .page-header {
    padding: var(--space-6) 0 var(--space-8);
  }
  
  .page-title {
    font-size: var(--text-3xl);
  }
}

/* Utility */
.mono {
  font-family: var(--font-mono);
}
</style>
