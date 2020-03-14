<script>
  import meetups from "../../meetups-store.js";
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import {
    isEmpty,
    isValidEmail,
    hasLengthOfThree
  } from "../../helpers/validation.js";

  export let id = null;

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let imageUrl = "";
  let description = "";
  let formIsValid = false;

  if (id) {
    const unsubscribe = meetups.subscribe(items => {
      const selectedMeetup = items.find(i => i.id === id);
      title = selectedMeetup.title;
      subtitle = selectedMeetup.subtitle;
      address = selectedMeetup.address;
      email = selectedMeetup.email;
      imageUrl = selectedMeetup.imageUrl;
      description = selectedMeetup.description;
      email = selectedMeetup.email;
    });

    unsubscribe();
  }

  const dispatch = createEventDispatcher();

  $: titleValid = !isEmpty(title);
  $: subtitleValid = !isEmpty(subtitle);
  $: addressValid = !isEmpty(address);
  $: emailValid = !isEmpty(email) && isValidEmail(email);
  $: imageUrlValid = !isEmpty(imageUrl);
  $: descriptionValid = !isEmpty(description) && hasLengthOfThree(description);
  $: formIsValid =
    titleValid &&
    subtitleValid &&
    addressValid &&
    emailValid &&
    imageUrlValid &&
    descriptionValid;

  function submitForm() {
    const meetupData = {
      title,
      subtitle,
      description,
      imageUrl,
      email,
      address
    };

    if (id) {
      fetch(`https://svelte-course-6b417.firebaseio.com/meetups/${id}.json`, {
        method: "PATCH",
        body: JSON.stringify(meetupData),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("An error occurred, please try again!");
          }
          meetups.updateMeetup(id, meetupData);
        })
        .catch(err => this.error(404, err));
    } else {
      fetch("https://svelte-course-6b417.firebaseio.com/meetups.json", {
        method: "POST",
        body: JSON.stringify({ ...meetupData, isFavourite: false }),
        headers: { "Content-Type": "application/json" }
      })
        .then(res => {
          if (!res.ok) {
            throw new Error("Failed to send a POST request");
          }
          return res.json();
        })
        .then(data => {
          meetups.addMeetup({
            ...meetupData,
            isFavourite: false,
            id: data.name
          });
        })
        .catch(err => console.warn(err));
    }
    dispatch("save");
  }

  function cancelForm() {
    dispatch("close");
  }

  function deleteMeetup() {
    dispatch("close");
    fetch(`https://svelte-course-6b417.firebaseio.com/meetups/${id}.json`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("An error occurred, please try again!");
        }
        meetups.deleteMeetup(id);
      })
      .catch(err => this.error(404, err));
  }
</script>

<style>
  form {
    width: 100%;
  }
</style>

<Modal title="Edit Meetup Data" on:close>
  <form on:submit|preventDefault={submitForm}>
    <TextInput
      id="title"
      type="text"
      label="Title"
      valid={titleValid}
      validityMessage="Please enter a valid title."
      value={title}
      on:input={event => (title = event.target.value)} />
    <TextInput
      id="subtitle"
      type="text"
      label="Subitle"
      valid={subtitleValid}
      validityMessage="Please enter a valid subtitle."
      value={subtitle}
      on:input={event => (subtitle = event.target.value)} />
    <TextInput
      id="imageUrl"
      type="text"
      label="Image URL"
      valid={imageUrlValid}
      validityMessage="Please enter a valid image URL."
      value={imageUrl}
      on:input={event => (imageUrl = event.target.value)} />
    <TextInput
      id="email"
      type="email"
      label="Email"
      valid={emailValid}
      validityMessage="Please enter a valid email."
      value={email}
      on:input={event => (email = event.target.value)} />
    <TextInput
      id="address"
      type="text"
      label="Address"
      valid={addressValid}
      validityMessage="Please enter a valid address."
      value={address}
      on:input={event => (address = event.target.value)} />
    <TextInput
      id="description"
      controlType="textarea"
      rows="3"
      label="Description"
      valid={descriptionValid}
      validityMessage="Please enter at least 3 characters."
      value={description}
      on:input={event => (description = event.target.value)} />
  </form>
  <div slot="footer">
    <Button type="button" mode="outline" on:click={cancelForm}>Cancel</Button>
    <Button type="button" disabled={!formIsValid} on:click={submitForm}>
      Save
    </Button>
    {#if id}
      <Button type="button" on:click={deleteMeetup}>Delete</Button>
    {/if}
  </div>
</Modal>
