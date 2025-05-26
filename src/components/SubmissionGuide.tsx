import { useState } from 'react';

export default function SubmissionGuide() {
  const [open, setOpen] = useState(true);

  return (
    <div className="p-12 flex flex-col gap-8">
      <div className="py-12 px-4">
        <div className="flex flex-col max-w-5xl mx-auto gap-0">
          {/* ── Clickable tab header ── */}
          <div
            onClick={() => setOpen(!open)}
            className="inline-block bg-white border-x border-t border-gray-300 rounded-t-lg px-6 py-3 cursor-pointer select-none flex items-center justify-between w-full"
          >
            <h1 className="text-3xl font-bold">
              How to Submit for the Challenge
            </h1>
            <span className="text-xl">
              {open ? '▾' : '▸'}
            </span>
          </div>

          {/* ── Accordion panel ── */}
          {open && (
            <div className="border border-gray-300 rounded-b-lg bg-white shadow -mt-1 space-y-8 p-6">
              {/* Step 1 */}
              <div>
                <h2 className="text-xl font-semibold mb-2">Step 1: Clone the Template</h2>
                <p className="m-3">
                  Go to{' '}
                  <a
                    className="text-blue-500"
                    href="https://github.com/demoPlz/mini-template"
                  >
                    mini-challenge template GitHub repository
                  </a>{' '}
                  and either download it or clone it to your local machine:
                </p>
                <pre className="bg-gray-100 p-3 rounded m-3">
                  <code className="text-xs">
                    git clone https://github.com/demoPlz/mini-template.git
                  </code>
                </pre>
                <img
                  src="./screenshots/clones.png"
                  alt="Screenshot of cloning the repository"
                  className="rounded w-1/2"
                />
              </div>

              {/* Step 2 */}
              <div>
                <h2 className="text-2xl font-semibold mb-2">Step 2: Prepare Your Submission Zip</h2>
                <p>
                  Inside the cloned folder, compress your{' '}
                  <span className="bg-blue-100 p-1 rounded">submission</span> directory
                  into <code>submission.zip</code>:
                </p>
                <div className="mt-4">
                  <img
                    src="./screenshots/clones.png"
                    alt="Screenshot of creating submission.zip"
                    className="rounded w-1/2"
                  />
                </div>
              </div>

              {/* Step 3 */}
              <div>
                <h2 className="text-2xl font-semibold mb-2">Step 3: Register or Log In</h2>
                <p>
                  Go to{' '}
                  <a
                    className="text-blue-500"
                    href="https://purple-glacier-014f19d1e.6.azurestaticapps.net/signin"
                  >
                    https://purple-glacier-014f19d1e.6.azurestaticapps.net/signin
                  </a>{' '}
                  to sign in or register:
                </p>
                <div className="mt-4">
                  <img
                    src="./screenshots/login.png"
                    alt="Screenshot of login or registration page"
                    className="border rounded w-1/2"
                  />
                </div>
              </div>

              {/* Step 4 */}
              <div>
                <h2 className="text-2xl font-semibold mb-2">Step 4: Upload Your Submission</h2>
                <p>
                  Navigate to your home page, upload your <code>submission.zip</code>.
                </p>
                <div className="mt-4">
                  <img
                    src="./screenshots/upload.png"
                    alt="Screenshot of submission upload"
                    className="border rounded"
                  />
                </div>
              </div>

              {/* Step 5 */}
              <div>
                <h2 className="text-2xl font-semibold mb-2">Step 5: Manage Your Submissions</h2>
                <p>View all your submissions with the status and the results.</p>
                <div className="mt-4 space-y-4">
                  <img
                    src="./screenshots/running.png"
                    alt="Screenshot of running submission"
                    className="border rounded"
                  />
                  <img
                    src="./screenshots/success.png"
                    alt="Screenshot of success"
                    className="border rounded"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
