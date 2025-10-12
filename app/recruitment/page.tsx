"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";

interface FormData {
  name: string;
  year: string;
  regNo: string; // Will map to "Reg no"
  department: string;
  specialization?: string; // Will map to "Specilisation"
  contactNo: string; // Will map to "contact"
  email: string;
  srmEmail: string; // Will map to "srm email"
  linkedinProfile?: string; // Now optional, will map to "Linkedin"
  githubProfile?: string; // Now optional, will map to "Github"
  otherLinks?: string; // Will map to "other"
  domain: string;
  subdomain?: string; // New field for non-technical subdomains
  priorActivities: string; // Will map to "prior activities"
  resumeLink?: string; // Now optional, will map to "resume link"
}

export default function Careers() {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormData>();
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    console.log("Form data:", data);
    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Create a default LinkedIn URL and Resume link to satisfy database NOT NULL constraints
      const defaultLinkedInURL = "https://linkedin.com/in/not-provided";
      const defaultResumeLink = "https://drive.google.com/not-provided";
      
      // Validate format of optional fields if provided
      if (data.resumeLink && typeof data.resumeLink === 'string' && !data.resumeLink.includes("drive.google.com")) {
        setSubmitError("If providing a resume link, please enter a valid Google Drive link");
        setIsSubmitting(false);
        return;
      }
      
      if (data.linkedinProfile && typeof data.linkedinProfile === 'string' && !data.linkedinProfile.includes("linkedin.com")) {
        setSubmitError("If providing a LinkedIn profile, please enter a valid LinkedIn URL");
        setIsSubmitting(false);
        return;
      }
      
      // Prepare the payload for the new API endpoint
      const payload = {
        name: data.name,
        year: data.year,
        regNo: data.regNo,
        department: data.department,
        specialization: data.specialization || "",
        contactNo: data.contactNo,
        email: data.email,
        srmEmail: data.srmEmail,
        // Use default values to satisfy database NOT NULL constraints
        linkedinProfile: (data.linkedinProfile && data.linkedinProfile.trim()) || defaultLinkedInURL,
        githubProfile: (data.githubProfile && data.githubProfile.trim()) || undefined,
        otherLinks: (data.otherLinks && data.otherLinks.trim()) || undefined,
        domain: data.domain,
        // Include subdomain only if domain is non-technical (explicitly set to improve debugging)
        subdomain: data.domain === "non-technical" ? data.subdomain : null,
        priorActivities: data.priorActivities,
        // Use default resume link to satisfy database NOT NULL constraint if needed
        resumeLink: (data.resumeLink && data.resumeLink.trim()) || defaultResumeLink
      };

      // Debug the payload to see if subdomain is included
      console.log("Submitting payload:", payload);
      
      // Add retry mechanism for network resilience
      let retries = 0;
      const maxRetries = 3;
      
      // Initialize response outside the try block
      let response = null;
      
      while (retries < maxRetries) {
        try {
          response = await fetch("https://recruitment-fvbnapazb8d8bqgf.southindia-01.azurewebsites.net/api/recruitment", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            // Add timeout to avoid hanging requests
            signal: AbortSignal.timeout(15000) // 15 second timeout
          });
          break; // If successful, exit the retry loop
        } catch (e) {
          retries++;
          console.log(`Attempt ${retries} failed. Retrying...`);
          if (retries >= maxRetries) throw e; // If we've reached max retries, rethrow the error
          // Wait before retrying (exponential backoff)
          await new Promise(resolve => setTimeout(resolve, 1000 * retries));
        }
      }

      // Ensure we have a response
      if (!response) {
        throw new Error("Failed to get a response after multiple attempts");
      }
      
      const result = await response.json();
      console.log("Response from API:", result);

      if (response.ok && result.success) {
        setSubmitted(true);
        reset();
        // Scroll to the top of the form to see the success message
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Handle specific HTTP status codes
        if (response.status === 409) {
          // Conflict - duplicate entry
          throw new Error(result.error || "You have already submitted an application with these details.");
        }
        
        // Show detailed validation errors if available
        if (result.details && Array.isArray(result.details)) {
          const errorMessages = result.details.map((detail: any) => `${detail.path}: ${detail.msg}`).join(', ');
          throw new Error(`Validation failed: ${errorMessages}`);
        }
        throw new Error(result.error || "Failed to save data");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      
      // Provide more helpful error messages based on error type
      let errorMessage = "Unknown error occurred";
      
      if (error instanceof TypeError && error.message.includes("fetch")) {
        errorMessage = "Network error: Please check your internet connection and try again";
      } else if (error instanceof Error) {
        // If it's an AbortError (timeout), provide a specific message
        if (error.name === "AbortError") {
          errorMessage = "Request timed out. The server might be experiencing high load. Please try again.";
        } else {
          errorMessage = error.message;
        }
      }
      
      setSubmitError(`Error submitting your application: ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <motion.form
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl space-y-4"
      >
        <h1 className="text-3xl font-bold text-center mb-6 text-[#f39e2f]">Join Our Team</h1>

        {isSubmitting && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-4 mb-4 bg-blue-50 text-blue-700 border border-blue-200 rounded-md flex items-center justify-center"
          >
            <svg className="animate-spin h-5 w-5 mr-3 text-blue-600" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Submitting your application... Please wait
          </motion.div>
        )}

        {submitError && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 mb-4 bg-red-50 text-red-700 border border-red-200 rounded-md"
          >
            <div className="flex">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="font-bold">Submission Error</p>
                <p>{submitError}</p>
                <button 
                  type="button"
                  onClick={() => setSubmitError(null)}
                  className="mt-2 text-sm underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {submitted && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.5 }}
            className="p-6 mb-6 text-green-700 bg-green-100 rounded-lg border border-green-500 shadow-lg"
          >
            <div className="flex flex-col items-center text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-bold mb-2">Application Submitted Successfully!</h3>
              <p>Thanks for applying to join ChipSet! We will review your application and contact you soon.</p>
            </div>
          </motion.div>
        )}

        {submitError && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-4 mb-4 text-red-700 bg-red-100 rounded-lg">
            ❌ {submitError}
          </motion.div>
        )}

        {/* Full Name */}
        <label className="block text-sm font-medium">Full Name *</label>
        <input type="text" {...register("name", { required: "Name is required" })} className="w-full p-3 border rounded-lg" />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        {/* Year */}
        <label className="block text-sm font-medium">Year *</label>
        <select {...register("year", { required: "Year is required" })} className="w-full p-3 border rounded-lg">
          <option value="">Select year</option>
          <option value="1">1st Year</option>
          <option value="2">2nd Year</option>
          
        </select>
        {errors.year && <p className="text-red-500">{errors.year.message}</p>}

        {/* Registration Number */}
        <label className="block text-sm font-medium">Registration Number *</label>
        <input type="text" {...register("regNo", { required: "Registration number is required" })} className="w-full p-3 border rounded-lg" />
        {errors.regNo && <p className="text-red-500">{errors.regNo.message}</p>}

        {/* Department */}
        <label className="block text-sm font-medium">Department *</label>
        <input type="text" {...register("department", { required: "Department is required" })} className="w-full p-3 border rounded-lg" />
        {errors.department && <p className="text-red-500">{errors.department.message}</p>}

        {/* Specialization */}
        <label className="block text-sm font-medium">Specialization (Optional)</label>
        <input type="text" {...register("specialization")} className="w-full p-3 border rounded-lg" placeholder="e.g., AI/ML, cloud computing, etc." />

        {/* Contact Number */}
        <label className="block text-sm font-medium">Contact Number *</label>
        <input type="tel" {...register("contactNo", { required: "Contact number is required" })} className="w-full p-3 border rounded-lg" />
        {errors.contactNo && <p className="text-red-500">{errors.contactNo.message}</p>}

        {/* Email */}
        <label className="block text-sm font-medium">Personal Email *</label>
        <input type="email" {...register("email", { required: "Email is required" })} className="w-full p-3 border rounded-lg" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        {/* SRM Email */}
        <label className="block text-sm font-medium">SRM Email *</label>
        <input type="email" {...register("srmEmail", { required: "SRM email is required" })} className="w-full p-3 border rounded-lg" />
        {errors.srmEmail && <p className="text-red-500">{errors.srmEmail.message}</p>}

        {/* LinkedIn (Optional) */}
        <label className="block text-sm font-medium">LinkedIn (Optional)</label>
        <input type="url" placeholder="https://linkedin.com/in/..." {...register("linkedinProfile")} className="w-full p-3 border rounded-lg" />
        {errors.linkedinProfile && <p className="text-red-500">{errors.linkedinProfile.message}</p>}
        <p className="text-xs text-gray-500 mt-1">
          Leave blank if you don&apos;t have a LinkedIn profile.
        </p>

        {/* GitHub (Optional) */}
        <label className="block text-sm font-medium">GitHub (Optional)</label>
        <input type="url" placeholder="https://github.com/..." {...register("githubProfile")} className="w-full p-3 border rounded-lg" />
        {errors.githubProfile && <p className="text-red-500">{errors.githubProfile.message}</p>}

        {/* Other Links (Optional) */}
        <label className="block text-sm font-medium">Other Links (Optional)</label>
        <input type="url" placeholder="Portfolio, Behance, etc..." {...register("otherLinks")} className="w-full p-3 border rounded-lg" />
        {errors.otherLinks && <p className="text-red-500">{errors.otherLinks.message}</p>}

        {/* Domain */}
        <label className="block text-sm font-medium">Domain *</label>
        <select 
          {...register("domain", { required: "Domain is required" })} 
          className="w-full p-3 border rounded-lg"
        >
          <option value="">Select your domain</option>
          <option value="technical">Technical (Competitive programming, e.t.c)</option>
          <option value="non-technical">Non-Technical</option>
        </select>
        {errors.domain && <p className="text-red-500">{errors.domain.message}</p>}
        
        {/* Subdomain - Only shown if Non-Technical is selected */}
        {watch("domain") === "non-technical" && (
          <div className="mt-4">
            <label className="block text-sm font-medium">Non-Technical Subdomain *</label>
            <select 
              {...register("subdomain", { 
                required: watch("domain") === "non-technical" ? "Subdomain is required" : false 
              })} 
              className="w-full p-3 border rounded-lg"
            >
              <option value="">Select your subdomain</option>
              <option value="designing">Designing</option>
              <option value="video-editing">Video Editing</option>
              <option value="content-writing">Content Writing</option>
              <option value="pr-marketing">PR & Marketing</option>
            </select>
            {errors.subdomain && <p className="text-red-500">{errors.subdomain.message}</p>}
          </div>
        )}

        {/* Why should we recruit you? */}
        <label className="block text-sm font-medium">Why should we recruit you? *</label>
        <textarea {...register("priorActivities", { required: "Please describe your prior activities" })} className="w-full p-3 border rounded-lg" />
        {errors.priorActivities && <p className="text-red-500">{errors.priorActivities.message}</p>}

        {/* Resume Link (Optional) */}
        <label className="block text-sm font-medium">Resume Link/Works related to domain (Google Drive) (Optional)</label>
        <input 
          type="url" 
          placeholder="https://drive.google.com/..." 
          {...register("resumeLink", { 
            pattern: {
              value: /drive\.google\.com/,
              message: "Please enter a valid Google Drive link"
            }
          })} 
          className="w-full p-3 border rounded-lg" 
        />
        {errors.resumeLink && <p className="text-red-500">{errors.resumeLink.message}</p>}
        <p className="text-xs text-gray-500 mt-1">
          Optional: If you have a resume, upload it to Google Drive, make it accessible to anyone with the link, and paste the link here. If you are applying for design or video editing, make sure you add related works in the Google Drive link for the same.
        </p>

        {/* Submit Button */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          className={`w-full p-4 mt-4 rounded-lg text-white font-bold ${
            isSubmitting ? "bg-gray-400" : "bg-[#f39e2f] hover:bg-orange-600"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Submit Application"}
        </motion.button>
      </motion.form>
    </div>
  );
}
