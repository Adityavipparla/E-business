<script>
  import { page } from '$app/stores'
  import '../app.css';
	import { onNavigate } from '$app/navigation';

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div id="app">
  <header class="h-16 bg-blue-500/75 text-white flex justify-center backdrop-blur fixed top-0 left-0 right-0 z-50 shadow">
    <div class="w-full max-w-4xl flex px-6 py-4 items-center gap-4 justify-center sm:justify-start">
      <a href="/" class="italic font-bold text-xl">MoviesNow!</a>
      <span class="hidden sm:block">
        <a href="/" class="hover:underline">Movies</a>
        {#if $page.data.movie}
          - <a href={`/movie/${$page.data.movie.id}`} class="hover:underline">{$page.data.movie.title}</a>
        {/if}
        {#if $page.data.showing}
          - Showing
        {/if}
      </span>
    </div>
  </header>
  <div class="h-16" />

  <main class="text-neutral-800">
    <slot />
  </main>
</div>