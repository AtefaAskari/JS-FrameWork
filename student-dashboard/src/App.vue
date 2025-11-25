<template>
  <div id="app">
    <div class="dashboard">
      <h1>Student Dashboard</h1>
      
      <div class="student-item">
        <h2>Aide Johnson</h2>
        <p>Age: 21</p>
        <hr>
      </div>

      <div class="student-item">
        <h2>Michael Smith</h2>
        <p>Age: 22</p>
        <hr>
      </div>

      <div class="student-item">
        <h2>Alex</h2>
        <p>Age: 20</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background-color: white;
  padding: 20px;
  line-height: 1.4;
}

.dashboard {
  max-width: 600px;
  margin: 0 auto;
}

.dashboard h1 {
  color: #000;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: bold;
}

.student-item {
  margin-bottom: 20px;
}

.student-item h2 {
  font-size: 18px;
  font-weight: bold;
  color: #000;
  margin-bottom: 8px;
}

.student-item p {
  color: #000;
  font-size: 16px;
  margin-bottom: 15px;
}

hr {
  border: none;
  border-top: 2px solid #000;
  margin: 15px 0;
}
</style>