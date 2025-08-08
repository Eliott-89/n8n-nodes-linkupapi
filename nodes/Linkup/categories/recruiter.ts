import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";

export class RecruiterOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<RequestBody> {
    const body: RequestBody = {};

    switch (operation) {
      case "getCandidates":
        const getCandidatesParams = context.getNodeParameter(
          "getCandidatesParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!getCandidatesParams.jobId) {
          throw new Error("L'ID du poste est requis pour cette opération");
        }
        
        if (getCandidatesParams.jobId) body.job_id = getCandidatesParams.jobId;
        if (getCandidatesParams.country)
          body.country = getCandidatesParams.country;
        if (getCandidatesParams.location)
          body.location = getCandidatesParams.location;
        if (getCandidatesParams.yearsOfExperience)
          body.yearsOfExperience = getCandidatesParams.yearsOfExperience;
        if (getCandidatesParams.sortType)
          body.sortType = getCandidatesParams.sortType;
        if (getCandidatesParams.sortOrder)
          body.sortOrder = getCandidatesParams.sortOrder;
        if (getCandidatesParams.ratings)
          body.ratings = getCandidatesParams.ratings;
        if (getCandidatesParams.start) body.start = getCandidatesParams.start;
        if (getCandidatesParams.total_results)
          body.total_results = getCandidatesParams.total_results;
        if (getCandidatesParams.start_page)
          body.start_page = getCandidatesParams.start_page;
        if (getCandidatesParams.end_page)
          body.end_page = getCandidatesParams.end_page;
        break;

      case "getJobPosts":
        const getJobPostsParams = context.getNodeParameter(
          "getJobPostsParams",
          itemIndex,
          {}
        ) as any;
        if (getJobPostsParams.country) body.country = getJobPostsParams.country;
        if (getJobPostsParams.jobId) body.job_id = getJobPostsParams.jobId;
        if (getJobPostsParams.fetchDetails !== undefined)
          body.fetch_details = getJobPostsParams.fetchDetails;
        if (getJobPostsParams.total_results)
          body.total_results = getJobPostsParams.total_results;
        if (getJobPostsParams.start_page)
          body.start_page = getJobPostsParams.start_page;
        if (getJobPostsParams.end_page)
          body.end_page = getJobPostsParams.end_page;
        break;

      case "getCandidateCV":
        const applicationParams = context.getNodeParameter(
          "applicationParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!applicationParams.applicationId) {
          throw new Error("L'ID de candidature est requis pour cette opération");
        }
        
        if (applicationParams.applicationId)
          body.application_id = applicationParams.applicationId;
        if (applicationParams.country)
          body.country = applicationParams.country;
        break;

      case "publishJob":
      case "closeJob":
        const publishCloseJobId = context.getNodeParameter(
          "jobId",
          itemIndex,
          ""
        ) as string;
        const publishCloseJobParams = context.getNodeParameter(
          "publishCloseJobParams",
          itemIndex,
          {}
        ) as any;
        if (publishCloseJobId) body.job_id = publishCloseJobId;
        if (publishCloseJobParams.country)
          body.country = publishCloseJobParams.country;
        break;

      case "createJob":
        const createJobParams = context.getNodeParameter(
          "createJobParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!createJobParams.jobTitle) {
          throw new Error("Le titre du poste est requis pour cette opération");
        }
        if (!createJobParams.jobDescription) {
          throw new Error("La description du poste est requise pour cette opération");
        }
        if (!createJobParams.companyName) {
          throw new Error("Le nom de l'entreprise est requis pour cette opération");
        }
        if (!createJobParams.location) {
          throw new Error("La localisation est requise pour cette opération");
        }
        
        if (createJobParams.jobTitle) body.title = createJobParams.jobTitle;
        if (createJobParams.jobDescription) body.html_description = createJobParams.jobDescription;
        if (createJobParams.companyName) body.company_name = createJobParams.companyName;
        if (createJobParams.location) body.place = createJobParams.location;
        
        if (createJobParams.country) body.country = createJobParams.country;
        if (createJobParams.employment_status)
          body.employment_status = createJobParams.employment_status;
        if (createJobParams.workplace)
          body.workplace = createJobParams.workplace;
        if (createJobParams.skills) {
          try {
            body.skills = JSON.parse(createJobParams.skills);
          } catch {
            body.skills = createJobParams.skills;
          }
        }
        if (createJobParams.screening_questions) {
          try {
            body.screening_questions = JSON.parse(
              createJobParams.screening_questions
            );
          } catch {
            body.screening_questions = createJobParams.screening_questions;
          }
        }
        if (createJobParams.auto_rejection_template)
          body.auto_rejection_template =
            createJobParams.auto_rejection_template;
        if (createJobParams.contact_email)
          body.contact_email = createJobParams.contact_email;
        break;
    }

    return body;
  }
} 