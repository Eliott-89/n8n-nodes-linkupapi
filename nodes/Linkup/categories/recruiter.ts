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
        const getCandidatesJobId = context.getNodeParameter(
          "jobId",
          itemIndex,
          ""
        ) as string;
        const getCandidatesParams = context.getNodeParameter(
          "getCandidatesParams",
          itemIndex,
          {}
        ) as any;
        if (getCandidatesJobId) body.job_id = getCandidatesJobId;
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
        const getCandidateCVApplicationId = context.getNodeParameter(
          "applicationId",
          itemIndex,
          ""
        ) as string;
        const getCandidateCVParams = context.getNodeParameter(
          "getCandidateCVParams",
          itemIndex,
          {}
        ) as any;
        if (getCandidateCVApplicationId)
          body.application_id = getCandidateCVApplicationId;
        if (getCandidateCVParams.country)
          body.country = getCandidateCVParams.country;
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
        const createJobCompanyUrl = context.getNodeParameter(
          "companyUrl",
          itemIndex,
          ""
        ) as string;
        const createJobTitle = context.getNodeParameter(
          "jobTitle",
          itemIndex,
          ""
        ) as string;
        const createJobPlace = context.getNodeParameter(
          "place",
          itemIndex,
          ""
        ) as string;
        const createJobHtmlDescription = context.getNodeParameter(
          "html_description",
          itemIndex,
          ""
        ) as string;
        const createJobParams = context.getNodeParameter(
          "createJobParams",
          itemIndex,
          {}
        ) as any;
        
        if (createJobCompanyUrl) body.company_url = createJobCompanyUrl;
        if (createJobTitle) body.title = createJobTitle;
        if (createJobPlace) body.place = createJobPlace;
        if (createJobHtmlDescription) body.html_description = createJobHtmlDescription;
        
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