<template>
  <div class="home">
    {{ name }} is {{ age }} years old
    <button @click="handleClick">Click Me</button>
    <div id="spaced-div" ref="p">This is housed in a div with a ref</div>
    <div>
      <button @click="age++">Add to the age</button>
    </div>

    <input type="text" v-model="name" placeholder="Enter">
  </div>

    <div>
      <h1>Refs</h1>
    <p>{{ person1.name }}</p>
    <p>{{ person1.disposition }}</p>
    <p>{{ person1.age }}</p>
    <input type="text" v-model="mood">
    <button @click="updateDisposition(person1, mood)">Change Mood</button>
    </div>

    <div>
      <h1>Reactive</h1>
      <p>{{ person2.name }}</p>
      <p>{{ person2.disposition }}</p>
      <p>{{ person2.age }}</p>
      <button @click="updateAge">Update Age</button>
    </div>

    <ul>
      <li v-for="designer in chooseDesigners" :key="designer.name">
        
        <span>
          <input type="checkbox" v-model="designer.vaccinated">
          <span>Name:</span> {{ designer.name }} 
          <span>Design Style:</span> {{ designer.style }} 
          <span>Age:</span> {{ designer.age }} 
          <span>Vaccinated:</span> {{ designer.vaccinated }}
        </span>
      </li>
    </ul>
    <input type="text" v-model="chooseStyle" placeholder="Search styles">
    <div>
      <button @click="handleClick1">Stop watching</button>
    </div>
    <p>Search Term: {{ chooseStyle }}</p>

    <br>

    <ul>
      <li v-for="designer in hideNotVaxxedDesigners" :key="designer.name">
        
        <span>
          <input type="checkbox" v-model="designer.vaccinated">
          <span>Name:</span> {{ designer.name }} 
          <span>Design Style:</span> {{ designer.style }} 
          <span>Age:</span> {{ designer.age }} 
          <span>Vaccinated:</span> {{ designer.vaccinated }}
        </span>
      </li>
    </ul>
    <button @click="hideNotVaxxed = !hideNotVaxxed">Hide Not Vaccinated</button>
    
</template>

<script>
import { ref, reactive, computed, watch, watchEffect } from 'vue'

    export default {
      setup() {
        const name = ref('William')
        const age = ref(30)
        const hideNotVaxxed = ref('false')

        const designers = ref([
          {name: 'Gianni Versacci', style: 'Hobo Chic', age: 99, vaccinated: true },
          {name: 'Pablo Francesco', style: 'Hobo Chic', age: 127, vaccinated: true },
          {name: 'Guzman Torradorea', style: 'Frankfurt Pimps', age: 35, vaccinated: false },
          {name: 'Gilberto Torranza', style: 'Cottage Core',  age: 42, vaccinated: false }
        ])

        const chooseStyle = ref('')

        const stopWatch = watch(chooseStyle, () => {
          console.log(`Watch function is watching chooseStyle changes: ${chooseStyle.value}`)
        })

        const stopWatchEffect = watchEffect(() => {
          console.log('watchEffect ran on setup()', chooseStyle.value)
        })

        const chooseDesigners = computed(() => {
          return chooseStyle.value === '' ? 
          designers.value :
          designers.value.filter(designer => designer.style === chooseStyle.value)
        })

        const hideNotVaxxedDesigners = computed(() => {
          return hideNotVaxxed.value ?
          designers.value.filter(designer => designer.vaccinated) :
          designers.value
        })

        const p = ref(null)
        console.log(p, p.value)

        const handleClick = () => {
          console.log('You clicked me')
          console.log(p, p.value)
          p.value.classList.contains('test') ? 
          p.value.classList.remove('test') :
          p.value.classList.add('test')

          p.value.classList.contains('test') ?
          p.value.textContent = 'This text is red' :
          p.value.textContent = 'This is housed in a div with a ref'

          p.value.classList.contains('test') ? (
            name.value = 'Luigi',
            age.value = 99
          ) : (
            name.value = "William",
            age.value = 30
          )
          
          console.log(name)
        }

        console.log(name)

        const person1 = ref({
          name: 'Tillamook',
          disposition: 'Grumpy',
          age: 27
        })

        const person2 = reactive({
          name: 'Demagogue',
          disposition: 'Happy',
          age: 45
        })

        const mood = ref('')

        const updateDisposition = () => {
          console.log(mood.value)
          person1.value.disposition = mood.value
          mood.value = '';
        }

        const updateAge = () => {
          //with reactive value property is not needed
          person2.age = 59
        }

        const handleClick1 = () => {
          chooseStyle.value = ''
          console.log('I will stop spying with watch and watchEffect')
          stopWatch()
          stopWatchEffect()
        }

        return { 
          name, 
          age, 
          handleClick1, 
          p, 
          updateDisposition, 
          person1, 
          person2,
          updateAge,
          mood,
          designers,
          chooseStyle,
          chooseDesigners,
          hideNotVaxxed,
          handleClick,
          stopWatch,
          stopWatchEffect,
          hideNotVaxxedDesigners
        }
      }
    }
    

   
  // created() {
  //   console.log('created')
  // },
  // mounted() {
  //   console.log('mounted')
  // }

</script>
<style>
  #spaced-div {
    margin: 20px 10px;
  }

  .test {
    color: red;
  }

  span span {
    font-weight: bold;
    color: green;
  }
</style>
