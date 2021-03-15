import {MatchedHeadingInfo} from "./matched-heading-info";

export interface Paragraph {
  headingName: string;
  finalName: string;
  subheadingsNames: string[];
  fileName: string;
  // isMatched: boolean;
  // matchedHeadingInfo: MatchedHeadingInfo;
}
