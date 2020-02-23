// Wrapper: 'new Date()' As 'now'
const now = () => new Date();

export const getYear = () => now().getFullYear();
export const getMonth = () => now().getMonth();
export const getDays = () => now().getDate();
export const getHours = () => now().getHours();
export const getMinutes = () => now().getMinutes();
export const getSeconds = () => now().getSeconds();

export default now;
