"use client";
export default function Challenge() {
  const organizers = [
    { name: 'Zhu-Tian Chen', affiliation: 'University of Minnesota' },
    { name: 'Qianwen Wang', affiliation: 'University of Minnesota' },
    { name: 'Pan Hao', affiliation: 'University of Minnesota' },
    { name: 'Divyanshu Tiwari', affiliation: 'University of Minnesota' },
    { name: 'James Yang', affiliation: 'University of Minnesota' },
    { name: 'Shivam Raval', affiliation: 'Harvard University' },
    { name: 'Enrico Bertini', affiliation: 'Northeastern University' },
    { name: 'Trevor DePodesta', affiliation: 'Harvard University' },
    { name: 'Niklas Elmqvist', affiliation: 'Aarhus University' },
    { name: 'Nam Wook Kim', affiliation: 'Boston College' },
    { name: 'Yun Wang', affiliation: 'Microsoft Research' },
    { name: 'Emily Reif', affiliation: 'Google Research & University of Washington' },
    { name: 'Pranav Rajan', affiliation: 'KTH Royal Institute of Technology' },
    { name: 'Renata G. Raidou', affiliation: 'TU Wien' },
    { name: 'Olivia Seow', affiliation: 'Harvard University' },
    { name: 'Catherine Yeh', affiliation: 'Harvard University' },
  ];

  return (
    <div className="p-12 flex flex-col gap-2">
      <div className="py-12 px-4">
        <div className="flex flex-col max-w-5xl mx-auto gap-8">
          {/* put stuff here to keep the stylistic consistency */}
          <h1 className="text-3xl font-bold">Mini Challenge</h1>
          <div className="p-4">
            {" "}
            The mini challenge encourages the exploration of how AI agents can
            automate data visualization and visual analytics.
            <br />
            <br />
            We provides the dataset to visualize (
            <a
              href="https://sites.google.com/site/vispubdata/home"
              className="bg-gray-100 p-1 rounded-md"
            >
              VisPubData
            </a>
            ), alongside a agentic template capable of inputting
            and analyzing dataset, and producing concise one-page reports. The
            template is to help get started quickly.
          </div>

          {/* <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Dataset to Visualize</h1>
            <p>
            <a href="https://sites.google.com/site/vispubdata/home" className="text-blue-500">VisPubData</a>, includes information on IEEE Visualization (IEEE VIS) publications from 1990-2024 as well as IEEE TVCG and IEEE CG&A article published at IEEE VIS. 
            </p>
          </div> */}

          {/* list participants number  */}

          {/* evaluation section */}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Evaluation</h1>
            After the server closes, we will apply a review process similar to
            that of paper submissions. Evaluation criteria include:
            <ul className="flex flex-col gap-2 mt-2 list-disc list-inside">
              <li>
                <b>Agent-generated report</b> — clarity, coherence, and
                insightfulness;
              </li>
              <li>
                <b>Technical report</b> — explanation of key decisions,
                challenges faced, and lessons learned.
              </li>
              Accepted submissions will be invited to present their works.
            </ul>
          </div>

          {/* submission section */}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Submission</h1>
            The template as baseline is available at{" "}
            <a
              href="https://github.com/demoPlz/mini-template"
              className="bg-blue-100 p-1 rounded-md text-500"
            >
              Mini Challenge Template
            </a>
            . Please use it as to get started. You can submit your agent
            implementation to the evaluation server once logged in. You could
            submit multiple times, up to{" "}
            <span className="bg-gray-100 p-1 rounded-md">5 times per day</span>,
            a maximum of{" "}
            <span className="bg-gray-100 p-1 rounded-md">100 times</span>{" "}
            throughout the challenge.

            <div className="mt-10">
              <a href="/guides" className="bg-green-100 p-2 rounded-md text-500 border border-green-200 font-semibold hover:bg-green-200">
                Guides: How to submit with the template?
              </a>
            </div>
          </div>

          {/* leaderboards section */}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Leaderboards</h1>
            In this competition, we offer both public and private leaderboards:
            <ul className="flex flex-col gap-2 mt-2 list-disc list-inside">
              <li>
                <b>Public leaderboard: </b>
                This determines the mini-challenge awards. All the{" "}
                <span className="bg-gray-100 p-1 rounded-md">
                  finalized submissions
                </span>{" "}
                are shown which reviewers will evaluate.
              </li>
              <li>
                <b>Private leaderboard: </b>
                Displays all your previous submissions. You can review them and
                mark only one as your finalized submission.
                {/* up to ten of your most recent submissions*/}
              </li>
            </ul>
          </div>

          {/* FAQ section */}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">FAQ</h1>
            <p className="flex flex-col gap-2">
              <ul className="flex flex-col gap-2 mt-2 list-disc list-inside">
                <li>
                  <b>Do I need an OpenAI API key?</b>
                  <br />
                  You’ll need an API key to test your agent locally. However,
                  it’s not required for submissions — the evaluation server will
                  handle all LLM calls using GPT-4o (version: 2024-11-20).
                </li>

                <li>
                  <b>Will the mini-challenge count as a publication?</b> <br />
                  Yes, awarded submissions will be published in the same format
                  as the short paper submissions.
                </li>
                <li>
                  <b>How should submissions be formatted?</b> <br />
                  Submit a ZIP file containing: agent.py: Your agent
                  implementation (at the root). requirements.txt: Lists Python
                  dependencies (also at the root). Other files: Any additional
                  files needed for your agent to run.
                </li>
                <li>
                  <b>Do we support frameworks other than LangGraph?</b> <br />
                  Yes. As long as your implementation follows the template
                  instructions and the interface in{" "}
                  <span className="bg-yellow-100 p-1 rounded-md">
                    agent.py
                  </span>{" "}
                  with your class agent and produces an{" "}
                  <span className="bg-yellow-100 p-1 rounded-md">
                    output.pdf
                  </span>{" "}
                  in the root directory during evaluation, you're free to use
                  other frameworks.
                </li>
              </ul>
            </p>
          </div>

          {/* Timeline section */}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Timeline</h1>
            <ul className="flex flex-col gap-2 mt-2 list-disc list-inside">
              <li>
                <b>Submission Site Opens:</b> June 1st, 2025
              </li>
              <li>
                <b>Challenge closes:</b> Aug 30th, 2025
              </li>
              <li>
                <b>Author Notification:</b> Sep 15th, 2025
              </li>
              <li>
                <b>Camera-Ready Deadline:</b> Oct 1st, 2025
              </li>
              <li>
                <b>Workshop Day:</b> Nov 2nd or 3rd, 2025
              </li>
            </ul>
          </div>

          {/* Forum section */}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Forum</h1>
            <p>
              Please join the{" "}
              <a href="https://discord.gg/MqVn2df5Us" className="bg-purple-100 p-1 rounded-md text-500 hover:bg-purple-200">
                Discord server
              </a>{" "}
              and discuss more about the challenge.
            </p>
          </div>

          {/* Organizers section */}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Organizers</h1>
            <p>
              {organizers.map((organizer, index) => (
                <div key={index}>
                  <b>{organizer.name}</b> - {organizer.affiliation}
                </div>
              ))}
            </p>
          </div>
          {/* Awards section */}
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-2">Awards</h1>
            <p>Coming soon!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
