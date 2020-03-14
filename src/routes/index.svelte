<script context="module">
  export function preload(page) {
    return this.fetch("https://svelte-course-6b417.firebaseio.com/meetups.json")
      .then(res => {
        if (!res.ok) {
          throw new Error("Fetching meetups failed. Please try again later");
        }
        return res.json();
      })
      .then(data => {
        const loadedMeetups = [];
        for (const key in data) {
          loadedMeetups.push({ ...data[key], id: key });
        }
        return { fetchedMeetups: loadedMeetups.reverse() };
      })
      .catch(err => {
        error = err;
        this.error(500, "Could not fetch meetups!");
      });
  }
</script>

<script>
  import { createEventDispatcher, onMount, onDestroy } from "svelte";
  import { scale } from "svelte/transition";
  import { flip } from "svelte/animate";
  import meetups from "../meetups-store.js";
  import MeetupItem from "../components/Meetup/MeetupItem.svelte";
  import MeetupFilter from "../components/Meetup/MeetupFilter.svelte";
  import EditMeetup from "../components/Meetup/EditMeetup.svelte";
  import Button from "../components/UI/Button.svelte";
  import LoadingSpinner from "../components/UI/LoadingSpinner.svelte";

  export let fetchedMeetups;

  let loadedMeetups = [];
  let editMode = null;
  let editedId = null;
  let favsOnly = false;
  let unsubscribe;

  const dispatch = createEventDispatcher();

  $: filteredMeetups = favsOnly
    ? loadedMeetups.filter(m => m.isFavourite)
    : loadedMeetups;

  function setFilter(event) {
    favsOnly = event.detail === 1;
  }

  onMount(() => {
    meetups.subscribe(items => {
      loadedMeetups = items;
    });
    meetups.setMeetups(fetchedMeetups.reverse());
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  function addMeetup(event) {
    editMode = null;
    editedId = null;
  }

  function editMeetup(event) {
    editMode = "edit";
    editedId = event.detail;
  }

  function startAdd() {
    editMode = "edit";
  }
</script>

<style>
  #meetups {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  }

  #meetup-controls {
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }

  #no-meetups {
    margin: 1rem;
  }

  @media (min-width: 768px) {
    #meetups {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>

<svelte:head>
  <title>Meetups</title>
</svelte:head>

{#if editMode === 'edit'}
  <EditMeetup
    id={editedId}
    on:save={addMeetup}
    on:close={() => (editMode = null)} />
{/if}
<section id="meetup-controls">
  <MeetupFilter on:selected={setFilter} />

  <Button type="button" on:click={startAdd}>New Meetup</Button>
</section>
{#if filteredMeetups.length === 0}
  <p id="no-meetups">No meetups found, you can start adding some</p>
{/if}
<section id="meetups">
  {#each filteredMeetups as meetup (meetup.id)}
    <div transition:scale animate:flip={{ duration: 300 }}>
      <MeetupItem {...meetup} on:show-details on:edit={editMeetup} />
    </div>
  {/each}
</section>
