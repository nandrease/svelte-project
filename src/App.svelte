<script>
  import Header from "./UI/Header.svelte";
  import MeetupGrid from "./Meetups/MeetupGrid.svelte";
  import EditMeetup from "./Meetups/EditMeetup.svelte";
  import Button from "./UI/Button.svelte";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let imageUrl = "";
  let description = "";

  let meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description:
        "I this meetup we will learn to code with Svelte - a lightweight JavaScript compiler",
      imageUrl: "https://source.unsplash.com/random",
      address: "Akadeemia tee 15A, TAllinn, Estonia",
      email: "na@an.com",
      isFavourite: false
    },
    {
      id: "m2",
      title: "Ski Trip to Are",
      subtitle: "One week in Sweden in March",
      description:
        "I this meetup we will learn to code with Svelte - a lightweight JavaScript compiler",
      imageUrl: "https://source.unsplash.com/random",
      address: "Trondheimsleden 52, 837 52 Åre, Sweden",
      email: "na@an.com",
      isFavourite: false
    }
  ];

  let editMode = null;

  function addMeetup(event) {
    const newMeetup = {
      id: Math.random().toString(),
      title: event.detail.title,
      subtitle: event.detail.subtitle,
      description: event.detail.description,
      imageUrl: event.detail.imageUrl,
      contactEmail: event.detail.email,
      address: event.detail.address
    };

    meetups = [newMeetup, ...meetups];
    editMode = null;
  }

  function toggleFavourite(event) {
    const id = event.detail;
    const updatedMeetup = { ...meetups.find(m => m.id === id) };
    updatedMeetup.isFavourite = !updatedMeetup.isFavourite;
    const meetupIndex = meetups.findIndex(m => m.id === id);
    const updatedMeetups = [...meetups];
    updatedMeetups[meetupIndex] = updatedMeetup;
    meetups = updatedMeetups;
  }
</script>

<style>
  main {
    margin-top: 5rem;
  }
  .meetup-controls {
    margin: 1rem;
  }
</style>

<Header />
<main>
  <div class="meetup-controls">
    <Button on:click={() => (editMode = 'edit')}>New Meetup</Button>
  </div>

  {#if editMode === 'edit'}
    <EditMeetup on:save={addMeetup} on:close={() => editMode = null} />
  {/if}
  <MeetupGrid {meetups} on:toggle-isFavourite={toggleFavourite} />
</main>
