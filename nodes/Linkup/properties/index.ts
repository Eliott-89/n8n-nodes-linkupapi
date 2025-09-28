import { INodeProperties } from "n8n-workflow";
import { commonProperties } from "./common";
import { authenticationProperties } from "./authentication";
import { profileProperties } from "./profile";
import { companyProperties } from "./company";
import { networkProperties } from "./network";
import { messageProperties } from "./message";
import { postProperties } from "./post";
import { recruiterProperties } from "./recruiter";
import { companyApiProperties } from "./companyApi";
import { personApiProperties } from "./personApi";
import { multiRequestsProperties } from "./multiRequests";
import { mailApiProperties } from "./mailApi";
import { advancedProperties } from "./advanced";

// Combine all properties into a single array
// Order: Credentials -> Resource -> Operation -> Parameters -> Advanced Options
export const nodeProperties: INodeProperties[] = [
  ...commonProperties,
  ...authenticationProperties,
  ...profileProperties,
  ...companyProperties,
  ...networkProperties,
  ...messageProperties,
  ...postProperties,
  ...recruiterProperties,
  ...companyApiProperties,
  ...personApiProperties,
  ...mailApiProperties,
  ...multiRequestsProperties,
  ...advancedProperties, // Advanced Options en dernier
];
