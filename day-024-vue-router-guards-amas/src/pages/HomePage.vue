<template>
  <div>
    <Input title="Search" v-model="search" />

    <template v-if="!selectedId">
      <BlogPosts
        :id="post.id"
        :body="post.body"
        :title="post.title"
        v-for="post in filteredPosts"
        :key="post.id"
        @selected-post="selectedBlogPost"
      />
    </template>

    <template v-else>
      <div class="mb-3">
        <label for="exampleFormControlInput1" class="form-label">Title</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          :value="selectedPost.title"
        />
      </div>

      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">Body</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          :value="selectedPost.body"
        ></textarea>
      </div>

      <button type="submit" class="btn btn-primary" @click="resetPosts">Edit</button>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: [],
      selectedId: 0,
      search: "",
    };
  },

  created() {
    this.getPostsData();
  },

  methods: {
    async getPostsData() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );

      const data = await response.json();

      this.posts = data;
    },

    selectedBlogPost(value) {
      this.selectedId = value;
    },

    resetPosts() {
      this.selectedId = 0;
    },
  },

  computed: {
    selectedPost() {
      return this.filteredPosts.find((post) => post.id === this.selectedId);
    },


    filteredPosts(){
      return this.posts.filter(post => post.title.indexOf(this.search) !== -1)
    }

  },
};
</script>

<style>
</style>