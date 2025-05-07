import { signIn } from "@/auth";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export default function SignIn() {
  return (
    <>
      <div className="flex min-h-screen flex-col items-center justify-center p-4">
        <div className="w-full max-w-md rounded-lg border p-6 shadow-md flex flex-col gap-6 justify-center items-center">
          <h1 className="font-bold text-3xl text-center flex flex-col gap-2">
            <div>{`Welcome to VIS Workshop`} </div>
            {/* <div className="text-2xl">{`by UMN & Harvard`} </div> */}
          </h1>
          <div className="flex flex-row gap-2 w-full items-center justify-center">
            <Separator className="max-w-1/4" />
            <p className="text-sm text-muted-foreground">
              Please sign in to continue
            </p>
            <Separator className="max-w-1/4" />
          </div>
          <form
            action={async () => {
              "use server";
              await signIn("google");
            }}
          >
            <Button type="submit">Signin with Google</Button>
          </form>
        </div>
      </div>
    </>
  );
}
