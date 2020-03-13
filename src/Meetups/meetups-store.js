import { writable } from "svelte/store";

const meetups = writable([
  {
    id: "m1",
    title: "Coding Bootcamp",
    subtitle: "Learn to code in 2 hours",
    description: "I this meetup we will learn to code with Svelte - a lightweight JavaScript compiler",
    imageUrl: "https://source.unsplash.com/random",
    address: "Akadeemia tee 15A, TAllinn, Estonia",
    email: "na@an.com",
    isFavourite: false
  },
  {
    id: "m2",
    title: "Ski Trip to Are",
    subtitle: "One week in Sweden in March",
    description: "I this meetup we will learn to code with Svelte - a lightweight JavaScript compiler",
    imageUrl: "https://source.unsplash.com/random",
    address: "Trondheimsleden 52, 837 52 Åre, Sweden",
    email: "na@an.com",
    isFavourite: false
  }
]);

const customMeetupsStore = {
  subscribe: meetups.subscribe,
  addMeetup: meetupData => {
    const newMeetup = {
      ...meetupData,
      id: Math.random().toString(),
      isFavourite: false
    };
    meetups.update(items => {
      return [ newMeetup, ...items ];
    });
  },
  updateMeetup: (id, meetupData) => {
    meetups.update(items => {
      const meetupIndex = items.findIndex(i => i.id === id);
      const updatedMeetup = { ...items[meetupIndex], ...meetupData };
      const updatedMeetups = [ ...items ];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  },
  deleteMeetup: id => {
    meetups.update(items => {
      return items.filter(i => i.id !== id);
    });
  },
  toggleFavourite: id => {
    meetups.update(items => {
      const updatedMeetup = { ...items.find(m => m.id === id) };
      updatedMeetup.isFavourite = !updatedMeetup.isFavourite;
      const meetupIndex = items.findIndex(m => m.id === id);
      const updatedMeetups = [ ...items ];
      updatedMeetups[meetupIndex] = updatedMeetup;
      return updatedMeetups;
    });
  }
};

export default customMeetupsStore;
