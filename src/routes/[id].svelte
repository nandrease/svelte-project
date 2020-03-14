<script context="module">
  export function preload(page) {
    const meetupId = page.params.id;

    return this.fetch(
      `https://svelte-course-6b417.firebaseio.com/meetups/${meetupId}.json`
    )
      .then(res => {
        if (!res.ok) {
          throw new Error("Fetching meetups failed. Please try again later");
        }
        return res.json();
      })
      .then(data => {
        console.log(data);
        return { selectedMeetup: { ...data, id: meetupId } };
      })
      .catch(err => {
        error = err;
        this.error(404, "Could not fetch meetup!");
      });
  }
</script>

<script>
  import meetups from "../meetups-store.js";
  import Button from "../components/UI/Button.svelte";

  export let selectedMeetup;
</script>

<style>
  .image {
    width: 100%;
    height: 25rem;
    background: var(--color-disabled);
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .content {
    text-align: center;
    width: 80%;
    margin: auto;
  }
  h1 {
    font-size: 2rem;
    font-family: "Roboto Slab", sans-serif;
    margin: 0.5rem 0;
  }
  h2 {
    font-size: 1.25rem;
    color: #6b6b6b;
  }
  p {
    font-size: 1.5rem;
  }
</style>

<section>
  {#if Object.keys(selectedMeetup).length > 0}
    <div class="image">
      <img src={selectedMeetup.imageUrl} alt={selectedMeetup.title} />
    </div>
    <div class="content">
      <h1>{selectedMeetup.title}</h1>
      <h2>{selectedMeetup.subtitle} - {selectedMeetup.address}</h2>
      <p>{selectedMeetup.description}</p>
      <Button href="mailto:{selectedMeetup.email}">Contact</Button>
      <Button href="/" mode="outline">Close</Button>
    </div>
  {:else}
    <p>No Meetup with selected id :(</p>
  {/if}
</section>
