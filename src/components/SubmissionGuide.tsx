export default function SubmissionGuide() {
    return (
      <div className="p-12 flex flex-col gap-8">
        <div className="py-12 px-4">
          <div className="flex flex-col max-w-5xl mx-auto gap-8">
            <h1 className="text-3xl font-bold">How to Submit for the Challenge</h1>
  
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-xl font-semibold mb-2">Step 1: Clone the Template</h2>
              <p className="m-3">
                Go to the <a className="text-blue-500" href="https://github.com/demoPlz/mini-template">mini-challenge template GitHub repository</a> and either download it or clone it to your local machine:
              </p>
              <pre className="bg-gray-100 p-3 rounded m-3">
                <code>git clone https://github.com/demoPlz/mini-template.git</code>
              </pre>
                <img
                  src="./screenshots/clones.png"
                  alt="Screenshot of cloning the repository"
                  className="rounded size-1/2"
                />
            </div>
  
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Step 2: Prepare Your Submission Zip</h2>
              <p>
                Inside the cloned folder, compress your <span className="bg-blue-100 p-1 rounded">submission</span> directory into <code>submission.zip</code>:
              </p>
              {/* <pre className="bg-gray-100 p-2 rounded">
                <code>cd mini-challenge-template <br />
  zip -r submission.zip path/to/your-submission-folder</code>
              </pre> */}
              <div className="mt-4">
                <img
                  src="./screenshots/clones.png"
                  alt="Screenshot of creating submission.zip"
                  className="rounded size-1/2"
                />
              </div>
            </div>
  
            {/* Step 3 */}
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Step 3: Register or Log In</h2>
              <p>
                Go to <a className="text-blue-500" href="https://purple-glacier-014f19d1e.6.azurestaticapps.net/signin">
                    https://purple-glacier-014f19d1e.6.azurestaticapps.net/signin</a> to login:
              </p>
              <div className="mt-4">
                <img
                  src="./screenshots/login.png"
                  alt="Screenshot of login or registration page"
                  className="border rounded size-1/2"
                />
              </div>
            </div>
  
            {/* Step 4 */}
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Step 4: Upload Your Submission</h2>
              <p>
                Navigate to your home page, click "Submit", and upload <code>submission.zip</code>.
              </p>
              <div className="mt-4">
                <img
                  src="./screenshots/clones.png"
                  alt="Screenshot of submission upload"
                  className="border rounded"
                />
              </div>
            </div>
  
            {/* Step 5 */}
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Step 5: Finalize Your Submission</h2>
              <p>
                Go to "My Submissions" to view all uploads. Select one as your final submission if you have multiple entries.
              </p>
              <div className="mt-4">
                <img
                  src="./screenshots/clones.png"
                  alt="Screenshot of finalizing submission"
                  className="border rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  