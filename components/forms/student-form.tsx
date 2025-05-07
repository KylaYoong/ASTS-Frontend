import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function StudentForm() {
  const [studentId, setStudentId] = useState("")
  const [studentName, setStudentName] = useState("")
  const [enrolYear, setEnrolYear] = useState("")
  const [enrolSemester, setEnrolSemester] = useState("")
  const [courseCode, setCourseCode] = useState("")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const payload = {
      studentId,
      studentName,
      enrolYear,
      enrolSemester,
      courseCode,
    };

    try {
      const response = await fetch(
        "http://localhost:8080/asts/info/student/insertOrUpdateStudent",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();

      if (responseData.data) {
        // If the response contains data, it indicates success
        setMessage("✅ Student inserted/updated successfully!");
        // Reset form fields after successful submission
        setStudentId("");
        setStudentName("");
        setEnrolYear("");
        setEnrolSemester("");
        setCourseCode("");
      } else {
        // If no data is returned, show the error message
        setMessage(`❌ Error: ${responseData.resultMessage}`);
      }
    } catch (err) {
      // Handle any errors during the fetch request
      setMessage(`❌ Error: ${err}`);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">Student</h1>
        <Button variant="outline" className="gap-2">
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path
              d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Upload
        </Button>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="space-y-2">
          <label className="text-lg">Student ID:</label>
          <Input
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            placeholder="Enter student ID"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Student Name:</label>
          <Input
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Enter student name"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Enrol Year:</label>
          <Input
            value={enrolYear}
            onChange={(e) => setEnrolYear(e.target.value)}
            placeholder="Enter enrol year"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Enrol Semester:</label>
          <Input
            value={enrolSemester}
            onChange={(e) => setEnrolSemester(e.target.value)}
            placeholder="Enter enrol semester"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <div className="space-y-2">
          <label className="text-lg">Course ID:</label>
          <Input
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
            placeholder="Enter course id"
            className="w-full rounded-lg text-lg p-3"
          />
        </div>

        <Button type="submit" className="bg-black text-white px-8 py-2 rounded-lg text-lg hover:bg-black/90">
          Save
        </Button>
      </form>

      {message && <p className="text-base mt-4">{message}</p>}
    </div>
  )
}
