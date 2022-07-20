<template>
  <h2>Loading...</h2>
  <div id="loading"></div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
@import "@/assets/_variables.scss";

h2 {
  color: $light-blue;
}
#loading {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid #0000004d;
  border-radius: 50%;
  border-top-color: $light-blue;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>