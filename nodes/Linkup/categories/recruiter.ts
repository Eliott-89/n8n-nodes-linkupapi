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

        // Required parameter validation
        if (!getCandidatesParams.job_id) {
          throw new Error("Job ID is required for this operation");
        }

        if (getCandidatesParams.job_id)
          body.job_id = getCandidatesParams.job_id;
        // country from node params removed; credentials will inject it
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
        if (getJobPostsParams.job_id) body.job_id = getJobPostsParams.job_id;
        if (getJobPostsParams.fetch_details !== undefined)
          body.fetch_details = getJobPostsParams.fetch_details;
        if (getJobPostsParams.total_results)
          body.total_results = getJobPostsParams.total_results;
        if (getJobPostsParams.start_page)
          body.start_page = getJobPostsParams.start_page;
        if (getJobPostsParams.end_page)
          body.end_page = getJobPostsParams.end_page;
        // country from node params removed; credentials will inject it
        break;

      case "getCandidateCV":
        const applicationParams = context.getNodeParameter(
          "applicationParams",
          itemIndex,
          {}
        ) as any;

        // Required parameter validation
        if (!applicationParams.application_id) {
          throw new Error("Application ID is required for this operation");
        }

        if (applicationParams.application_id)
          body.application_id = applicationParams.application_id;
        // country from node params removed; credentials will inject it
        break;

      case "publishJob":
      case "closeJob":
        const publishCloseJobParams = context.getNodeParameter(
          "publishCloseJobParams",
          itemIndex,
          {}
        ) as any;

        // Required parameter validation
        if (!publishCloseJobParams.job_id) {
          throw new Error("Job ID is required for this operation");
        }

        if (publishCloseJobParams.job_id)
          body.job_id = publishCloseJobParams.job_id;
        // country from node params removed; credentials will inject it
        break;

      case "createJob":
        const createJobParams = context.getNodeParameter(
          "createJobParams",
          itemIndex,
          {}
        ) as any;

        // Required parameter validation
        if (!createJobParams.company_url) {
          throw new Error("Company URL is required for this operation");
        }
        if (!createJobParams.title) {
          throw new Error("Title is required for this operation");
        }
        if (!createJobParams.place) {
          throw new Error("Location is required for this operation");
        }
        if (!createJobParams.html_description) {
          throw new Error("HTML description is required for this operation");
        }

        if (createJobParams.company_url)
          body.company_url = createJobParams.company_url;
        if (createJobParams.title) body.title = createJobParams.title;
        if (createJobParams.place) body.place = createJobParams.place;
        if (createJobParams.html_description)
          body.html_description = createJobParams.html_description;

        // country from node params removed; credentials will inject it
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

    // Inject country from credentials (overrides any param)
    const creds = await context.getCredentials("linkupApi");
    if (creds && (creds as any).country) {
      (body as any).country = (creds as any).country;
    }

    return body;
  }
}
