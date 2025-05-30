export default function SubmissionGuide() {
    return (
      <div className="p-12 flex flex-col gap-8">
        <div className="py-12 px-4">
          <div className="flex flex-col max-w-5xl mx-auto gap-8">
            <h1 className="text-3xl font-bold">How to Submit for the Challenge</h1>
  
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Step 1: Clone the Template</h2>
              <p className="m-3">
                Go to the <a className="text-blue-500" href="https://github.com/demoPlz/mini-template">mini-challenge template GitHub repository</a> and either download it or clone it to your local machine:
              </p>
              <pre className="bg-gray-100 p-3 rounded m-3">
                <code className="text-xs">git clone https://github.com/demoPlz/mini-template.git</code>
              </pre>
              You are developing & testing in <code className="bg-blue-100 p-1 rounded">studio/</code> folder. The <code className="bg-blue-100 p-1 rounded">submission/</code> folder is the minimal structure you’ll package, compress in ZIP file, and submit. 
              Please refer to <a className="text-blue-500" href="https://github.com/demoPlz/mini-template/blob/main/README.md">README.md</a>.
                <img
                  src="./screenshots/clones.png"
                  alt="Screenshot of cloning the repository"
                  className="rounded"
                />
            </div>
  
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Step 2: Prepare Your Submission Zip</h2>
              Copy <code className="bg-yellow-100 p-1 rounded">agent.py</code>, <code className="bg-yellow-100 p-1 rounded">requirements.txt</code> and <code className="bg-yellow-100 p-1 rounded">all supplimentary files</code> to the <code className="bg-blue-100 p-1 rounded">submission/</code> folder.
              <p>
                Compress your <span className="bg-blue-100 p-1 rounded">submission</span> folder into <code className="bg-blue-100 p-1 rounded">submission.zip</code>:
              </p>
              <div className="mt-4">
                <img
                  src="./screenshots/compress.png"
                  alt="Screenshot of creating submission.zip"
                  className="rounded"
                />
              </div>
            </div>
  
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Step 3: Register or Log In</h2>
              <p>
                Go to <a className="text-blue-500" href="https://purple-glacier-014f19d1e.6.azurestaticapps.net/signin">
                    https://purple-glacier-014f19d1e.6.azurestaticapps.net/signin</a> to sign in or register:
              </p>
              <div className="mt-4">
                <img
                  src="./screenshots/login.png"
                  alt="Screenshot of login or registration page"
                  className="border rounded size-1/2"
                />
              </div>
            </div>
  

            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2">Step 4: Upload Your Submission</h2>
              <p>
                Navigate to your submission page, upload your <code>submission.zip</code>.
              </p>
              <div className="mt-4">
                <img
                  src="./screenshots/upload.png"
                  alt="Screenshot of submission upload"
                />
              </div>
            </div>
  
            <div className="p-4 bg-white rounded-lg shadow">
              <h2 className="text-2xl font-semibold mb-2 font-f">Step 5: Manage Your Submissions</h2>
              <p>
                View all your submissions with the status and the results.
              </p>
              <div className="mt-4">
                <img
                  src="./screenshots/running.png"
                  alt="Screenshot of running submission"
                />
              </div>

              <div className="mt-4">
                <img
                  src="./screenshots/success.png"
                  alt="Screenshot of success"
                />
              </div> 

            </div>
          </div>
        </div>
      </div>
    );
  }
  