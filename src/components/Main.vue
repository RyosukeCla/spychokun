<template>
  <div class="main-wrapper">
    <transition
      appear
      appear-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
    >
      <div v-if="show(0)">
        <div class="row align-items-center main-row">
          <div class="col-md-6">
            <div class="hero-title">
              <p id="hero-top">Spychokun</p>
              <p id="hero-bottom">Project</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card">
              <h3 class="card-header">
                記憶力テスト
              </h3>
              <div class="card-block">
                <ul class="list-group">
                  <li class="list-group-item active">このテストの説明</li>
                  <li class="list-group-item">６０秒間で、表示される６０個の単語を覚える。</li>
                  <li class="list-group-item">５０個の質問に答える。</li>
                </ul>
              </div>
              <div class="card-block">
                <ul class="list-group">
                  <li class="list-group-item active">利用規約</li>
                  <li class="list-group-item">回答のデータは研究に使用されるかも。</li>
                  <li class="list-group-item">いかなる問題が起きても私は責任を負わない。</li>
                  <li class="list-group-item">私が困るようなへんなことはしないこと。</li>
                  <li class="list-group-item">SNSで拡散してくれると嬉しい。</li>
                </ul>
              </div>
              <div class="card-block">
                <button
                  class="btn btn-outline-primary"
                  v-on:click="nextState()"
                >はじめる</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <transition
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
    >
      <div v-if="show(1)">
        <Timer
          :value="61000"
          :onTimeout="nextState"
        />
        <WordList :words="words"/>
      </div>
    </transition>
    <transition
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
    >
      <div v-if="show(2)" class="row align-items-center main-row">
        <div class="col-12">
          <Question
            :word="questions[currentIndex].word"
            :index="currentIndex"
            :callback="answear"
          />
        </div>
      </div>
    </transition>
    <div v-if="show(2.5)" :value="postAndCalculate()" />
    <transition
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutRight"
    >
      <div v-if="show(3)" class="row align-items-center main-row">
        <div class="col-12">
          <div class="card">
            <h4 class="card-header">
              Result
            </h4>
            <div class="card-block">
              <a :href="tweetText()" class="twitter-share-button btn btn-sm">Tweet</a>
              <a href="https://www.facebook.com/sharer/sharer.php?u=http://spychokun.herokuapp.com/" class="fb-share-button btn btn-sm">FB</a>
              <a href="https://plus.google.com/share?url=http://spychokun.herokuapp.com/" class="g-share-button btn btn-sm">G+</a>
              <a :href="lineText()" class="line-share-button btn btn-sm">LINE</a>
              <div class="your-score"> {{ score }} <div class="score-text">点</div></div>
              <div class="your-hensa">あなたの偏差値は <span class="hensa-text">{{ parseInt(hensa) }}</span> です！</div>
            </div>
            <div class="card-block">
              <Graph height="350" width="500" :value="hensa"/>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Timer from './Timer'
import WordList from './WordList'
import Question from './Question'
import wordsDict from '../etc/word_list'
import Graph from './Graph'
import axios from 'axios'

function shuffle (array) {
  let n = array.length
  let t = 0
  let i = 0

  while (n) {
    i = Math.floor(Math.random() * n--)
    t = array[n]
    array[n] = array[i]
    array[i] = t
  }

  return array
}

export default {
  name: 'main',
  components: {
    Timer,
    WordList,
    Question,
    Graph
  },
  data () {
    return {
      words: [],
      questions: [],
      currentIndex: 0,
      currentState: 0,
      isEndAnswear: false,
      score: 0,
      hensa: 0,
      sigma: 0,
      average: 0
    }
  },
  methods: {
    answear (which, index) {
      this.questions[index].answear = which
      if (this.currentIndex < 49) {
        this.currentIndex++
      } else if (this.currentIndex === 49 && this.isEndAnswear === false) {
        this.isEndAnswear = true
        this.nextState()
      }
    },
    nextState () {
      this.currentState += 0.5
      const self = this
      setTimeout(function () {
        self.currentState += 0.5
      }, 1010)
    },
    show (index) {
      if (index === this.currentState) {
        return true
      }
      return false
    },
    calculateScore () {
      let temp = 0
      for (let i in this.questions) {
        if (this.questions[i].isExist === this.questions[i].answear) {
          temp++
        }
      }
      return temp * 2
    },
    calculateHensa () {
      return 10 * (this.calculateScore() - 50) / 10 + 50
    },
    postAndCalculate () {
      const self = this
      this.score = self.calculateScore()
      axios.post(`/api/question`, {
        question: self.questions,
        score: self.score
      }).then(function (res) {
        self.hensa = 10 * (self.score - self.average) / self.sigma + 50
      }).catch(function (err) {
        console.log(err)
      })
    },
    tweetText () {
      return `https://twitter.com/intent/tweet?hashtags=記憶力テスト&text=わたしの記憶力テストの結果は${this.score}点でした！偏差値は${parseInt(this.hensa)}です！ &url=http://spychokun.herokuapp.com`
    },
    lineText () {
      return `http://line.me/R/msg/text/?わたしの記憶力テストの結果は${this.score}点でした！偏差値は${parseInt(this.hensa)}です！ http://spychokun.herokuapp.com`
    }
  },
  mounted () {
    // take 85 words from words dictionary
    let temp = []
    for (let i = 0; i < 85; i++) {
      let index = parseInt(Math.random() * wordsDict.words.length)
      temp.push(wordsDict.words[index])
      wordsDict.words.splice(index, 1)
    }
    // Question: 50, Words: 60, {Q and W}: 25
    let tempWords = []
    let tempQuest = []
    for (let i = 0; i < 85; i++) {
      let index = parseInt(Math.random() * temp.length)
      if (i < 25) {
        tempWords.push(temp[index])
        tempQuest.push({
          word: temp[index],
          isExist: 1
        })
      } else if (i < 50) {
        tempQuest.push({
          word: temp[index],
          isExist: 0
        })
      } else {
        tempWords.push(temp[index])
      }
      temp.splice(index, 1)
    }
    shuffle(tempWords)
    shuffle(tempQuest)
    this.words = tempWords
    this.questions = tempQuest

    const self = this
    axios.get(`/api/question`).then(function (res) {
      self.average = res.data['average']
      let variance = res.data['variance']
      self.sigma = Math.sqrt(variance)
    })
  }
}

</script>

<style>
.main-wrapper {
  max-width: 800px;
  margin: 0 auto;
}
.main-row {
  min-height: 100vh;
}
.hero-title {
  font-size: 300%;
  text-align: left;
}
.question-wrapper {
  margin-top: 15px;
}
.your-score {
  font-size: 80px;
  margin: 0 auto;
  width: 130px;
  position: relative;
}
.score-text {
  font-size: 20px;
  position: absolute;
  top: 60px;
  right: -20px;
}
.your-hensa {
}
.hensa-text {
  font-size: 150%;
}
.twitter-share-button {
  background-color: #1da1f2;
  color: #f5f8fa;
}
.twitter-share-button:hover {
  background-color: #333;
  color: #f5f8fa;
}
.fb-share-button {
  background-color: #3b5998;
  color: #f5f8fa;
}
.fb-share-button:hover {
  background-color: #333;
  color: #f5f8fa;
}
.line-share-button {
  background-color: #00c300;
  color: #f5f8fa;
}
.line-share-button:hover {
  background-color: #333;
  color: #f5f8fa;
}
.g-share-button {
  background-color: #dd4b39;
  color: #f5f8fa;
}
.g-share-button:hover {
  background-color: #333;
  color: #f5f8fa;
}
</style>
