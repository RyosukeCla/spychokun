<template>
  <div>
    <div class="card question-box">
      <div class="card-header">
        Question - {{ index + 1 }} / 50
      </div>
      <div class="card-block">
        この単語はありましたか？
      </div>
      <div class="card-block">
        <div class="question-word-text">
          {{ word }}
        </div>
      </div>
      <div class="card-block">
        <button
          type="button"
          class="btn btn-outline-success question-btn"
          v-on:click="answear(1)"
        >あった</button>
        <button
          type="button"
          class="btn btn-outline-warning question-btn"
          v-on:click="answear(0)"
        >なかった</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'question',
  props: {
    index: {
      type: Number
    },
    word: {
      type: String,
      default: ''
    },
    callback: {
      type: Function
    }
  },
  methods: {
    answear (which) {
      const self = this
      this.callback(which, self.index)
    }
  }
}
</script>

<style>

.question-word-text {
  font-size: 150%;
}
.question-btn {
  width: 100px;
}
.question-box {

}
</style>
