export function CalculateDateTime(time: string, distance: number): Date {
  const [hours, minutes] = time.split(':').map(Number);
  const date = new Date();
  date.setDate(date.getDate() + distance);
  date.setHours(hours, minutes, 0, 0);
  return date;
}