<script lang="ts">
  import type { ActionData, PageData } from './$types';
  import Icon from '@iconify/svelte';
  import frownIcon from '@iconify-icons/mdi/face-frown';
  export let data: PageData;
	export let form: ActionData;

  const intlTime = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' });
  $: gridRows = data.showing.seats.map(({ row_number }) => row_number).sort((a, b) => b - a)[0] || 0;
  $: gridCols = data.showing.seats.map(({ column_number }) => column_number).sort((a, b) => b - a)[0] || 0;

  let selectedSeat: string | null = null;
</script>

<svelte:head>
  <title>Select Seating - MoviesNow</title>
</svelte:head>

{#if !form}
<section class="p-6 max-w-4xl mx-auto">
  <h1 class="text-4xl font-extrabold mb-6">Select Seating</h1>
  {#if !data.showing.available}
    <div class="py-20 px-4 flex flex-col justify-center items-center text-neutral-600">
      <Icon icon={frownIcon} class="w-12 h-12" />
      <h1 class="text-center font-bold text-2xl">This showing is not available.</h1>
    </div>
  {:else if !data.showing.seats.length}
    <div class="py-20 px-4 flex flex-col justify-center items-center text-neutral-600">
      <Icon icon={frownIcon} class="w-12 h-12" />
      <h1 class="text-center font-bold text-2xl">No seats available.</h1>
    </div>
  {:else}
    <div class="flex flex-col justify-center items-center gap-8">
      <div class="p-6 pb-1 flex flex-col justify-center items-center">
        <h1
          class="text-lg sm:text-2xl md:text-4xl font-bold text-black"
          style:view-transition-name={`movietitle-${data.movie.id}`}
        >
          {data.movie.title}
        </h1>
        <span style:view-transition-name={`theatername-${data.showing.theater_id}`}>
          {data.showing.theater.name}
        </span>
      </div>
      <div class="p-6 pt-1 flex flex-col justify-center items-center">
        <span
          class="text-xs"
          style:view-transition-name={`showingtype-${data.showing.theater.id}-${Math.floor(new Date(data.showing.time).valueOf() / 1000)}`}
        >
          {data.showing.type.toUpperCase()}
        </span>
        <h1
          class="text-lg sm:text-2xl md:text-4xl text-black"
          style:view-transition-name={`showing-${data.showing.theater.id}-${Math.floor(new Date(data.showing.time).valueOf() / 1000)}`}
        >
          {intlTime.format(new Date(data.showing.time.slice(0, -4)))}
        </h1>
        <span>{new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(data.showing.time.slice(0, -4)))}</span>
      </div>
      <div class="flex flex-col justify-center items-center gap-8">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 335 22" width={`${(40 * (gridCols + 1)) + (8 * gridCols) + 48}px`}>
          <path d="M331.752 21.1898C331.419 21.1898 331.082 21.1358 330.749 21.0278C304.396 12.2911 240.314 6.64386 167.501 6.64386C94.6884 6.64386 30.6071 12.2911 4.24953 21.0278C2.54459 21.5925 0.713813 20.6375 0.157678 18.8935C-0.394397 17.1495 0.53926 15.2767 2.2442 14.7078C29.1944 5.77185 94.0632 0 167.501 0C240.94 0 305.804 5.77185 332.755 14.7078C334.459 15.2726 335.397 17.1453 334.841 18.8935C334.399 20.297 333.124 21.1898 331.752 21.1898Z" fill="black" fill-opacity="0.12"/>
        </svg>
        <div
          class="inline-grid gap-2"
          style:grid-template-rows={`repeat(${gridRows}, minmax(0, 32px))`}
          style:grid-template-columns={`repeat(${gridCols}, minmax(0, 40px))`}
        >
          {#each data.showing.seats as seat (seat.id)}
            <button
              class="relative w-10 h-8 transition-all text-green-600 hover:text-green-700 disabled:grayscale"
              style:grid-row-start={seat.row_number + 1}
              style:grid-column-start={seat.column_number + 1}
              disabled={!seat.available}
              title={`Seat ${seat.id}${!seat.available ? ' (Unavailable)' : ''}`}
              on:click={() => selectedSeat = seat.id}
            >
              <div
                class="absolute top-0 left-0 right-0 bottom-0 rounded ring-2 ring-blue-300 opacity-0 pointer-events-none transition-all shadow shadow-blue-200"
                class:scale-110={selectedSeat === seat.id}
                class:opacity-100={selectedSeat === seat.id}
              />
              <div class="absolute h-full w-2 bg-current left-0 top-0 rounded-t rounded-bl" />
              <div class="absolute h-full w-2 bg-current right-0 top-0 rounded-t rounded-br" />
              <div class="absolute h-3/4 bg-current left-2 right-2 bottom-0 border-l border-r border-white">
                <span
                  class="text-white text-xs drop-shadow"
                  style:text-shadow="-1px -1px 0 #0008, 1px -1px 0 #0008, -1px 1px 0 #0008, 1px 1px 0 #0008"
                >
                  {seat.id}
                </span>
              </div>
            </button>
          {/each}
        </div>
      </div>
      <div class="flex flex-col md:flex-row self-stretch justify-between items-center md:items-start gap-8 rounded-xl p-8 md:4 bg-black/10">
        {#if selectedSeat}
          {@const price = data.showing.seats.find((s) => s.id === selectedSeat)?.price ?? data.showing.theater.ticket_price}
          <div class="flex flex-col items-center md:items-start">
            <h2 class="font-bold text-3xl">Seat {selectedSeat}</h2>
            <span>${price}</span>
          </div>
          <form class="flex flex-col w-48 gap-2" method="POST">
            <input
              class="p-2 rounded"
              placeholder="Full Name"
              name="name"
            />
            <input
              class="p-2 rounded"
              type="email"
              placeholder="E-mail"
              name="email"
            />
            <input
              class="hidden"
              name="seat"
              bind:value={selectedSeat}
            />
            <button
              class="self-stretch rounded bg-blue-500 font-bold text-lg text-white px-4 py-2 hover:enabled:bg-blue-400 transition-all disabled:opacity-50 disabled:grayscale"
            >
              Purchase
            </button>
          </form>
        {:else}
          <span>Select an available seat to purchase.</span>
        {/if}
      </div>
    </div>
  {/if}
</section>
{:else}
  <section class="p-6 max-w-4xl mx-auto">
    <h1 class="text-4xl font-extrabold mb-6">Purchase Complete!</h1>
    <div class="py-20 px-4 flex flex-col text-neutral-600">
      <h2 class="text-2xl">{data.movie.title}</h2>
      <span>{data.showing.theater.name}</span>
      <span>Seat {form.seat}</span>
    </div>
  </section>
{/if}
