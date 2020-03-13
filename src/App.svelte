<script>
  import meetups from "./Meetups/meetups-store.js";
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import MeetupDetail from "./Meetups/MeetupDetail.svelte";

  let editMode = null;
  let editedId = null;
  let page = "overview";
  let pageData = {};

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

<Header />
<main>
  {#if page === 'overview'}
    {#if editMode === 'edit'}
      <EditMeetup
        id={editedId}
        on:save={addMeetup}
        on:close={() => (editMode = null)} />
    {/if}
    <MeetupGrid
      meetups={$meetups}
      on:show-details={showDetails}
      on:edit={editMeetup}
      on:add={() => (editMode = 'edit')} />
  {:else}
    <MeetupDetail id={pageData.id} on:close={closeDetails} />
  {/if}
</main>
