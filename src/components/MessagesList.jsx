import { useAITeacher } from "../hooks/useAITeacher";
import { useEffect, useRef } from "react";

export const MessagesList = () => {
  const messages = useAITeacher((state) => state.messages);
  const playMessage = useAITeacher((state) => state.playMessage);
  const { currentMessage } = useAITeacher();
  const classroom = useAITeacher((state) => state.classroom);

  const container = useRef();

  useEffect(() => {
    container.current.scrollTo({
      top: container.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  const renderMainConcept = (concept) => (
    <div className="mb-4">
      <p className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-blue-300/90 to-white/90">
        {concept.description}
      </p>
      <p className="text-2xl text-teal-400/90 mt-2">
        {concept.elonPerspective}
      </p>
      <p className="text-xl text-blue-400/90">
        {concept.companyConnection}
      </p>
    </div>
  );

  const renderRealWorldApplications = (applications) => (
    <div className="space-y-4">
      {applications.map((app, i) => (
        <div key={i} className="bg-black/30 rounded-md p-4">
          <h3 className="text-2xl font-bold text-white/90">{app.company}</h3>
          <p className="text-xl text-teal-400/90">{app.application}</p>
          <p className="text-lg text-blue-400/90">{app.innovation}</p>
        </div>
      ))}
    </div>
  );

  const renderPracticalExercises = (exercises) => (
    <div className="space-y-4">
      {exercises.engineeringChallenges.map((challenge, i) => (
        <div key={i} className="bg-black/30 rounded-md p-4">
          <h3 className="text-2xl font-bold text-white/90">{challenge.scenario}</h3>
          <p className="text-xl text-teal-400/90">{challenge.approach}</p>
          <p className="text-lg text-blue-400/90">{challenge.solution}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`${
        classroom === "default"
          ? "w-[1288px] h-[676px]"
          : "w-[2528px] h-[856px]"
      } p-8 overflow-y-auto flex flex-col space-y-8 bg-transparent opacity-80`}
      ref={container}
    >
      {messages.length === 0 && (
        <div className="h-full w-full grid place-content-center text-center">
          <h2 className="text-8xl font-bold text-white/90 italic">
            Elon Musk
            <br />
            AI Tutor
          </h2>
          <h2 className="text-4xl font-bold text-white-600/90 mt-4">
            "Teaching through First Principles"
          </h2>
        </div>
      )}
      {messages.map((message, i) => (
        <div key={i} className="bg-black/20 rounded-xl p-6">
          <div className="flex justify-between items-start">
            <div className="flex-grow">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-white/90 text-2xl font-bold uppercase px-3 py-1 rounded-full bg-red-600">
                  {message.topic?.name || "Topic"}
                </span>
                <span className="text-2xl text-white/70">
                  {message.topic?.relevanceToFuture}
                </span>
              </div>

              {message.explanation?.mainConcept && 
                renderMainConcept(message.explanation.mainConcept)}

              {message.explanation?.realWorldApplications && 
                renderRealWorldApplications(message.explanation.realWorldApplications)}
            </div>

            {currentMessage === message ? (
              <button
                className="text-white/65"
                onClick={() => stopMessage(message)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 9.563C9 9.252 9.252 9 9.563 9h4.874c.311 0 .563.252.563.563v4.874c0 .311-.252.563-.563.563H9.564A.562.562 0 0 1 9 14.437V9.564Z"
                  />
                </svg>
              </button>
            ) : (
              <button
                className="text-white/65"
                onClick={() => playMessage(message)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-16 h-16"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
                  />
                </svg>
              </button>
            )}
          </div>

          <div className="p-5 mt-5 bg-gradient-to-br from-red-200/20 to-red-500/20 rounded-xl">
            <span className="pr-4 italic bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/70 text-3xl font-bold uppercase inline-block">
              Practical Exercises
            </span>
            {message.practicalExercises && renderPracticalExercises(message.practicalExercises)}
          </div>

          {message.futurePerspectives && (
            <div className="mt-5 p-5 bg-gradient-to-br from-blue-200/20 to-blue-500/20 rounded-xl">
              <span className="pr-4 italic bg-clip-text text-transparent bg-gradient-to-b from-white/90 to-white/70 text-3xl font-bold uppercase inline-block">
                Future Impact
              </span>
              <div className="mt-3 space-y-2">
                <p className="text-xl text-white/90">Mars Impact: {message.futurePerspectives.marsColonization}</p>
                <p className="text-xl text-white/90">Sustainability: {message.futurePerspectives.sustainabilityGoals}</p>
                <p className="text-xl text-white/90">AI Future: {message.futurePerspectives.aiImplications}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MessagesList;