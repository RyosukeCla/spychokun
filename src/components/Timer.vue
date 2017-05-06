<template>
  <div>
    <div class="row non-select">
      <div class="col-sm-6 offset-sm-3 align-center">
        <div id="timer-digit">
          {{ sec }}
          <div id="timer-text">sec</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'timer',
  props: {
    value: {
      type: Number,
      default: 0
    },
    onTimeout: {
      type: Function,
      default: function () {
        console.log('timeout')
      }
    }
  },
  data () {
    return {
      time: this.value
    }
  },
  methods: {
    start () {
      this.update(1000)
    },
    update (span) {
      this.time -= span
      if (this.time < 1) {
        this.timeout()
        return
      }
      const self = this
      setTimeout(function () {
        self.update(span)
      }, span)
    },
    timeout () {
      this.onTimeout()
      this.time = 0
    }
  },
  computed: {
    sec () {
      return Math.trunc(this.time / 1000)
    }
  },
  mounted () {
    this.start()
  }
}
</script>

<style>
#timer-digit {
  /* color: #ecf0f1; */
  color: rgb(70,70,70);
  font-size: 80px;
  font-weight: 100;
  width: 200px;
  font-family: 'Roboto', serif;
  text-align: center;
  position: relative;
  margin: auto;
}

#timer-text {
  color: #1abc9c;
  font-size: 40px;
  font-family: 'Roboto Condensed', serif;
  font-weight: 40;
  top: 30px;
  right: -20px;
  position: absolute;
}

</style>
