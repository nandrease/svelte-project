<script>
  export let type = "button";
  export let href = null;
  export let mode = null;
  export let color = null;
</script>

<style>
  button,
  a {
    font: inherit;
    border: 1px solid var(--color-main);
    background: var(--color-main);
    padding: 0.5rem 1rem;
    color: white;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.26);
    cursor: pointer;
    text-decoration: none;
  }
  button:focus {
    outline: none;
  }
  button:hover,
  button:active,
  a:hover,
  a:active {
    background: var(--color-bold);
    border-color: var(--color-bold);
    box-shadow: 1px 1px 8px rgba(77, 51, 51, 0.26);
  }

  button:disabled,
  button:disabled:hover,
  button:disabled:active {
    background: var(--color-disabled);
    border-color: var(--color-disabled);
    color: var(--color-disabled-text);
    box-shadow: none;
    cursor: not-allowed;
  }
  .success {
    background: var(--color-success);
    border-color: var(--color-success);
  }

  .success:hover,
  .success:active {
    background: var(--color-success-active);
    border-color: var(--color-success-active);
  }

  .outline {
    background: transparent;
    color: var(--color-main);
    box-shadow: none;
  }

  .outline:hover,
  .outline:active {
    background: var(--color-main-faded);
    color: var(--color-bold);
    box-shadow: none;
  }

  .outline:disabled,
  .outline:disabled:hover,
  .outline:disabled:active {
    background: transparent;
    color: var(--color-disabled);
  }

  .outline.success {
    color: var(--color-success);
    border-color: var(--color-success);
  }

  .outline.success:hover,
  .outline.success:active {
    background: var(--color-main-faded);
  }
</style>

{#if href}
  <a {href}>
    <slot />
  </a>
{:else}
  <button class="{mode} {color}" {type} on:click>
    <slot />
  </button>
{/if}
