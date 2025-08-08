export const formatDate = (fechaISO: string): string => {
  const fecha: Date = new Date(fechaISO);

  const yyyy: number = fecha.getFullYear();
  const mm: string = String(fecha.getMonth() + 1).padStart(2, "0");
  const dd: string = String(fecha.getDate()).padStart(2, "0");

  const hh: string = String(fecha.getHours()).padStart(2, "0");
  const min: string = String(fecha.getMinutes()).padStart(2, "0");
  const ss: string = String(fecha.getSeconds()).padStart(2, "0");

  return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
};
