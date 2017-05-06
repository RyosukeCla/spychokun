<template>
  <div>
    <Main />
  </div>
</template>

<script>
import Timer from './Timer'
import WordList from './WordList'
import Question from './Question'
import Graph from './Graph'
import Main from './Main'

export default {
  name: 'timer-view',
  components: {
    Timer,
    WordList,
    Question,
    Graph,
    Main
  },
  data () {
    return {
      duration: 60000
    }
  },
  methods: {
    start (duration = this.duration) {

    }
  }
}
</script>
