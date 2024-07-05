"use client"
import { useMutation, useQuery } from '@apollo/client';
import { SINGLEJOBRESULT } from "@/utils/gql/GQL_QUERIES";
import { ADD_CANDIDATE_RESPONSE_MUTATION } from "@/utils/gql/GQL_MUTATION";
import { useSearchParams } from "next/navigation";
import  { Suspense, useState } from "react";
import { Watch } from 'react-loader-spinner';
import next from 'next';
// import Loader from 'react-loader-spinner';
interface FormData {
  
  jobID: string;
  name: string;
  email: string;
  contactNumber: string;
  currentCity: string;
  highestQualification: string;
  gender: string;
  isStudent: string;
  isWorkingProfessional: string;
  passingYear: string;
  relevantExperience: string;
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  resume: string;
  consent: boolean;
}

const QuestionPage = ({ params }: { params: { id: string } }) => {

  const searchParams = useSearchParams();
 
  // Fetching jobID and other parameters from URL
  const jobID = searchParams.get('jobid');
  const name = searchParams.get('name');
  const email = searchParams.get('email');
  const contactNumber = searchParams.get('contactNumber');
  const currentCity = searchParams.get('currentCity');
  const highestQualification = searchParams.get('highestQualification');
  const gender = searchParams.get('gender');
  const isStudent = searchParams.get('isStudent');
  const isWorkingProfessional = searchParams.get('isWorkingProfessional');
  const passingYear = searchParams.get('passingYear');
  const relevantExperience = searchParams.get('relevantExperience');

  // Query to fetch job details
  const { data, loading, error } = useQuery(SINGLEJOBRESULT, {
    variables: { job_id: jobID },
  });

  // State to manage form data
  const [formData, setFormData] = useState({
   
    jobID: jobID || '',
    name: name || '',
    email: email || '',
    contactNumber: contactNumber || '',
    currentCity: currentCity || '',
    highestQualification: highestQualification || '',
    gender: gender || '',
    isStudent: String(isStudent || false),
    isWorkingProfessional: String(isWorkingProfessional || false),
    passingYear: passingYear || '',
    relevantExperience: relevantExperience || '',
    question1: '',
    question2: '',
    question3: '',
    question4: '',
    question5: '',
    resume: '',
    consent: false,
  });

  // Mutation hook to execute the mutation
  const [addCandidate, { loading: mutationLoading }] = useMutation(ADD_CANDIDATE_RESPONSE_MUTATION);

  // Function to handle input changes in the form
  const handleInputChange = (e:any) => {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: checked,
      }));
    } else if (type === 'file') {
      setFormData((prevData) => ({
        ...prevData,
        [name]: files[0], // Store the File object directly
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Function to handle form submission
  const handleSubmit = async (e: React.ChangeEvent<any>) => {
    e.preventDefault();
    try {
      // Disable the submit button during mutation loading
      const submitButton = document.getElementById('submit-button') as HTMLButtonElement | null;
      if (submitButton) submitButton.disabled = true;
      const { data } = await addCandidate({
        variables: {
          answer1: formData.question1.toString(),
          answer2: formData.question2.toString(),
          answer3: formData.question3.toString(),
          answer4: formData.question4.toString(),
          answer5: formData.question5.toString(),
          city: formData.currentCity.toString(),
          contact: formData.contactNumber.toString(),
          job_id: formData.jobID.toString(),
          passing_year: formData.passingYear.toString(),
          qualification: formData.highestQualification.toString(),
          student: formData.isStudent.toString(), // Ensure boolean to string conversion
          year_of_experience: formData.relevantExperience.toString(),
          working_professional: formData.isWorkingProfessional.toString(),
          email: formData.email.toString(),
          gender: formData.gender.toString(),
          name: formData.name.toString(),
          resume: formData.resume, // Ensure boolean to string conversion
        },
      });
      console.log('Form submitted successfully:', data);
      alert('Form submitted successfully!');
      // Clear form data after successful submission
      setFormData({
        ...formData,
        question1: '',
        question2: '',
        question3: '',
        question4: '',
        question5: '',
        resume: '',
        consent: false,
      });
    } catch (error) {
      console.error('Form submission failed:', error);
      alert('Error submitting form. Please try again later.');
    } finally {
      // Enable the submit button after submission (whether success or failure)
      const submitButton = document.getElementById('submit-button') as HTMLButtonElement | null;
      if (submitButton) submitButton.disabled = true;
    }
  };

  if (loading) {
    // Show loader or shimmer effect while data is being fetched
    return (
      <div className="container mx-auto p-4 flex justify-center">
        <Watch
  visible={true}
  height="80"
  width="80"
  radius="48"
  color="#500724"
  ariaLabel="watch-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
      </div>
    );
  }
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-[#500724] text-white p-4">
          <div className="text-3xl font-bold mb-2 text-center">{data.jobInfo.job_title}</div>
          <div className="text-xl mb-2 text-center">JOB-ID: {data.jobInfo.job_id}</div>
          <div className="text-sm text-center mb-4">Location: {data.jobInfo.job_location}</div>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          {Object.keys(data.jobInfo).map((key) => {
            if (key.startsWith('question')) {
              return (
                <div key={key} className="mb-4">
                  <label htmlFor={key} className="block text-lg font-bold mb-2">{data.jobInfo[key]}</label>
                  <textarea
                    id={key}
                    placeholder='Answer in your own words '
                    name={key}
                    className="border rounded-lg px-4 py-2 w-full border-gray-400 h-32 resize-none"
                    value={formData[key as keyof FormData] as string} // Type assertion here
                    onChange={handleInputChange}
                  />
                </div>
              );
            }
            return null;
          })}

          <div className="mb-4">
            <label htmlFor="resume" className="block text-lg font-bold mb-2">Upload Resume</label>
            <input
              type="text"
              id="resume"
              name="resume"
              placeholder='Add resume link '
              className="border border-gray-400 rounded-lg px-4 py-2 w-full"
              onChange={handleInputChange}
            />
            <p className="text-sm text-red-600 mt-1">(Upload the drive link of your resume, make sure it is in public directory)</p>
          </div>

          <div className="mb-4">
            <label htmlFor="consent" className="block text-lg font-bold mb-2">
              <input
                type="checkbox"
                id="consent"
                name="consent"
                className="mr-2"
                checked={formData.consent}
                onChange={handleInputChange}
              />
              I agree that the information provided is correct and agree to all terms and conditions.
            </label>
          </div>

          <div className="mb-4 text-center">
            <button
              id="submit-button" // Add an ID to the submit button
              type="submit"
              className="bg-pink-500 text-white px-4 py-2 rounded-md font-semibold hover:bg-pink-600 transition duration-300"
              disabled={mutationLoading} // Disable the button when mutation is loading
            >
              {mutationLoading ? (
                <span>Submitting...</span> // Show loading text when mutation is in progress
              ) : (
                <>
                  Submit
                  <svg
                    className="w-5 h-5 inline-block ml-1 -mr-1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    ></path>
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
 
};

export default QuestionPage;
