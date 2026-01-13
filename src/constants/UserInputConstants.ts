import { COMMON_IMAGES } from "@/utils/imagePath";

export const COMPANIONS = [
  { value: "alone", label: "혼자", imageSrc: COMMON_IMAGES.ALONE },
  { value: "family", label: "가족", imageSrc: COMMON_IMAGES.FAMILY },
  { value: "friends", label: "친구/지인", imageSrc: COMMON_IMAGES.FRIEND },
  { value: "lover", label: "연인", imageSrc: COMMON_IMAGES.COUPLE },
];

export const DURATIONS = [
  { value: "1", label: "당일치기" },
  { value: "2", label: "1박 2일" },
  { value: "3", label: "2박 3일" },
  { value: "4", label: "3박 4일" },
  { value: "5", label: "4박 5일" },
];
