<script>
  import { createEventDispatcher } from "svelte";
  import meetups from "../../meetups-store.js";
  import Button from "../UI/Button.svelte";
  import Badge from "../UI/Badge.svelte";

  const dispatch = createEventDispatcher();
  export let id;
  export let title;
  export let subtitle;
  export let imageUrl;
  export let description;
  export let address;
  export let isFavourite;

  function toggleFavourite() {
    fetch(`https://svelte-course-6b417.firebaseio.com/meetups/${id}.json`, {
      method: "PATCH",
      body: JSON.stringify({ isFavourite: !isFavourite }),
      headers: { "Content-Type": "application/json" }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("An error occurred, please try again!");
        }
        meetups.toggleFavourite(id);
      })
      .catch(err => this.error(404, err));
  }
</script>

<style>
  article {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
    border-radius: 5px;
    background: white;
    margin: 1rem;
  }
  header,
  .content,
  footer {
    padding: 1rem;
  }
  .image {
    width: 100%;
    height: 14rem;
  }
  .image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  h1 {
    font-size: 1.25rem;
    margin: 0.5rem 0;
    font-family: "Roboto Slab", sans-serif;
  }

  h2 {
    font-size: 1rem;
    color: #808080;
    margin: 0.5rem 0;
  }
  div {
    text-align: right;
  }
  .content {
    min-height: 4rem;
  }
</style>

<article {id}>
  <header>
    <h1>
      {title}
      {#if isFavourite}
        <Badge>FAVOURITE</Badge>
      {/if}
    </h1>
    <h2>{subtitle}</h2>
    <p>{address}</p>
  </header>
  <div class="image">
    <img src={imageUrl} alt={title} />
  </div>
  <div class="content">
    <p>{description}</p>
  </div>
  <footer>
    <Button mode="outline" type="text" on:click={() => dispatch('edit', id)}>
      Edit
    </Button>
    <Button
      mode="outline"
      type="text"
      color={isFavourite ? null : 'success'}
      on:click={toggleFavourite}>
      {isFavourite ? 'Unfavourite' : 'Favourite'}
    </Button>
    <Button href="/{id}">Show details</Button>
  </footer>
</article>
