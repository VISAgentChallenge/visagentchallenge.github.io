export type Submission = {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  status: string;
  created_at: string;
  updated_at: string;
  score: number;
  isFinal: boolean;
  metrics: { total_time: number };
};

export type SubmissionList = {
  submissions: Submission[];
};
