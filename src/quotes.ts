// Short, original lines grouped by time-of-day period.
// Feel free to edit, add your own, or delete ones that don't land for you.

export interface Period {
  key: string;
  label: string;
  start: number; // inclusive hour, 24h format
  end: number; // exclusive hour, 24h format
  icon: string;
}

export const PERIODS: Period[] = [
  { key: 'midnight', label: 'Midnight', start: 0, end: 4, icon: '🌑' },
  { key: 'dawn', label: 'Dawn', start: 4, end: 6, icon: '🌌' },
  { key: 'sunrise', label: 'Sunrise', start: 6, end: 8, icon: '🌅' },
  { key: 'morning', label: 'Morning', start: 8, end: 10, icon: '🌤️' },
  { key: 'forenoon', label: 'Forenoon', start: 10, end: 12, icon: '🌿' },
  { key: 'noon', label: 'Noon', start: 12, end: 13, icon: '☀️' },
  { key: 'afternoon', label: 'Afternoon', start: 13, end: 16, icon: '🌻' },
  { key: 'dusk', label: 'Dusk', start: 16, end: 18, icon: '🌇' },
  { key: 'twilight', label: 'Twilight', start: 18, end: 20, icon: '🌆' },
  { key: 'evening', label: 'Evening', start: 20, end: 22, icon: '🌃' },
  { key: 'night', label: 'Night', start: 22, end: 24, icon: '🌙' },
];

export function getPeriodForHour(hour: number): Period {
  return PERIODS.find((p) => hour >= p.start && hour < p.end) ?? PERIODS[0];
}

export const MESSAGES: Record<string, string[]> = {
  midnight: [
    "Still up? That's fine. You don't have to have it all figured out tonight.",
    "The world is quiet right now, and so can you be. Rest is not weakness.",
    "Whatever today was, it's over. Tomorrow hasn't judged you yet.",
    "You made it through another day. That's not nothing.",
    "Close your eyes if you can. You're allowed to stop for now.",
    "Nobody expects anything from you at this hour. Just breathe.",
    "This dark is temporary — it always turns into morning.",
    "You're not alone in being awake right now, even if it feels that way.",
  ],
  dawn: [
    "Before anyone else is up, it's just you and a fresh start. Take it slow.",
    "Nothing has gone wrong yet today. That's a good place to begin.",
    "The night held on for you. Now let the light in a little.",
    "You get another try. Not everyone treats that as a gift, but you can.",
    "Small hours, small steps. That's enough for now.",
    "You're still here. That already counts for something.",
    "Whatever yesterday was, this is a new page — blank, and yours.",
    "Quiet mornings like this one are made for gentleness, especially with yourself.",
  ],
  sunrise: [
    "Something in you got up today. Don't underestimate that.",
    "The sun didn't skip you. Neither should you.",
    "You don't need a reason to deserve a good day — just start it.",
    "One step at a time gets you further than you think.",
    "This is the part of the day nobody can take from you. Enjoy it a little.",
    "You've survived every hard morning so far. This one's no different.",
    "Let today be easier on yourself than yesterday was.",
    "Whatever's ahead, you get to meet it as someone who's still trying. That matters.",
  ],
  morning: [
    "You're allowed to have an ordinary day. Not every day needs to be a triumph.",
    "Whatever's on your list, you don't have to do it perfectly — just do it.",
    "You've handled harder mornings than this one.",
    "A little progress today is still progress.",
    "You're doing better than you're giving yourself credit for.",
    "It's okay to go slow, as long as you keep going.",
    "Someone out there is glad you exist, even if they haven't said it lately.",
    "This morning doesn't have to fix everything. It just has to happen.",
  ],
  forenoon: [
    "You're halfway to noon and still standing. That's real.",
    "Take the small win when it shows up — you earned it.",
    "You don't owe anyone constant productivity to be worth something.",
    "If today feels heavy, carrying it one hour at a time is enough.",
    "You've made it through tougher stretches than this.",
    "It's fine to pause. The list will still be there in five minutes.",
    "You're more capable than the voice in your head gives you credit for.",
    "Drink some water, breathe, and give yourself a break — you're doing fine.",
  ],
  noon: [
    "You're right in the middle of your day. Take a beat before you push through.",
    "Eat something. Rest a second. You've earned it just by getting here.",
    "Halfway through, still standing — that's worth noticing.",
    "You don't have to have this all figured out by tonight.",
    "This is a good moment to remind yourself: you matter, not just what you produce.",
    "The rest of today can be lighter than the first half.",
    "You're allowed to feel proud of getting through the morning.",
    "Whatever's stressing you right now, it will not feel this big by tomorrow.",
  ],
  afternoon: [
    "Energy dipping? That's human, not failure.",
    "You don't have to finish strong — you just have to finish.",
    "This part of the day is often the hardest. You're handling it.",
    "A short break isn't quitting, it's maintenance.",
    "You're allowed to be tired and still be doing okay.",
    "Whatever's frustrating you right now is a moment, not your whole story.",
    "You've gotten through every difficult afternoon before this one.",
    "Be as patient with yourself as you'd be with someone you love.",
  ],
  dusk: [
    "The day's winding down — so can you.",
    "However today went, you're still here to see it end. That's worth something.",
    "Let yourself off the hook for whatever didn't go perfectly today.",
    "The sky changes colors right now like it's reminding you things shift. So will this mood.",
    "You don't need a perfect day behind you to deserve a peaceful evening.",
    "This is a good time to breathe out everything you were carrying since morning.",
    "You made it through another one. However messy, it counts.",
    "Whatever's weighing on you, it's allowed to wait until tomorrow.",
  ],
  twilight: [
    "The noise of the day is fading. Let some of yours fade with it.",
    "You don't have to solve everything before you rest tonight.",
    "It's okay if today wasn't your best. Tomorrow's not written yet.",
    "You're doing better than the hardest moment of your day made it feel.",
    "This is a good time to be gentle with yourself — you've been carrying a lot.",
    "Whatever's unresolved can stay that way for one more night. You're still okay.",
    "You showed up today. That's the whole assignment, some days.",
    "Let the evening be soft, even if the day wasn't.",
  ],
  evening: [
    "You made it to the end of the day. That's not automatic — you did that.",
    "Whatever you're feeling right now is allowed to just be felt, no fixing required.",
    "You don't have to be okay all the time to be okay overall.",
    "This is your time now — take it back from whatever took up your day.",
    "You're worth more than today's hardest hour suggested.",
    "It's fine to just exist for a while tonight. No agenda needed.",
    "However today went, you're still someone worth showing up for tomorrow.",
    "You're allowed to rest without earning it first.",
  ],
  night: [
    "You got through today. However it went, that's the truth of it — you got through it.",
    "If tonight feels heavy, it's okay to just wait it out. Feelings pass, even the big ones.",
    "You are not a burden for struggling. You're a person, and people struggle sometimes.",
    "Whatever's on your mind, it will look different in daylight. Try to let tonight be quiet.",
    "You don't have to carry tomorrow's worries tonight too.",
    "If no one's told you today: you matter, and this specific moment doesn't get to decide your whole story.",
    "Rest now. You're allowed to stop trying to hold everything together for a few hours.",
    "You're still here. After everything, you're still here — and that's worth being gentle with yourself about.",
  ],
};

export function getRandomMessage(periodKey: string, excludeMsg?: string): string {
  const pool = MESSAGES[periodKey] ?? MESSAGES.night;
  if (pool.length === 1) return pool[0];
  let choice: string;
  do {
    choice = pool[Math.floor(Math.random() * pool.length)];
  } while (choice === excludeMsg);
  return choice;
}