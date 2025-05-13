import React, { useState } from "react";

export function Dashboard() {
  const [isFirstTimeUser, setIsFirstTimeUser] = useState(true);

  const firstTimeUserSteps = [
    "Go to the 'Input Data' section in the sidebar.",
    {
      main: "Insert data in the following order:",
      subSteps: [
        "Course",
        "Unit",
        "Position",
        "Venue Type",
        "Venue",
        "Educator",
        "Educator Availability",
        "Student",
        "Unit Offering (Different Semester)",
        "Unit Offering Class Details",
        "Educator Unit Offering",
        "Course Unit Offering",
      ],
    },
    "After inserting all the data, go to the 'Query' section in the sidebar.",
    "To view a general timetable which includes all of the data for the selected year and semester, click on 'General'.",
    {
      main: "To view a specific timetable, click on the corresponding section in the sidebar.",
      subSteps: [
        "Go to the 'Educator' section and search for the educator by their ID to obtain the timetable.",
        "Go to the 'Student' section and search for the student by their ID to obtain the timetable.",
        // "Go to the 'Unit' section and search for the unit by its unit code to obtain the timetable.",
        // "Go to the 'Venue' section and search for the venue by its name to obtain the timetable.",
      ],
    },
  ];

  const existingUserSteps = [
    "Go to the 'Input Data' section in the sidebar and insert any new data as needed.",
    "Go to the 'Query' section in the sidebar.",
    "Select the type of timetable you want to view (e.g., General, Educator, Student, Unit, Venue).",
    "Use the search functionality to find specific timetables.",
    "Export or print the timetable as needed.",
  ];

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Dashboard</h1>
      <div className="flex space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            isFirstTimeUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setIsFirstTimeUser(true)}
        >
          First-Time User
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            !isFirstTimeUser ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"
          }`}
          onClick={() => setIsFirstTimeUser(false)}
        >
          Returning User
        </button>
      </div>
      <p className="text-gray-700 mb-6">
        {isFirstTimeUser
          ? "Welcome to the Automated School Timetabling System. Please follow the instructions below to get started."
          : "Welcome back! Follow the steps below to quickly access the timetables and manage your data."}
      </p>
      <div className="space-y-6">
        {(isFirstTimeUser ? firstTimeUserSteps : existingUserSteps).map((step, index) => (
          <div key={index} className="p-4 border rounded-lg shadow-md bg-white">
            {typeof step === "string" ? (
              <div className="flex items-start">
                <span className="text-gray-800 font-bold mr-3">Step {index + 1}.</span>
                <p className="text-gray-800">{step}</p>
              </div>
            ) : (
              <>
                <div className="flex items-start">
                  <span className="text-gray-800 font-bold mr-3">Step {index + 1}.</span>
                  <p className="text-gray-800">{step.main}</p>
                </div>
                <ul className="list-decimal pl-8 text-gray-600 mt-2">
                  {step.subSteps.map((subStep, subIndex) => (
                    <li key={subIndex} className="mt-1">
                      {subStep}
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}