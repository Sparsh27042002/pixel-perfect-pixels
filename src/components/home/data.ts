import { Droplets, Zap, Hammer, WashingMachine, PaintRoller, Wrench } from "lucide-react";

export const services = [
  { slug: "plumbing", name: "Plumbing", icon: Droplets, hint: "Leaks, taps, blocked drains" },
  { slug: "electrical", name: "Electrical work", icon: Zap, hint: "Switches, wiring, fans" },
  { slug: "carpentry", name: "Carpentry", icon: Hammer, hint: "Doors, furniture, hinges" },
  { slug: "appliance", name: "Appliance repair", icon: WashingMachine, hint: "AC, fridge, washing machine" },
  { slug: "painting", name: "Painting", icon: PaintRoller, hint: "Walls, touch-ups, damp patches" },
  { slug: "general", name: "General repairs", icon: Wrench, hint: "Small fixes around the house" },
];

export const cities = ["Bengaluru", "Mumbai", "Delhi", "Pune", "Hyderabad", "Chennai", "Lucknow"];
