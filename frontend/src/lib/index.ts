// place files you want to import through the `$lib` alias in this folder.

export function toRuntime(allMinutes: number) {
  const hours = Math.floor(allMinutes / 60);
  const minutes = allMinutes - (hours * 60);

  return [
    hours ? `${hours} hr${hours === 1 ? '' : 's'}` : '',
    minutes ? `${minutes} min${minutes === 1 ? '' : 's'}` : '',
  ].filter(v => !!v).join(' ');
}