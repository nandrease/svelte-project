<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/Header.svelte";
  import LoadingSpinner from "./UI/LoadingSpinner.svelte";
  import Error from "./UI/Error.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";

  let editMode = null;
  let editedId = null;
  let page = "overview";
  let pageData = {};
  let isLoading = true;
  let error = null;

  fetch("https://svelte-course-6b417.firebaseio.com/meetups.json")
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
      setTimeout(() => {
        isLoading = false;
        meetups.setMeetups(loadedMeetups.reverse());
      }, 500);
    })
    .catch(err => {
      error = err;
      isLoading = false;
    });

  function addMeetup(event) {
    editMode = null;
    editedId = null;
  }

  function editMeetup(event) {
    editMode = "edit";
    editedId = event.detail;
  }

  function showDetails(event) {
    pageData.id = event.detail;
    page = "details";
  }

  function closeDetails() {
    pageData = {};
    page = "overview";
    editedId = null;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
</style>

{#if error}
  <Error
    message={error}
    on:close={() => {
      error = null;
    }} />
{/if}
<Header />
<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup
        id={editedId}
        on:save={addMeetup}
        on:close={() => (editMode = null)} />
    {/if}
    {#if isLoading}
      <LoadingSpinner />
    {:else}
      <MeetupGrid
        meetups={$meetups}
        on:show-details={showDetails}
        on:edit={editMeetup}
        on:add={() => (editMode = 'edit')} />
    {/if}
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
