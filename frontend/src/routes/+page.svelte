<script lang="ts">
  import type { PageData } from './$types';
  export let data: PageData;
</script>

<svelte:head>
  <title>All Movies - MoviesNow</title>
</svelte:head>

<section class="p-6 max-w-4xl mx-auto">
  <h1 class="text-4xl font-extrabold mb-6">All Movies</h1>
  <div class="flex flex-wrap justify-between gap-2 sm:gap-4">
    {#each data.movies as movie}
      <a class="relative rounded overflow-hidden shadow-md group/poster active:scale-95 transition-all select-none" href={`/movie/${movie.id}`}>
        <img src={movie.poster_url} alt={movie.title + ' Poster'} class="w-24 sm:w-48 bg-neutral-300 aspect-[2/3]" style:view-transition-name={`movieposter-${movie.id}`} />
        <div
          class="absolute top-0 left-0 right-0 bottom-0 opacity-0 group-hover/poster:opacity-100 group-active/poster:opacity-0 bg-black/25 backdrop-blur-lg text-white p-2 overflow-hidden flex flex-col gap-1 transition-all justify-center sm:justify-start"
        >
          <h3 class="text-base sm:text-2xl font-bold flex-none text-center sm:text-left mb-1">{movie.title}</h3>
          <p class="text-neutral-50 text-sm hidden sm:block">{movie.description}</p>
        </div>
      </a>
    {/each}
  </div>
</section>