<script>
	import { page } from '$app/stores';
</script>

<section class="p-6 max-w-4xl mx-auto text-center">
  <h1 class="text-neutral-700 text-6xl font-bold">{$page.status}</h1>
  <h2 class="text-neutral-500 text-2xl">{$page.error?.message}</h2>
</section>