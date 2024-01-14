<script lang="ts">
  import type { PageData } from './$types';
  import Icon from '@iconify/svelte';
  import playIcon from '@iconify-icons/mdi/play-arrow';
  import frownIcon from '@iconify-icons/mdi/face-frown';
  import { toRuntime } from '$lib';
  export let data: PageData;

  $: availableDays = [...new Set(data.showings.slots.map(({ time }) => new Date(time).toDateString()))];
  $: displayedTheaters = [...new Set(data.showings.slots.map(({ theater_id }) => theater_id))].map((theaterId) => data.showings.theaters.find((t) => t.id === theaterId)!);
  $: displayedShowings = data.showings.slots.filter(({ time }) => new Date(time).toDateString() === availableDays[selectedDay]);
  let selectedDay = 0;
  const intlTime = new Intl.DateTimeFormat('en-US', { timeStyle: 'short' });
</script>

<svelte:head>
  <title>{data.movie.title} - MoviesNow</title>
</svelte:head>


<section class="max-w-4xl mx-auto">
  {#if data.movie.trailer_id}
    <div class="relative">
      <img src={`https://i3.ytimg.com/vi/${data.movie.trailer_id}/maxresdefault.jpg`} alt={data.movie.title + ' Trailer'} class="aspect-video w-full shadow-lg bg-neutral-700" />
      <a href={`https://www.youtube.com/watch?v=${data.movie.trailer_id}`} target="_blank" class="absolute top-0 bottom-0 left-0 right-0 flex items-center justify-center group/trailer">
        <Icon icon={playIcon} class="text-white bg-black/75 w-20 h-20 rounded-full border-4 border-white opacity-75 transition-all group-hover/trailer:scale-125 group-hover/trailer:opacity-100" />
      </a>
    </div>
  {/if}
  <div class="p-3 sm:p-6 flex flex-col gap-8">
    <div class="flex gap-3 sm:gap-6">
      <div class="relative w-1/3">
        <img
          src={data.movie.poster_url}
          alt={data.movie.title + ' Poster'}
          class="w-full max-w-[300px] aspect-[2/3] rounded shadow-lg bg-neutral-400"
          class:sm:-mt-40={!!data.movie.trailer_id}
          style:view-transition-name={`movieposter-${data.movie.id}`}
        />
      </div>
      <div class="flex-1">
        <h1
          class="text-lg sm:text-2xl md:text-4xl font-extrabold mb-1 md:mb-3 text-black"
          style:view-transition-name={`movietitle-${data.movie.id}`}
        >
          {data.movie.title}
        </h1>
        <p class="text-sm sm:text-base">{data.movie.description}</p>
        <div class="flex mt-4 gap-x-4 gap-y-2 flex-wrap">
          {#if data.movie.rating}
            <div class="inline-flex flex-col">
              <b class="text-lg text-black">Rating</b>
              <span>{data.movie.rating}</span>
            </div>
          {/if}
          {#if data.movie.runtime_minutes}
            <div class="inline-flex flex-col">
              <b class="text-lg text-black">Runtime</b>
              <span>{toRuntime(data.movie.runtime_minutes)}</span>
            </div>
          {/if}
          {#if data.movie.genre}
            <div class="inline-flex flex-col">
              <b class="text-lg text-black">Genre</b>
              <span>{data.movie.genre}</span>
            </div>
          {/if}
          {#if data.movie.release_date}
            <div class="inline-flex flex-col">
              <b class="text-lg text-black">Release Date</b>
              <span>{new Intl.DateTimeFormat('en-US', { dateStyle: 'long' }).format(new Date(data.movie.release_date.slice(0, -4)))}</span>
            </div>
          {/if}
        </div>
      </div>
    </div>
    {#if !data.showings.slots.length}
      <div class="py-20 px-4 flex flex-col justify-center items-center text-neutral-600">
        <Icon icon={frownIcon} class="w-12 h-12" />
        <h1 class="text-center font-bold text-2xl">No showings available.</h1>
      </div>
    {:else}
      <div class="flex flex-col rounded">
        <div class="flex items-end border-b border-neutral-400  h-[68px]">
          {#each availableDays as day, i}
            <button
              class="flex flex-col p-2 justify-center items-center w-24 hover:border-b-4 transition-all"
              class:border-b-blue-500={selectedDay === i}
              class:border-b-4={selectedDay === i}
              class:text-blue-500={selectedDay === i}
              on:click={() => selectedDay = i}
            >
              <b>{day.split(' ')[0]}</b>
              <span class="brightness-105">{day.split(' ').slice(1, 3).map((v, i) => i === 1 ? parseInt(v) : v).join(' ')}</span>
            </button>
          {/each}
        </div>
        <div class="flex flex-col gap-4 p-4" data-sveltekit-preload-data="tap">
          {#each displayedTheaters as theater (theater.id)}
            <div class="rounded-md p-4 border border-neutral-500">
              <h2 class="text-xl font-bold" style:view-transition-name={`theatername-${theater.id}`}>{theater.name}</h2>
              <span>{theater.city}, {theater.state} {theater.zip}</span>
              <div class="flex flex-wrap gap-4 mt-4">
                {#each displayedShowings.filter(({ theater_id }) => theater_id === theater.id) as showing (showing.time)}
                  <a
                    href={`/showing/${theater.id}-${Math.floor(new Date(showing.time).valueOf() / 1000)}`}
                    class="w-24 h-12 border border-neutral-400 p-2 rounded text-lg hover:border-neutral-600 transition-all font-medium active:scale-95 shadow flex flex-col justify-center items-center"
                    class:pointer-events-none={!showing.available}
                    class:opacity-50={!showing.available}
                  >
                    <span
                      style:view-transition-name={`showing-${theater.id}-${Math.floor(new Date(showing.time).valueOf() / 1000)}`}
                    >{intlTime.format(new Date(showing.time.slice(0, -4)))}</span>
                    {#if showing.type !== 'regular'}
                      <span
                        class="text-xs -mt-2"
                        style:view-transition-name={`showingtype-${theater.id}-${Math.floor(new Date(showing.time).valueOf() / 1000)}`}
                      >{showing.type.toUpperCase()}</span>
                    {/if}
                  </a>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>