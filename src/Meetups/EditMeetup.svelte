<script>
  import { createEventDispatcher } from "svelte";
  import TextInput from "../UI/TextInput.svelte";
  import Button from "../UI/Button.svelte";
  import Modal from "../UI/Modal.svelte";
  import {
    isEmpty,
    isValidEmail,
    hasLengthOfThree
  } from "../helpers/validation.js";

  let title = "";
  let subtitle = "";
  let address = "";
  let email = "";
  let imageUrl = "";
  let description = "";
  let formIsValid = false;

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
    dispatch("save", {
      title,
      subtitle,
      address,
      email,
      imageUrl,
      description
    });
  }

  function cancelForm() {
    dispatch("close");
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
      id="imageURL"
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
    <Button type="button" disabled="{!formIsValid}" on:click={submitForm}>
      Save
    </Button>
  </div>
</Modal>
