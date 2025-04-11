import React, { useState } from "react";

type Props = {
  npcName: string;
};

const Conversation: React.FC<Props> = ({ npcName }) => {
  const [messages, setMessages] = useState<string[]>([]);
  const [isConversationActive, setIsConversationActive] = useState<boolean>(false);

  // Simulácia náhodnej konverzácie
  const startConversation = (topic: string) => {
    const npcResponse = getNpcResponse(topic);
    setMessages((prevMessages) => [
      ...prevMessages,
      `You: ${topic}`,
      `${npcName}: ${npcResponse}`,
    ]);
    setIsConversationActive(true);
  };

  // Náhodná odpoveď NPC na základe témy
  const getNpcResponse = (topic: string): string => {
    const responses: Record<string, string[]> = {
      quests: [
        "I have a few quests for you, if you're interested.",
        "There is a dangerous creature in the woods, you should go after it.",
        "A nearby village is under attack, could you help them?",
      ],
      lore: [
        "The world is full of mysteries, don't be afraid to explore.",
        "Long ago, this land was ruled by a mighty king who disappeared.",
        "The forests are said to hold ancient magic, but it's a closely guarded secret.",
      ],
      end: [
        "It was nice talking to you, come back if you need anything.",
        "We'll talk again soon, adventurer.",
        "Take care, stay safe out there.",
      ],
    };

    const topicResponses = responses[topic] || [];
    return topicResponses[Math.floor(Math.random() * topicResponses.length)];
  };

  const handleEndConversation = () => {
    setIsConversationActive(false);
    setMessages([]);
  };

  return (
    <div className="p-4 bg-[#2a2a4d] rounded-lg text-white">
      <h3 className="text-lg font-semibold text-purple-400 mb-2">Rozhovor s {npcName}</h3>
      
      {/* Konverzačné správy */}
      <div className="space-y-2 mb-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`${
              message.startsWith("You:") ? "text-right" : "text-left"
            } p-2 rounded-lg max-w-xs`}
          >
            <div
              className={`${
                message.startsWith("You:") ? "bg-blue-600" : "bg-gray-600"
              } text-white inline-block p-2 rounded-lg`}
            >
              {message}
            </div>
          </div>
        ))}
      </div>

      {/* Konverzačné tlačidlá */}
      {!isConversationActive && (
        <div>
          <button
            className="mt-2 text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
            onClick={() => startConversation("quests")}
          >
            Ask about quests
          </button>
          <button
            className="mt-2 text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
            onClick={() => startConversation("lore")}
          >
            Ask about lore
          </button>
          <button
            className="mt-2 text-sm bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
            onClick={() => startConversation("end")}
          >
            End conversation
          </button>
        </div>
      )}

      {/* Zatvorenie konverzácie */}
      {isConversationActive && (
        <button
          className="mt-2 text-sm bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
          onClick={handleEndConversation}
        >
          End Conversation
        </button>
      )}
    </div>
  );
};

export default Conversation;
