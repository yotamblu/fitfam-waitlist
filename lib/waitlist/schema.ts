import { z } from "zod";
import { SPORTS } from "@/lib/sports";

const SPORT_IDS = SPORTS.map((sport) => sport.id) as [string, ...string[]];

export const waitlistSignupSchema = z.object({
  email: z
    .string()
    .trim()
    .toLowerCase()
    .min(3, "כתובת אימייל לא תקינה.")
    .max(254, "כתובת אימייל ארוכה מדי.")
    .email("כתובת אימייל לא תקינה."),
  favoriteSport: z
    .enum(SPORT_IDS, { message: "ענף לא תקין." })
    .nullable()
    .optional(),
});

export type WaitlistSignupInput = z.infer<typeof waitlistSignupSchema>;
