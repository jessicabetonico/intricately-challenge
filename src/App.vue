<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  outline: 0;
  box-sizing: border-box;
}

body {
  font: 400 14px Roboto, sans-serif;
  background: #f0f0f5;
  -webkit-font-smoothing: antialiased;
}

input, button {
  font: 400 18px Roboto, sans-serif;
}

button {
  cursor: pointer;
}

form input {
  width: 100%;
  height: 30px;
  color: #333;
  border: 1px solid #dcdce6;
  border-radius: 2px;
  padding: 0 10px;
}

</style>
