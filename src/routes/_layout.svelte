<script>
  import Header from "../components/UI/Header.svelte";
  export let segment;
</script>

<style>
  main {
    margin-top: 4rem;
  }
</style>

<Header />
<main>
  <slot />
</main>
