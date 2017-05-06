<template>
  <div class="row non-select">
    <div
      v-for="word in words"
      class="col-lg-3 col-md-3 col-sm-4 col-6 my-card-wrapper"
    >
      <div class="card card-outline-primary my-card">
        {{ word }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'word-list',
  props: {
    words: {
      type: Array
    }
  }
}
</script>

<style>
.my-card-wrapper {
  margin-top: 10px;
}

.my-card {
  padding: 4px;
  margin-right: -10px;
  margin-left: -10px;
}
</style>
