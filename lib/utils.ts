import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function DegToRad(degrees: number) {
  return degrees * (Math.PI / 180);
}

export function RadToDeg(radians: number) {
  return radians * (180 / Math.PI);
}

export function hexToRGBA(hex, opacity) {
  hex = hex.replace("#", "");
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `rgba(${r},${g},${b},${opacity})`;
}

export function MakeArrayOf(elems: unknown) {
  return Array.isArray(elems) ? elems : [elems];
}

function TwoDigits(number: number) {
  return number.toString().padStart(2, "0");
}

export function CapitalizeFirstLetter(str) {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function FileToBase64(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
}
