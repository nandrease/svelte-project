<script>
  import Header from "./UI/Header.svelte";
  import MeetupItem from "./Meetups/MeetupItem.svelte";

  const meetups = [
    {
      id: "m1",
      title: "Coding Bootcamp",
      subtitle: "Learn to code in 2 hours",
      description:
        "I this meetup we will learn to code with Svelte - a lightweight JavaScript compiler",
      imageUrl: "https://source.unsplash.com/random",
      address: "Akadeemia tee 15A, TAllinn, Estonia",
      contactEmail: "na@an.com"
    },
    {
      id: "m2",
      title: "Ski Trip to Are",
      subtitle: "One week in Sweden in March",
      description:
        "I this meetup we will learn to code with Svelte - a lightweight JavaScript compiler",
      imageUrl: "https://source.unsplash.com/random",
      address: "Trondheimsleden 52, 837 52 Åre, Sweden",
      contactEmail: "na@an.com"
    }
  ];
</script>

<style>
  #meetups {
    margin-top: 5rem;
  }
</style>

<Header />
<section id="meetups">
  {#each meetups as meetup}
    <MeetupItem {meetup} />
  {/each}
</section>
