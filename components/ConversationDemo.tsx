import React from "react";
import { AnimatedList } from "@/components/design-systems/magicui/animated-list";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import GamistarBlack from "@/components/icons/GamistarBlack";

interface Message {
  sender: "personA" | "personB" | "ai";
  text: string;
  time: string;
}

const chatMessages: Message[] = [
  { sender: "personB", text: "Hey! Are you coming to the meeting later?", time: "3m ago" },
  { sender: "ai", text: "Try keeping it friendly and upbeat: 'Absolutely, looking forward to it!'", time: "3m ago" },
  { sender: "personA", text: "Absolutely, looking forward to it!", time: "3m ago" },
  { sender: "personB", text: "Awesome! Can you bring those project notes?", time: "2m ago" },
  { sender: "ai", text: "Be helpful and clear: 'Of course, I'll have them ready.'", time: "2m ago" },
  { sender: "personA", text: "Of course, I'll have them ready.", time: "2m ago" },
  { sender: "personB", text: "Thanks! See you soon.", time: "1m ago" },
  { sender: "ai", text: "End on a positive note: 'See you soon, Alex!'", time: "1m ago" },
  { sender: "personA", text: "See you soon, Alex!", time: "Just now" },
];

const Notification = ({ sender, text, time }: Message) => {
  let icon: IconDefinition | null = null;
  let color = "";
  let label = "";
  if (sender === "personA") {
    icon = faWhatsapp;
    color = "#25D366"; // WhatsApp brand color
    label = "Alex"; // First name only for WhatsApp
  } else if (sender === "personB") {
    icon = faLinkedin;
    color = "#0A66C2"; // LinkedIn brand color
    label = "Michael Anderson"; // Full name for LinkedIn
  } else {
    color = "#000"; // Gamistar black color
    label = "Gamistar";
  }
  return (
    <figure
      className={cn(
        "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
        "transition-all duration-200 ease-in-out hover:scale-[103%]",
        "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
        "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
      )}
    >
      <div className="flex flex-row items-center gap-3">
        <div
          className="flex size-10 items-center justify-center rounded-2xl"
          style={{ backgroundColor: color }}
        >
          {icon ? (
            <FontAwesomeIcon icon={icon} className="text-white text-lg" />
          ) : (
            <GamistarBlack className="h-6 w-10 text-white" />
          )}
        </div>
        <div className="flex flex-col overflow-hidden">
          <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white ">
            <span className="text-sm sm:text-lg">{label}</span>
            <span className="mx-1">·</span>
            <span className="text-xs text-gray-500">{time}</span>
          </figcaption>
          <p className="text-sm font-normal dark:text-white/60">{text}</p>
        </div>
      </div>
    </figure>
  );
};

const ConversationDemo = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "relative flex h-[500px] w-full flex-col overflow-hidden p-2",
        className,
      )}
    >
      <AnimatedList>
        {chatMessages.map((item, idx) => (
          <Notification {...item} key={idx} />
        ))}
      </AnimatedList>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
};

export default ConversationDemo;